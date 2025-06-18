// src/index.ts

import { Agent } from "./Agent"
import type { LLMProviderConfig } from "./types"

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
    // 2. Teach the agent business concepts
    console.log("\n📚 STEP 1: Teaching Business Concepts")
    console.log("-".repeat(40))

    const businessConcept = await agent.learnFromText(
      `Financial Statement Analysis:
      
      Financial statement analysis is the process of reviewing and analyzing a company's financial statements to make better economic decisions. The three main financial statements are:
      
      1. Income Statement (P&L): Shows revenue, expenses, and profit over a period
      2. Balance Sheet: Shows assets, liabilities, and equity at a point in time  
      3. Cash Flow Statement: Shows cash inflows and outflows from operations, investing, and financing
      
      Key ratios include:
      - Liquidity Ratios: Current Ratio, Quick Ratio
      - Profitability Ratios: ROE, ROA, Profit Margin
      - Leverage Ratios: Debt-to-Equity, Interest Coverage
      - Efficiency Ratios: Asset Turnover, Inventory Turnover`,
      {
        topic: "finance",
        category: "financial-analysis",
        difficulty: "intermediate",
        framework: "financial-statements",
      },
    )

    console.log(`✅ Added Financial Analysis concept (ID: ${businessConcept.id})`)

    const strategyConcept = await agent.learnFromText(
      `Porter's Five Forces Framework:
      
      Michael Porter's Five Forces is a framework for analyzing the competitive environment of an industry:
      
      1. Threat of New Entrants: How easy is it for new companies to enter the market?
      2. Bargaining Power of Suppliers: How much power do suppliers have over pricing?
      3. Bargaining Power of Buyers: How much power do customers have over pricing?
      4. Threat of Substitute Products: How easily can customers switch to alternatives?
      5. Competitive Rivalry: How intense is competition among existing players?
      
      This framework helps businesses understand industry attractiveness and develop competitive strategies.`,
      {
        topic: "strategy",
        category: "strategic-planning",
        difficulty: "intermediate",
        framework: "porters-five-forces",
      },
    )

    console.log(`✅ Added Porter's Five Forces concept (ID: ${strategyConcept.id})`)

    // 3. Add a business case study
    console.log("\n📋 STEP 2: Adding Business Case Study")
    console.log("-".repeat(40))

    const caseStudy = await agent.learnFromText(
      `Netflix Case Study: Strategic Transformation
      
      Company: Netflix Inc.
      Industry: Entertainment/Streaming
      Challenge: Transition from DVD-by-mail to streaming platform
      
      Background:
      Netflix started as a DVD-by-mail service in 1997. By 2007, they launched streaming services but faced the challenge of cannibalizing their profitable DVD business while building a new streaming model.
      
      Strategic Decisions:
      1. Heavy investment in streaming technology and content
      2. International expansion starting with Canada (2010)
      3. Original content production beginning with House of Cards (2013)
      4. Data-driven content recommendations and production decisions
      
      Financial Impact:
      - 2007 Revenue: $1.2B (mostly DVD)
      - 2023 Revenue: $31.6B (primarily streaming)
      - Subscribers grew from 7M (2007) to 260M+ (2023)
      
      Key Lessons:
      - Willingness to disrupt your own business model
      - Long-term vision over short-term profits
      - Data-driven decision making
      - Global expansion strategy`,
      {
        topic: "case-study",
        category: "strategic-transformation",
        company: "Netflix",
        industry: "Entertainment",
        difficulty: "advanced",
      },
    )

    console.log(`✅ Added Netflix case study (ID: ${caseStudy.id})`)

    // 4. Summarize knowledge base
    console.log("\n📝 STEP 3: Summarizing Knowledge Base")
    console.log("-".repeat(40))

    const summaryResult = await agent.summarizeKnowledge()
    console.log("📊 Knowledge Base Summary:")
    console.log(summaryResult.summary)
    console.log(`\n📚 Based on ${summaryResult.sourceIds.length} knowledge items`)

    // 5. Search for specific topics
    console.log("\n🔍 STEP 4: Searching Knowledge Base")
    console.log("-".repeat(40))

    const financeItems = agent.searchKnowledge("financial")
    console.log(`Found ${financeItems.length} items related to 'financial':`)
    financeItems.forEach((item) => {
      console.log(`- ${item.id}: ${item.content.substring(0, 80)}...`)
    })

    // 6. Generate business analysis code
    console.log("\n🔧 STEP 5: Generating Business Analysis Code")
    console.log("-".repeat(40))

    const buildResult = await agent.buildCode(
      `Create a TypeScript class called FinancialAnalyzer that can:
      1. Calculate key financial ratios (current ratio, ROE, debt-to-equity)
      2. Analyze financial statements
      3. Generate a financial health score
      4. Export results to JSON
      
      Include proper TypeScript types and JSDoc comments.`,
      "typescript",
    )

    if (buildResult.success) {
      console.log("✅ Generated business analysis code:")
      for (const [file, content] of Object.entries(buildResult.filesGenerated)) {
        console.log(`\n📄 ${file}:`)
        console.log(content.substring(0, 300) + "...\n")
      }
    } else {
      console.error("❌ Code generation failed:", buildResult.errors)
    }

    // 7. Generate a business dashboard
    console.log("\n📊 STEP 6: Generating Business Dashboard")
    console.log("-".repeat(40))

    const dashboardResult = await agent.buildCode(
      `Create a React TypeScript component for a business KPI dashboard that displays:
      1. Revenue metrics with trend charts
      2. Profitability indicators
      3. Customer acquisition metrics
      4. Operational efficiency ratios
      
      Use modern React hooks and include responsive design with Tailwind CSS.`,
      "typescript",
    )

    if (dashboardResult.success) {
      console.log("✅ Generated business dashboard:")
      Object.keys(dashboardResult.filesGenerated).forEach((file) => {
        console.log(`- ${file}`)
      })
    }

    // 8. Chat with the agent about business strategy
    console.log("\n💬 STEP 7: Business Strategy Consultation")
    console.log("-".repeat(40))

    const chatReply = await agent.chatWithOpenAI(
      `Based on the knowledge you've learned about financial analysis and Porter's Five Forces, what would be the key strategic considerations for a startup entering the fintech industry? Please provide a structured analysis.`,
      llmConfig,
    )

    console.log("🤖 Agent Strategic Analysis:")
    console.log(chatReply.content)

    // 9. Get knowledge base statistics
    console.log("\n📈 STEP 8: Knowledge Base Analytics")
    console.log("-".repeat(40))

    const stats = agent.getKnowledgeStats()
    console.log("📊 Knowledge Base Statistics:")
    console.log(`- Total Items: ${stats.totalItems}`)
    console.log(`- Categories: ${stats.categories.join(", ")}`)
    console.log("- Recent Items:")
    stats.recentItems.forEach((item) => {
      console.log(`  • ${item.id} (added: ${item.addedAt.toISOString()})`)
    })

    // 10. Demonstrate conversation history
    console.log("\n💭 STEP 9: Conversation History")
    console.log("-".repeat(40))

    const conversationSummary = agent.getConversationSummary()
    console.log("Recent conversation summary:")
    console.log(conversationSummary)

    // 11. Advanced business simulation code
    console.log("\n🎮 STEP 10: Generating Business Simulation")
    console.log("-".repeat(40))

    const simulationResult = await agent.buildCode(
      `Create an interactive business simulation for market entry strategy. Include:
      1. Market analysis components
      2. Competitive positioning tools
      3. Financial projections calculator
      4. Risk assessment matrix
      5. Decision tree visualization
      
      Make it educational with explanations of each business concept.`,
      "typescript",
    )

    if (simulationResult.success) {
      console.log("✅ Generated business simulation components:")
      Object.keys(simulationResult.filesGenerated).forEach((file) => {
        console.log(`- ${file}`)
      })
    }

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
