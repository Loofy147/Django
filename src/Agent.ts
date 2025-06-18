// src/Agent.ts

import { KnowledgeBase } from "./KnowledgeBase"
import { Summarizer } from "./Summarizer"
import { CodeBuilder } from "./CodeBuilder"
import { CodeExecutor } from "./CodeExecutor"
import { Communicator } from "./Communicator"
import type {
  KnowledgeItem,
  SummarizationResult,
  CodeBuildResult,
  CodeTestResult,
  AgentMessage,
  LLMProviderConfig,
} from "./types"

export class Agent {
  private kb: KnowledgeBase
  private summarizer: Summarizer
  private builder: CodeBuilder
  private executor: CodeExecutor
  private communicator: Communicator
  private convoHistory: AgentMessage[] = []

  constructor(llmConfig: LLMProviderConfig) {
    this.kb = new KnowledgeBase()
    this.summarizer = new Summarizer(llmConfig)
    this.builder = new CodeBuilder(llmConfig)
    this.executor = new CodeExecutor()
    this.communicator = new Communicator()
  }

  /**
   * Ingest raw text (e.g., from user or from a file) into KB
   */
  async learnFromText(text: string, metadata?: Record<string, any>): Promise<KnowledgeItem> {
    const item = await this.kb.addText(text, metadata)
    console.log(`[${new Date().toISOString()}] Learned new KB item (${item.id}).`)
    return item
  }

  /**
   * Ingest a file into KB (reads the file contents).
   */
  async learnFromFile(pathToFile: string, metadata?: Record<string, any>): Promise<KnowledgeItem> {
    const item = await this.kb.addFile(pathToFile, metadata)
    console.log(`[${new Date().toISOString()}] Learned new KB file (${item.id}).`)
    return item
  }

  /**
   * Summarize either the entire KB or selected items by keyword.
   */
  async summarizeKnowledge(keywordFilter?: string): Promise<SummarizationResult> {
    let items: KnowledgeItem[]
    if (keywordFilter) {
      items = this.kb.searchByKeyword(keywordFilter)
    } else {
      items = this.kb.listAll()
    }
    return this.summarizer.summarizeItems(items)
  }

  /**
   * Generate new code based on a natural language prompt.
   */
  async buildCode(prompt: string, language = "typescript"): Promise<CodeBuildResult> {
    console.log(`[Agent] Building code for prompt: "${prompt}"`)
    return this.builder.generateCode(prompt, language)
  }

  /**
   * Modify existing code given instructions.
   */
  async modifyCode(existingFile: string, instructions: string): Promise<CodeBuildResult> {
    console.log(`[Agent] Modifying code at ${existingFile} with instructions: ${instructions}`)
    return this.builder.modifyCode(existingFile, instructions)
  }

  /**
   * Execute a Node.js script and return results.
   */
  async executeNode(scriptPath: string): Promise<CodeTestResult> {
    console.log(`[Agent] Executing Node.js script: ${scriptPath}`)
    return this.executor.runNodeScript(scriptPath)
  }

  /**
   * Run Jest tests in the workspace.
   */
  async runTests(): Promise<CodeTestResult> {
    console.log(`[Agent] Running Jest tests...`)
    return this.executor.runJestTests()
  }

  /**
   * Send a chat message to another agent/LLM endpoint.
   * Saves to internal convo history.
   */
  async sendMessageToAgent(endpoint: string, message: string): Promise<AgentMessage[]> {
    this.convoHistory.push({ role: "agent", content: message, timestamp: new Date() })
    const response = await this.communicator.sendMessage(endpoint, this.convoHistory)
    // Append all responses to history:
    response.forEach((msg) => this.convoHistory.push(msg))
    return response
  }

  /**
   * Chat with OpenAI directly through our Communicator wrapper.
   */
  async chatWithOpenAI(message: string, providerConfig: LLMProviderConfig): Promise<AgentMessage> {
    this.convoHistory.push({ role: "agent", content: message, timestamp: new Date() })
    const reply = await this.communicator.sendToOpenAI(providerConfig, this.convoHistory)
    this.convoHistory.push(reply)
    return reply
  }

  /**
   * Retrieve full conversation history.
   */
  getConversationHistory(): AgentMessage[] {
    return this.convoHistory
  }

  /**
   * Get knowledge base statistics
   */
  getKnowledgeStats() {
    const items = this.kb.listAll()
    return {
      totalItems: items.length,
      categories: [...new Set(items.map((item) => item.metadata?.category).filter(Boolean))],
      recentItems: items.slice(-5).map((item) => ({ id: item.id, addedAt: item.addedAt })),
    }
  }

  /**
   * Search knowledge base by keyword
   */
  searchKnowledge(keyword: string): KnowledgeItem[] {
    return this.kb.searchByKeyword(keyword)
  }

  /**
   * Delete knowledge item by ID
   */
  async deleteKnowledge(id: string): Promise<boolean> {
    return this.kb.deleteById(id)
  }

  /**
   * Get conversation summary
   */
  getConversationSummary(): string {
    const messages = this.convoHistory.slice(-10) // Last 10 messages
    return messages.map((msg) => `${msg.role}: ${msg.content.substring(0, 100)}...`).join("\n")
  }
}
