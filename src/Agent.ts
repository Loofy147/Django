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

/**
 * Represents an AI agent that can learn, build code, and communicate.
 * The Agent class integrates various functionalities such as knowledge management,
 * code generation, execution, and communication with other agents or AI models.
 */
export class Agent {
  private kb: KnowledgeBase
  private summarizer: Summarizer
  private builder: CodeBuilder
  private executor: CodeExecutor
  private communicator: Communicator
  private convoHistory: AgentMessage[] = []

  /**
   * Creates an instance of the Agent.
   * @param llmConfig - The configuration for the Large Language Model provider.
   */
  constructor(llmConfig: LLMProviderConfig) {
    this.kb = new KnowledgeBase()
    this.summarizer = new Summarizer(llmConfig)
    this.builder = new CodeBuilder(llmConfig)
    this.executor = new CodeExecutor()
    this.communicator = new Communicator()
  }

  /**
   * Ingests raw text into the knowledge base.
   * @param text - The text to learn from.
   * @param metadata - Optional metadata to associate with the text.
   * @returns A promise that resolves to the learned knowledge item.
   */
  async learnFromText(text: string, metadata?: Record<string, any>): Promise<KnowledgeItem> {
    const item = await this.kb.addText(text, metadata)
    console.log(`[${new Date().toISOString()}] Learned new KB item (${item.id}).`)
    return item
  }

  /**
   * Ingests a file into the knowledge base.
   * @param pathToFile - The path to the file to learn from.
   * @param metadata - Optional metadata to associate with the file.
   * @returns A promise that resolves to the learned knowledge item.
   */
  async learnFromFile(pathToFile: string, metadata?: Record<string, any>): Promise<KnowledgeItem> {
    const item = await this.kb.addFile(pathToFile, metadata)
    console.log(`[${new Date().toISOString()}] Learned new KB file (${item.id}).`)
    return item
  }

  /**
   * Summarizes the knowledge base, optionally filtered by a keyword.
   * @param keywordFilter - An optional keyword to filter knowledge items.
   * @returns A promise that resolves to the summarization result.
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
   * Generates new code based on a natural language prompt.
   * @param prompt - The natural language prompt for code generation.
   * @param language - The programming language of the code to generate (defaults to "typescript").
   * @returns A promise that resolves to the code build result.
   */
  async buildCode(prompt: string, language = "typescript"): Promise<CodeBuildResult> {
    console.log(`[Agent] Building code for prompt: "${prompt}"`)
    return this.builder.generateCode(prompt, language)
  }

  /**
   * Modifies existing code based on instructions.
   * @param existingFile - The path to the existing file to modify.
   * @param instructions - The instructions for modifying the code.
   * @returns A promise that resolves to the code build result.
   */
  async modifyCode(existingFile: string, instructions: string): Promise<CodeBuildResult> {
    console.log(`[Agent] Modifying code at ${existingFile} with instructions: ${instructions}`)
    return this.builder.modifyCode(existingFile, instructions)
  }

  /**
   * Executes a Node.js script.
   * @param scriptPath - The path to the Node.js script to execute.
   * @returns A promise that resolves to the code test result.
   */
  async executeNode(scriptPath: string): Promise<CodeTestResult> {
    console.log(`[Agent] Executing Node.js script: ${scriptPath}`)
    return this.executor.runNodeScript(scriptPath)
  }

  /**
   * Runs Jest tests in the workspace.
   * @returns A promise that resolves to the code test result.
   */
  async runTests(): Promise<CodeTestResult> {
    console.log(`[Agent] Running Jest tests...`)
    return this.executor.runJestTests()
  }

  /**
   * Sends a chat message to another agent or LLM endpoint.
   * The message and response are saved to the internal conversation history.
   * @param endpoint - The endpoint to send the message to.
   * @param message - The message to send.
   * @returns A promise that resolves to an array of agent messages representing the response.
   */
  async sendMessageToAgent(endpoint: string, message: string): Promise<AgentMessage[]> {
    this.convoHistory.push({ role: "agent", content: message, timestamp: new Date() })
    const response = await this.communicator.sendMessage(endpoint, this.convoHistory)
    // Append all responses to history:
    response.forEach((msg) => this.convoHistory.push(msg))
    return response
  }

  /**
   * Chats with OpenAI directly through the Communicator wrapper.
   * @param message - The message to send to OpenAI.
   * @param providerConfig - The configuration for the LLM provider.
   * @returns A promise that resolves to the agent message representing the reply.
   */
  async chatWithOpenAI(message: string, providerConfig: LLMProviderConfig): Promise<AgentMessage> {
    this.convoHistory.push({ role: "agent", content: message, timestamp: new Date() })
    const reply = await this.communicator.sendToOpenAI(providerConfig, this.convoHistory)
    this.convoHistory.push(reply)
    return reply
  }

  /**
   * Retrieves the full conversation history.
   * @returns An array of agent messages representing the conversation history.
   */
  getConversationHistory(): AgentMessage[] {
    return this.convoHistory
  }

  /**
   * Gets statistics about the knowledge base.
   * @returns An object containing knowledge base statistics.
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
   * Searches the knowledge base by keyword.
   * @param keyword - The keyword to search for.
   * @returns An array of knowledge items that match the keyword.
   */
  searchKnowledge(keyword: string): KnowledgeItem[] {
    return this.kb.searchByKeyword(keyword)
  }

  /**
   * Deletes a knowledge item by its ID.
   * @param id - The ID of the knowledge item to delete.
   * @returns A promise that resolves to a boolean indicating whether the item was deleted.
   */
  async deleteKnowledge(id: string): Promise<boolean> {
    return this.kb.deleteById(id)
  }

  /**
   * Gets a summary of the conversation.
   * @returns A string representing the summary of the last 10 messages in the conversation.
   */
  getConversationSummary(): string {
    const messages = this.convoHistory.slice(-10) // Last 10 messages
    return messages.map((msg) => `${msg.role}: ${msg.content.substring(0, 100)}...`).join("\n")
  }
}
