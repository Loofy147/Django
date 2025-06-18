// src/types.ts

export interface KnowledgeItem {
  id: string
  content: string
  metadata?: Record<string, any>
  addedAt: Date
}

export interface SummarizationResult {
  summary: string
  sourceIds: string[] // which KnowledgeItems were used
}

export interface CodeBuildResult {
  filesGenerated: Record<string, string> // filename => content
  success: boolean
  errors?: string[]
}

export interface CodeTestResult {
  passed: boolean
  details: string
}

export interface AgentMessage {
  role: "agent" | "peer"
  content: string
  timestamp: Date
}

export interface LLMProviderConfig {
  apiKey: string
  model: string
  endpoint?: string // optional custom endpoint
}

export interface BusinessEducationContext {
  studentLevel: "beginner" | "intermediate" | "advanced"
  focusArea: "finance" | "strategy" | "leadership" | "operations" | "marketing" | "entrepreneurship"
  learningObjectives: string[]
  currentProgress: number
}
