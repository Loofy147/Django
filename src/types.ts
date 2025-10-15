// src/types.ts

/**
 * Represents an item in the knowledge base.
 */
export interface KnowledgeItem {
  id: string
  content: string
  metadata?: Record<string, any>
  addedAt: Date
}

/**
 * Represents the result of a summarization operation.
 */
export interface SummarizationResult {
  summary: string
  sourceIds: string[] // which KnowledgeItems were used
}

/**
 * Represents the result of a code build operation.
 */
export interface CodeBuildResult {
  filesGenerated: Record<string, string> // filename => content
  success: boolean
  errors?: string[]
}

/**
 * Represents the result of a code test operation.
 */
export interface CodeTestResult {
  passed: boolean
  details: string
}

/**
 * Represents a message in a conversation with an agent.
 */
export interface AgentMessage {
  role: "agent" | "peer"
  content: string
  timestamp: Date
}

/**
 * Represents the configuration for a Large Language Model (LLM) provider.
 */
export interface LLMProviderConfig {
  apiKey: string
  model: string
  endpoint?: string // optional custom endpoint
}

/**
 * Represents the context for business education.
 */
export interface BusinessEducationContext {
  studentLevel: "beginner" | "intermediate" | "advanced"
  focusArea: "finance" | "strategy" | "leadership" | "operations" | "marketing" | "entrepreneurship"
  learningObjectives: string[]
  currentProgress: number
}
