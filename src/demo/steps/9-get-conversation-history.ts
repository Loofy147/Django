import { Agent } from "../../Agent";

export function getConversationHistory(agent: Agent) {
  console.log("\n💭 STEP 9: Conversation History");
  console.log("-".repeat(40));

  const conversationSummary = agent.getConversationSummary();
  console.log("Recent conversation summary:");
  console.log(conversationSummary);
}
