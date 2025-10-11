import { Agent } from "../../Agent";

export async function generateAnalysisCode(agent: Agent) {
  console.log("\n🔧 STEP 5: Generating Business Analysis Code");
  console.log("-".repeat(40));

  const buildResult = await agent.buildCode(
    `Create a TypeScript class called FinancialAnalyzer that can:
      1. Calculate key financial ratios (current ratio, ROE, debt-to-equity)
      2. Analyze financial statements
      3. Generate a financial health score
      4. Export results to JSON

      Include proper TypeScript types and JSDoc comments.`,
    "typescript"
  );

  if (buildResult.success) {
    console.log("✅ Generated business analysis code:");
    for (const [file, content] of Object.entries(buildResult.filesGenerated)) {
      console.log(`\n📄 ${file}:`);
      console.log(content.substring(0, 300) + "...\n");
    }
  } else {
    console.error("❌ Code generation failed:", buildResult.errors);
  }
}
