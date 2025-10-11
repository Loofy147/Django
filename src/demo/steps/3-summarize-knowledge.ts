import { Agent } from "../../Agent";

export async function summarizeKnowledge(agent: Agent) {
  console.log("\n📝 STEP 3: Summarizing Knowledge Base");
  console.log("-".repeat(40));

  const summaryResult = await agent.summarizeKnowledge();
  console.log("📊 Knowledge Base Summary:");
  console.log(summaryResult.summary);
  console.log(`\n📚 Based on ${summaryResult.sourceIds.length} knowledge items`);
}
