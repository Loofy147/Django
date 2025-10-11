import { Agent } from "../../Agent";

export async function generateDashboard(agent: Agent) {
  console.log("\n📊 STEP 6: Generating Business Dashboard");
  console.log("-".repeat(40));

  const dashboardResult = await agent.buildCode(
    `Create a React TypeScript component for a business KPI dashboard that displays:
      1. Revenue metrics with trend charts
      2. Profitability indicators
      3. Customer acquisition metrics
      4. Operational efficiency ratios

      Use modern React hooks and include responsive design with Tailwind CSS.`,
    "typescript"
  );

  if (dashboardResult.success) {
    console.log("✅ Generated business dashboard:");
    Object.keys(dashboardResult.filesGenerated).forEach((file) => {
      console.log(`- ${file}`);
    });
  }
}
