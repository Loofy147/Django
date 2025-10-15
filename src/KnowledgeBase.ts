// src/KnowledgeBase.ts

import type { KnowledgeItem, BusinessEducationContext } from "./types"
import { generateId, formatBusinessContent } from "./utils"

/**
 * A knowledge base specialized in storing and managing business education content.
 * It supports categorization, contextual metadata, and personalized content retrieval.
 */
export class BusinessKnowledgeBase {
  private memory: Map<string, KnowledgeItem> = new Map()
  private businessIndex: Map<string, string[]> = new Map() // topic -> item IDs

  /**
   * Creates an instance of the BusinessKnowledgeBase.
   * @param storageDir - The directory for storing knowledge base data.
   */
  constructor(private storageDir = "./business_kb_storage") {
    // Initialize business education categories
    this.initializeBusinessCategories()
  }

  /**
   * Initializes the business categories in the knowledge base.
   * @private
   */
  private initializeBusinessCategories() {
    const categories = [
      "financial-analysis",
      "strategic-planning",
      "leadership-development",
      "operations-management",
      "marketing-strategy",
      "entrepreneurship",
      "case-studies",
      "frameworks",
      "industry-insights",
    ]

    categories.forEach((cat) => this.businessIndex.set(cat, []))
  }

  /**
   * Adds business education content to the knowledge base.
   * @param content - The content to add.
   * @param category - The category of the content.
   * @param context - The educational context for the content.
   * @param metadata - Optional metadata for the content.
   * @returns A promise that resolves to the added knowledge item.
   */
  async addBusinessContent(
    content: string,
    category: string,
    context?: BusinessEducationContext,
    metadata?: Record<string, any>,
  ): Promise<KnowledgeItem> {
    const id = generateId()
    const formattedContent = formatBusinessContent(content, "framework")

    const item: KnowledgeItem = {
      id,
      content: formattedContent,
      metadata: {
        ...metadata,
        category,
        businessContext: context,
        difficulty: context?.studentLevel || "intermediate",
        focusArea: context?.focusArea || "general",
      },
      addedAt: new Date(),
    }

    this.memory.set(id, item)

    // Add to business index
    if (!this.businessIndex.has(category)) {
      this.businessIndex.set(category, [])
    }
    this.businessIndex.get(category)!.push(id)

    console.log(`📚 Added business content to category: ${category}`)
    return item
  }

  /**
   * Adds a case study to the knowledge base.
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
    context?: BusinessEducationContext,
  ): Promise<KnowledgeItem> {
    const caseStudyContent = `
CASE STUDY: ${title}
Company: ${company}
Industry: ${industry}
Learning Objectives: ${learningObjectives.join(", ")}

${content}
    `.trim()

    return this.addBusinessContent(caseStudyContent, "case-studies", context, {
      type: "case-study",
      company,
      industry,
      learningObjectives,
    })
  }

  /**
   * Searches the knowledge base by business criteria.
   * @param category - The category to search for.
   * @param difficulty - The difficulty level to search for.
   * @param focusArea - The focus area to search for.
   * @returns An array of knowledge items that match the criteria.
   */
  searchByBusinessCriteria(category?: string, difficulty?: string, focusArea?: string): KnowledgeItem[] {
    let items = Array.from(this.memory.values())

    if (category) {
      const categoryIds = this.businessIndex.get(category) || []
      items = items.filter((item) => categoryIds.includes(item.id))
    }

    if (difficulty) {
      items = items.filter((item) => item.metadata?.difficulty === difficulty)
    }

    if (focusArea) {
      items = items.filter((item) => item.metadata?.focusArea === focusArea)
    }

    return items
  }

  /**
   * Gets personalized content recommendations for a user.
   * @param context - The educational context for the recommendations.
   * @returns An array of recommended knowledge items.
   */
  getPersonalizedContent(context: BusinessEducationContext): KnowledgeItem[] {
    return this.searchByBusinessCriteria(
      undefined, // any category
      context.studentLevel,
      context.focusArea,
    ).slice(0, 10) // limit to top 10
  }

  /**
   * Lists all items in the knowledge base.
   * @returns An array of all knowledge items.
   */
  listAll(): KnowledgeItem[] {
    return Array.from(this.memory.values())
  }

  /**
   * Gets analytics about the business content in the knowledge base.
   * @returns An object containing business analytics.
   */
  getBusinessAnalytics() {
    const totalItems = this.memory.size
    const categoryCounts = new Map<string, number>()

    for (const [category, ids] of this.businessIndex) {
      categoryCounts.set(category, ids.length)
    }

    return {
      totalItems,
      categoryCounts: Object.fromEntries(categoryCounts),
      lastUpdated: new Date().toISOString(),
    }
  }
}
