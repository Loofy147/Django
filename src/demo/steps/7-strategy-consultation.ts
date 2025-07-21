import { Agent } from "../../Agent";
import { LLMProviderConfig } from "../../types";

export async function strategyConsultation(agent: Agent, llmConfig: LLMProviderConfig) {
  console.log("\n💬 STEP 7: Business Strategy Consultation");
  console.log("-".repeat(40));

  const chatReply = await agent.chatWithOpenAI(
    `Based on the knowledge you've learned about financial analysis and Porter's Five Forces, what would be the key strategic considerations for a startup entering the fintech industry? Please provide a structured analysis.`,
    llmConfig
  );

  console.log("🤖 Agent Strategic Analysis:");
  console.log(chatReply.content);
}
