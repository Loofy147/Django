// src/Communicator.ts

import axios, { type AxiosInstance } from "axios"
import type { AgentMessage, LLMProviderConfig } from "./types"

/**
 * Handles communication with remote LLM endpoints, including other agents.
 * It provides methods for sending messages, broadcasting to multiple endpoints,
 * and wrapping specific LLM providers like OpenAI.
 */
export class Communicator {
  private httpClient: AxiosInstance

  /**
   * Creates an instance of the Communicator.
   */
  constructor() {
    this.httpClient = axios.create({
      timeout: 30_000,
      headers: { "Content-Type": "application/json" },
    })
  }

  /**
   * Sends a message to a remote LLM endpoint.
   * @param endpoint - The URL of the remote endpoint.
   * @param conversation - The conversation history to send.
   * @returns A promise that resolves to an array of agent messages from the remote endpoint.
   */
  async sendMessage(endpoint: string, conversation: AgentMessage[]): Promise<AgentMessage[]> {
    try {
      const resp = await this.httpClient.post(endpoint, { messages: conversation })
      const data = resp.data
      if (!Array.isArray(data.messages)) {
        throw new Error("Unexpected response format: no messages array")
      }
      return data.messages as AgentMessage[]
    } catch (err) {
      console.error("Communicator.sendMessage error:", (err as Error).message)
      return []
    }
  }

  /**
   * Sends a message to an OpenAI-compatible endpoint.
   * @param providerConfig - The configuration for the LLM provider.
   * @param conversation - The conversation history to send.
   * @returns A promise that resolves to a single agent message from the AI.
   */
  async sendToOpenAI(providerConfig: LLMProviderConfig, conversation: AgentMessage[]): Promise<AgentMessage> {
    // Convert AgentMessage[] → OpenAI chat format
    const openaiMessages = conversation.map((m) => ({
      role: m.role === "agent" ? "assistant" : "user",
      content: m.content,
    }))

    // Simulate OpenAI response for demo purposes
    // In production, replace with actual OpenAI API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const simulatedResponse = this.generateBusinessResponse(conversation)

    const reply: AgentMessage = {
      role: "peer",
      content: simulatedResponse,
      timestamp: new Date(),
    }
    return reply
  }

  /**
   * Generates a contextual business response for demo purposes.
   * @param conversation - The conversation history to use for context.
   * @returns A string containing a simulated business response.
   * @private
   */
  private generateBusinessResponse(conversation: AgentMessage[]): string {
    const lastMessage = conversation[conversation.length - 1]?.content.toLowerCase() || ""

    if (lastMessage.includes("fintech") || lastMessage.includes("startup")) {
      return `Strategic Analysis for Fintech Startup Entry:

**1. Market Analysis (Porter's Five Forces)**
- **Threat of New Entrants**: HIGH - Low barriers to entry with cloud infrastructure
- **Supplier Power**: MEDIUM - Dependence on banking partners and tech providers  
- **Buyer Power**: HIGH - Customers can easily switch between fintech solutions
- **Substitutes**: HIGH - Traditional banks and other fintech competitors
- **Competitive Rivalry**: VERY HIGH - Saturated market with many players

**2. Key Strategic Considerations:**

**Financial Requirements:**
- Initial capital: $2-5M for MVP and regulatory compliance
- Runway: 18-24 months to achieve product-market fit
- Customer acquisition cost: $50-200 per user in competitive market

**Regulatory Landscape:**
- Obtain necessary licenses (money transmitter, banking partnerships)
- Ensure PCI DSS compliance for payment processing
- Navigate state-by-state regulations in the US

**Competitive Differentiation:**
- Focus on underserved market segments
- Leverage advanced technology (AI, blockchain, open banking)
- Superior user experience and customer service
- Strategic partnerships with established financial institutions

**Recommended Entry Strategy:**
1. Start with a niche market segment
2. Build strong regulatory compliance from day one
3. Focus on customer acquisition and retention metrics
4. Plan for international expansion early
5. Develop strategic partnerships for distribution

This analysis is based on current market conditions and successful fintech case studies.`
    }

    if (lastMessage.includes("financial") || lastMessage.includes("analysis")) {
      return `Financial Analysis Best Practices:

**Key Financial Ratios to Monitor:**

**Liquidity Ratios:**
- Current Ratio = Current Assets / Current Liabilities (Target: 1.5-3.0)
- Quick Ratio = (Current Assets - Inventory) / Current Liabilities (Target: 1.0+)

**Profitability Ratios:**
- ROE = Net Income / Shareholders' Equity (Target: 15%+)
- ROA = Net Income / Total Assets (Target: 5%+)
- Gross Margin = (Revenue - COGS) / Revenue (Industry dependent)

**Leverage Ratios:**
- Debt-to-Equity = Total Debt / Total Equity (Target: <1.0 for most industries)
- Interest Coverage = EBITDA / Interest Expense (Target: 3.0+)

**Efficiency Ratios:**
- Asset Turnover = Revenue / Average Total Assets
- Inventory Turnover = COGS / Average Inventory

**Analysis Framework:**
1. Compare ratios to industry benchmarks
2. Analyze trends over 3-5 years
3. Consider economic and industry cycles
4. Evaluate management quality and strategy
5. Assess competitive position

Remember: Financial ratios are tools for analysis, not absolute measures of success.`
    }

    return `Thank you for your question. Based on the business concepts in my knowledge base, I can provide insights on:

- Financial statement analysis and key ratios
- Strategic frameworks like Porter's Five Forces
- Case study analysis and lessons learned
- Market entry strategies
- Business model evaluation
- Competitive analysis

Please feel free to ask specific questions about any of these business topics, and I'll provide detailed, actionable insights based on established business frameworks and real-world case studies.`
  }

  /**
   * Sends a message to multiple endpoints in parallel.
   * @param endpoints - An array of endpoint URLs to send the message to.
   * @param message - The message to send.
   * @returns A promise that resolves to a record of endpoint URLs and their corresponding responses.
   */
  async broadcastMessage(endpoints: string[], message: string): Promise<Record<string, AgentMessage[]>> {
    const conversation: AgentMessage[] = [{ role: "agent", content: message, timestamp: new Date() }]

    const promises = endpoints.map(async (endpoint) => {
      try {
        const response = await this.sendMessage(endpoint, conversation)
        return { endpoint, response }
      } catch (error) {
        console.error(`Failed to send to ${endpoint}:`, error)
        return { endpoint, response: [] }
      }
    })

    const results = await Promise.all(promises)
    return results.reduce(
      (acc, { endpoint, response }) => {
        acc[endpoint] = response
        return acc
      },
      {} as Record<string, AgentMessage[]>,
    )
  }
}
