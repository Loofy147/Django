import { Agent } from "../../Agent";
import { netflixCaseStudy } from "../../../data/netflix-case-study";

export async function addCaseStudy(agent: Agent) {
  console.log("\n📋 STEP 2: Adding Business Case Study");
  console.log("-".repeat(40));

  const caseStudy = await agent.learnFromText(
    netflixCaseStudy.content,
    netflixCaseStudy.metadata
  );

  console.log(`✅ Added Netflix case study (ID: ${caseStudy.id})`);
}
