import { Agent } from "../../Agent";
import { financialAnalysis } from "../../../data/financial-analysis";
import { portersFiveForces } from "../../../data/porters-five-forces";

export async function teachConcepts(agent: Agent) {
  console.log("\n📚 STEP 1: Teaching Business Concepts");
  console.log("-".repeat(40));

  const businessConcept = await agent.learnFromText(
    financialAnalysis.content,
    financialAnalysis.metadata
  );

  console.log(`✅ Added Financial Analysis concept (ID: ${businessConcept.id})`);

  const strategyConcept = await agent.learnFromText(
    portersFiveForces.content,
    portersFiveForces.metadata
  );

  console.log(`✅ Added Porter's Five Forces concept (ID: ${strategyConcept.id})`);
}
