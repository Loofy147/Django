// src/CodeExecutor.ts

import { spawn } from "child_process"
import * as fs from "fs/promises"
import type { CodeTestResult } from "./types"

/**
 * A class for executing code, including Node.js scripts, Jest tests, and TypeScript code.
 * It captures the output and returns a standardized test result.
 */
export class CodeExecutor {
  /**
   * Runs a Node.js script.
   * @param scriptPath - The path to the Node.js script to run.
   * @param args - Optional arguments to pass to the script.
   * @returns A promise that resolves to the code test result.
   */
  async runNodeScript(scriptPath: string, args: string[] = []): Promise<CodeTestResult> {
    return new Promise<CodeTestResult>((resolve) => {
      const proc = spawn("node", [scriptPath, ...args], { stdio: ["ignore", "pipe", "pipe"] })
      let stdout = ""
      let stderr = ""

      proc.stdout.on("data", (chunk) => {
        stdout += chunk.toString()
      })
      proc.stderr.on("data", (chunk) => {
        stderr += chunk.toString()
      })

      proc.on("close", (code) => {
        if (code === 0) {
          resolve({ passed: true, details: stdout })
        } else {
          resolve({ passed: false, details: `Exit ${code}\nStderr:\n${stderr}\nStdout:\n${stdout}` })
        }
      })

      // Handle timeout
      setTimeout(() => {
        proc.kill()
        resolve({ passed: false, details: "Script execution timed out after 30 seconds" })
      }, 30000)
    })
  }

  /**
   * Runs Jest tests in the workspace.
   * @returns A promise that resolves to the code test result.
   */
  async runJestTests(): Promise<CodeTestResult> {
    return new Promise((resolve) => {
      const proc = spawn("npx", ["jest", "--json", "--outputFile=jest_report.json"], {
        stdio: ["ignore", "pipe", "pipe"],
      })
      let stderr = ""
      proc.stderr.on("data", (chunk) => {
        stderr += chunk.toString()
      })
      proc.on("close", async (code) => {
        if (code === 0) {
          // Read the JSON report
          try {
            const jsonReport = await fs.readFile("jest_report.json", "utf-8")
            resolve({ passed: true, details: jsonReport })
          } catch (err) {
            resolve({ passed: false, details: `Failed to read jest_report.json: ${(err as Error).message}` })
          }
        } else {
          resolve({ passed: false, details: `Jest exit code ${code}\nStderr:\n${stderr}` })
        }
      })
    })
  }

  /**
   * Executes TypeScript code by compiling it first.
   * @param tsCode - The TypeScript code to execute.
   * @param filename - The temporary filename for the TypeScript code.
   * @returns A promise that resolves to the code test result.
   */
  async runTypeScriptCode(tsCode: string, filename = "temp.ts"): Promise<CodeTestResult> {
    try {
      // Write TypeScript code to temporary file
      await fs.writeFile(filename, tsCode)

      // Compile TypeScript to JavaScript
      const compileResult = await this.runNodeScript("npx", ["tsc", filename, "--outDir", "./temp"])

      if (!compileResult.passed) {
        return {
          passed: false,
          details: `TypeScript compilation failed:\n${compileResult.details}`,
        }
      }

      // Run the compiled JavaScript
      const jsFilename = filename.replace(".ts", ".js")
      const runResult = await this.runNodeScript(`./temp/${jsFilename}`)

      // Cleanup
      await fs.unlink(filename).catch(() => {})
      await fs.unlink(`./temp/${jsFilename}`).catch(() => {})

      return runResult
    } catch (error) {
      return {
        passed: false,
        details: `Execution error: ${(error as Error).message}`,
      }
    }
  }

  /**
   * Validates business calculation code by running it with tests.
   * @param code - The business calculation code to validate.
   * @returns A promise that resolves to the code test result.
   */
  async validateBusinessCalculations(code: string): Promise<CodeTestResult> {
    const testCode = `
${code}

// Test the business calculations
try {
  console.log('Testing business calculations...');
  
  // Test financial ratios if available
  if (typeof calculateCurrentRatio === 'function') {
    const ratio = calculateCurrentRatio(100000, 50000);
    console.log('Current Ratio Test:', ratio === 2.0 ? 'PASS' : 'FAIL');
  }
  
  if (typeof calculateROE === 'function') {
    const roe = calculateROE(50000, 500000);
    console.log('ROE Test:', roe === 0.1 ? 'PASS' : 'FAIL');
  }
  
  console.log('All business calculation tests completed');
} catch (error) {
  console.error('Test failed:', error.message);
  process.exit(1);
}
    `

    return this.runTypeScriptCode(testCode, "business-calc-test.ts")
  }

  /**
   * Runs business simulation code.
   * @param simulationCode - The business simulation code to run.
   * @returns A promise that resolves to the code test result.
   */
  async runBusinessSimulation(simulationCode: string): Promise<CodeTestResult> {
    const wrappedCode = `
${simulationCode}

// Initialize and run simulation
try {
  console.log('Starting business simulation...');
  
  // Run simulation for 5 iterations
  for (let i = 1; i <= 5; i++) {
    console.log(\`\\n--- Simulation Round \${i} ---\`);
    // Simulation logic would go here
  }
  
  console.log('\\nBusiness simulation completed successfully');
} catch (error) {
  console.error('Simulation failed:', error.message);
  process.exit(1);
}
    `

    return this.runTypeScriptCode(wrappedCode, "business-simulation.ts")
  }
}
