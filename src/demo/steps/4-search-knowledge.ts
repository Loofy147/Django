import { Agent } from "../../Agent";

export function searchKnowledge(agent: Agent) {
  console.log("\n🔍 STEP 4: Searching Knowledge Base");
  console.log("-".repeat(40));

  const financeItems = agent.searchKnowledge("financial");
  console.log(`Found ${financeItems.length} items related to 'financial':`);
  financeItems.forEach((item) => {
    console.log(`- ${item.id}: ${item.content.substring(0, 80)}...`);
  });
}
