import { Agent } from "../../Agent";

export function getKnowledgeStats(agent: Agent) {
  console.log("\n📈 STEP 8: Knowledge Base Analytics");
  console.log("-".repeat(40));

  const stats = agent.getKnowledgeStats();
  console.log("📊 Knowledge Base Statistics:");
  console.log(`- Total Items: ${stats.totalItems}`);
  console.log(`- Categories: ${stats.categories.join(", ")}`);
  console.log("- Recent Items:");
  stats.recentItems.forEach((item) => {
    console.log(`  • ${item.id} (added: ${item.addedAt.toISOString()})`);
  });
}
