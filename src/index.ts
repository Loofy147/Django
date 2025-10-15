// src/index.ts

import { Agent } from "./Agent"
import type { LLMProviderConfig } from "./types"
import { teachConcepts } from "./demo/steps/1-teach-concepts"
import { addCaseStudy } from "./demo/steps/2-add-case-study"
import { summarizeKnowledge } from "./demo/steps/3-summarize-knowledge"
import { searchKnowledge } from "./demo/steps/4-search-knowledge"
import { generateAnalysisCode } from "./demo/steps/5-generate-analysis-code"
import { generateDashboard } from "./demo/steps/6-generate-dashboard"
import { strategyConsultation } from "./demo/steps/7-strategy-consultation"
import { getKnowledgeStats } from "./demo/steps/8-get-knowledge-stats"
import { getConversationHistory } from "./demo/steps/9-get-conversation-history"
import { generateSimulation } from "./demo/steps/10-generate-simulation"

/**
 * The main function that runs the Business Education Agent Framework demo.
 * This function initializes the agent, configures the LLM provider, and runs a series of demo steps
 * to showcase the agent's capabilities.
 */
async function main() {
  console.log("🚀 BUSINESS EDUCATION AGENT FRAMEWORK DEMO")
  console.log("=".repeat(60))

  // 1. Configure your LLM provider (e.g., OpenAI)
  const llmConfig: LLMProviderConfig = {
    apiKey: process.env.BUSINESS_AI_API_KEY || "demo-key",
    model: "gpt-4o", // or gpt-4, gpt-3.5-turbo, etc.
    endpoint: "https://api.openai.com/v1",
  }

  const agent = new Agent(llmConfig)

  try {
    await teachConcepts(agent)
    await addCaseStudy(agent)
    await summarizeKnowledge(agent)
    searchKnowledge(agent)
    await generateAnalysisCode(agent)
    await generateDashboard(agent)
    await strategyConsultation(agent, llmConfig)
    getKnowledgeStats(agent)
    getConversationHistory(agent)
    await generateSimulation(agent)

    // 12. Final summary
    console.log("\n🎉 DEMO COMPLETE!")
    console.log("=".repeat(60))
    console.log("The Business Education Agent has successfully demonstrated:")
    console.log("✅ Learning business concepts and case studies")
    console.log("✅ Intelligent knowledge base management")
    console.log("✅ Content summarization and search")
    console.log("✅ Business code generation")
    console.log("✅ Strategic consultation capabilities")
    console.log("✅ Analytics and progress tracking")
    console.log("✅ Interactive simulation creation")
    console.log("\n🚀 Ready for integration with your business education platform!")
  } catch (error) {
    console.error("💥 Demo error:", error)
  }
}

// Enhanced error handling and graceful shutdown
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason)
})

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error)
  process.exit(1)
})

main().catch((err) => {
  console.error("💥 Fatal error:", err)
  process.exit(1)
})
