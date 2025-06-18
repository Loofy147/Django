// src/KnowledgeBase.ts

import type { KnowledgeItem, BusinessEducationContext } from "./types"
import { generateId, formatBusinessContent } from "./utils"

export class BusinessKnowledgeBase {
  private memory: Map<string, KnowledgeItem> = new Map()
  private businessIndex: Map<string, string[]> = new Map() // topic -> item IDs

  constructor(private storageDir = "./business_kb_storage") {
    // Initialize business education categories
    this.initializeBusinessCategories()
  }

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
   * Add business education content with automatic categorization
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
   * Add case study with structured metadata
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
   * Search by business category and difficulty level
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
   * Get personalized content recommendations
   */
  getPersonalizedContent(context: BusinessEducationContext): KnowledgeItem[] {
    return this.searchByBusinessCriteria(
      undefined, // any category
      context.studentLevel,
      context.focusArea,
    ).slice(0, 10) // limit to top 10
  }

  /**
   * List all items in the KB.
   */
  listAll(): KnowledgeItem[] {
    return Array.from(this.memory.values())
  }

  /**
   * Get business analytics
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
