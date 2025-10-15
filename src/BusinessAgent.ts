// src/BusinessAgent.ts

import { BusinessKnowledgeBase } from "./KnowledgeBase"
import { BusinessSummarizer } from "./BusinessSummarizer"
import { BusinessCodeBuilder } from "./BusinessCodeBuilder"
import type {
  KnowledgeItem,
  SummarizationResult,
  CodeBuildResult,
  LLMProviderConfig,
  BusinessEducationContext,
} from "./types"

/**
 * Represents an AI agent specialized in business education.
 * This agent can learn business concepts, add case studies, generate personalized summaries,
 * and create interactive business tools and simulations.
 */
export class BusinessEducationAgent {
  private kb: BusinessKnowledgeBase
  private summarizer: BusinessSummarizer
  private builder: BusinessCodeBuilder
  private learningHistory: Array<{
    action: string
    timestamp: Date
    context: BusinessEducationContext
    result: any
  }> = []

  /**
   * Creates an instance of the BusinessEducationAgent.
   * @param llmConfig - The configuration for the Large Language Model provider.
   */
  constructor(llmConfig: LLMProviderConfig) {
    this.kb = new BusinessKnowledgeBase()
    this.summarizer = new BusinessSummarizer(llmConfig)
    this.builder = new BusinessCodeBuilder(llmConfig)
  }

  /**
   * Learns from business content within a specific educational context.
   * @param content - The business content to learn.
   * @param category - The category of the business content.
   * @param context - The educational context for learning.
   * @param metadata - Optional metadata for the content.
   * @returns A promise that resolves to the learned knowledge item.
   */
  async learnBusinessConcept(
    content: string,
    category: string,
    context: BusinessEducationContext,
    metadata?: Record<string, any>,
  ): Promise<KnowledgeItem> {
    const item = await this.kb.addBusinessContent(content, category, context, metadata)

    this.learningHistory.push({
      action: "learn_concept",
      timestamp: new Date(),
      context,
      result: { itemId: item.id, category },
    })

    console.log(`🎓 Learned new business concept in ${category} for ${context.studentLevel} level`)
    return item
  }

  /**
   * Adds a business case study to the knowledge base.
   * @param title - The title of the case study.
   * @param content - The content of the case study.
   * @param company - The company featured in the case study.
   * @param industry - The industry of the company.
   * @param learningObjectives - The learning objectives of the case study.
   * @param context - The educational context for the case study.
   * @returns A promise that resolves to the added knowledge item.
   */
  async addCaseStudy(
    title: string,
    content: string,
    company: string,
    industry: string,
    learningObjectives: string[],
    context: BusinessEducationContext,
  ): Promise<KnowledgeItem> {
    const item = await this.kb.addCaseStudy(title, content, company, industry, learningObjectives, context)

    this.learningHistory.push({
      action: "add_case_study",
      timestamp: new Date(),
      context,
      result: { itemId: item.id, company, industry },
    })

    console.log(`📋 Added case study: ${title} (${company})`)
    return item
  }

  /**
   * Generates a personalized learning summary based on the user's educational context.
   * @param context - The educational context for the summary.
   * @returns A promise that resolves to the personalized summarization result.
   */
  async generatePersonalizedSummary(context: BusinessEducationContext): Promise<SummarizationResult> {
    const relevantContent = this.kb.getPersonalizedContent(context)
    const summary = await this.summarizer.summarizeForEducation(relevantContent, context)

    this.learningHistory.push({
      action: "generate_summary",
      timestamp: new Date(),
      context,
      result: { sourceCount: relevantContent.length },
    })

    console.log(`📝 Generated personalized summary for ${context.focusArea} (${context.studentLevel})`)
    return summary
  }

  /**
   * Creates an interactive business tool.
   * @param toolType - The type of business tool to create.
   * @param requirements - The requirements for the business tool.
   * @param context - The educational context for the tool.
   * @returns A promise that resolves to the code build result.
   */
  async createBusinessTool(
    toolType: "financial-calculator" | "strategy-framework" | "dashboard" | "analysis-template",
    requirements: string,
    context: BusinessEducationContext,
  ): Promise<CodeBuildResult> {
    const result = await this.builder.generateBusinessTool(toolType, requirements)

    this.learningHistory.push({
      action: "create_tool",
      timestamp: new Date(),
      context,
      result: { toolType, filesGenerated: Object.keys(result.filesGenerated).length },
    })

    console.log(`🔧 Created ${toolType} with ${Object.keys(result.filesGenerated).length} files`)
    return result
  }

  /**
   * Creates a business simulation.
   * @param scenario - The scenario for the business simulation.
   * @param complexity - The complexity level of the simulation.
   * @param context - The educational context for the simulation.
   * @returns A promise that resolves to the code build result.
   */
  async createBusinessSimulation(
    scenario: string,
    complexity: "basic" | "intermediate" | "advanced",
    context: BusinessEducationContext,
  ): Promise<CodeBuildResult> {
    const result = await this.builder.generateBusinessSimulation(scenario, complexity)

    this.learningHistory.push({
      action: "create_simulation",
      timestamp: new Date(),
      context,
      result: { scenario, complexity },
    })

    console.log(`🎮 Created business simulation: ${scenario} (${complexity})`)
    return result
  }

  /**
   * Gets learning analytics and recommendations for the user.
   * @param context - The educational context for the analytics.
   * @returns An object containing learning analytics and recommendations.
   */
  getLearningAnalytics(context: BusinessEducationContext) {
    const kbAnalytics = this.kb.getBusinessAnalytics()
    const userHistory = this.learningHistory.filter(
      (h) => h.context.focusArea === context.focusArea && h.context.studentLevel === context.studentLevel,
    )

    const recommendations = this.generateRecommendations(context, userHistory)

    return {
      knowledgeBase: kbAnalytics,
      userActivity: {
        totalActions: userHistory.length,
        recentActions: userHistory.slice(-10),
        focusAreas: [...new Set(userHistory.map((h) => h.context.focusArea))],
      },
      recommendations,
      lastUpdated: new Date().toISOString(),
    }
  }

  /**
   * Generates recommendations based on the user's learning history and context.
   * @param context - The educational context.
   * @param history - The user's learning history.
   * @returns An array of string recommendations.
   * @private
   */
  private generateRecommendations(context: BusinessEducationContext, history: any[]): string[] {
    const recommendations = []

    // Analyze learning patterns
    const actionTypes = history.map((h) => h.action)
    const hasCreatedTools = actionTypes.includes("create_tool")
    const hasAddedCases = actionTypes.includes("add_case_study")
    const hasGeneratedSummaries = actionTypes.includes("generate_summary")

    if (!hasCreatedTools) {
      recommendations.push(`Create interactive ${context.focusArea} tools to enhance hands-on learning`)
    }

    if (!hasAddedCases) {
      recommendations.push(`Add real-world case studies in ${context.focusArea} for practical application`)
    }

    if (!hasGeneratedSummaries) {
      recommendations.push("Generate personalized summaries to consolidate learning")
    }

    // Level-specific recommendations
    if (context.studentLevel === "beginner") {
      recommendations.push("Focus on fundamental concepts and basic frameworks")
    } else if (context.studentLevel === "advanced") {
      recommendations.push("Explore complex simulations and advanced analytical tools")
    }

    return recommendations
  }

  /**
   * Exports the user's learning progress.
   * @returns An object containing the exported learning progress.
   */
  exportLearningProgress(): any {
    return {
      knowledgeBase: this.kb.getBusinessAnalytics(),
      learningHistory: this.learningHistory,
      exportedAt: new Date().toISOString(),
    }
  }
}
