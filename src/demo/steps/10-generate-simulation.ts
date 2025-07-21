import { Agent } from "../../Agent";

export async function generateSimulation(agent: Agent) {
  console.log("\n🎮 STEP 10: Generating Business Simulation");
  console.log("-".repeat(40));

  const simulationResult = await agent.buildCode(
    `Create an interactive business simulation for market entry strategy. Include:
      1. Market analysis components
      2. Competitive positioning tools
      3. Financial projections calculator
      4. Risk assessment matrix
      5. Decision tree visualization

      Make it educational with explanations of each business concept.`,
    "typescript"
  );

  if (simulationResult.success) {
    console.log("✅ Generated business simulation components:");
    Object.keys(simulationResult.filesGenerated).forEach((file) => {
      console.log(`- ${file}`);
    });
  }
}
