"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Database, Brain, Zap, MessageSquare, Cog } from "lucide-react"

export default function FrameworkOverview() {
  const components = [
    {
      name: "KnowledgeBase",
      icon: <Database className="h-6 w-6" />,
      description: "Intelligent storage and retrieval system for business concepts",
      features: [
        "In-memory Map storage with disk persistence",
        "Automatic categorization by business domain",
        "Keyword search and metadata filtering",
        "Business-specific indexing (finance, strategy, etc.)",
      ],
      implementation: `
// Business Knowledge Storage
const kb = new BusinessKnowledgeBase()

// Add financial concept
await kb.addBusinessContent(
  "DCF Analysis Framework...",
  "financial-modeling",
  { studentLevel: "advanced", focusArea: "finance" }
)

// Search by category
const financeItems = kb.searchByBusinessCriteria("finance", "intermediate")
      `,
      persistence: "./business_kb_storage/<id>.txt",
    },
    {
      name: "Summarizer",
      icon: <Brain className="h-6 w-6" />,
      description: "AI-powered content summarization for business education",
      features: [
        "Multi-document summarization",
        "Business-context aware summaries",
        "Difficulty level adaptation",
        "Learning objective alignment",
      ],
      implementation: `
// Business Content Summarization
const summarizer = new BusinessSummarizer(llmConfig)

// Summarize case studies
const summary = await summarizer.summarizeBusinessContent(
  caseStudyItems,
  "intermediate",
  ["strategic-analysis", "financial-planning"]
)
      `,
      output: "Structured summaries with key insights and learning points",
    },
    {
      name: "CodeBuilder",
      icon: <Code className="h-6 w-6" />,
      description: "Generates business tools and educational components",
      features: [
        "Financial calculator generation",
        "Interactive dashboard creation",
        "Business simulation builders",
        "Framework implementation tools",
      ],
      implementation: `
// Business Tool Generation
const builder = new BusinessCodeBuilder(llmConfig)

// Generate financial calculator
const result = await builder.generateBusinessTool(
  "Create a comprehensive ROI calculator with scenario analysis",
  "financial-calculator"
)
      `,
      output: "TypeScript/React components saved to ./agent_workspace/",
    },
    {
      name: "CodeExecutor",
      icon: <Zap className="h-6 w-6" />,
      description: "Tests and validates generated business tools",
      features: [
        "Financial calculation validation",
        "Business logic testing",
        "Performance benchmarking",
        "Educational content verification",
      ],
      implementation: `
// Business Tool Testing
const executor = new CodeExecutor()

// Test financial calculations
const testResult = await executor.validateBusinessCalculations(
  generatedCalculatorCode
)

// Run business simulations
const simResult = await executor.runBusinessSimulation(
  marketEntrySimulation
)
      `,
      validation: "Automated testing with business-specific test cases",
    },
    {
      name: "Communicator",
      icon: <MessageSquare className="h-6 w-6" />,
      description: "Enables collaboration with other AI agents and systems",
      features: [
        "Multi-agent business consultation",
        "Real-time market data integration",
        "Expert system collaboration",
        "Educational content exchange",
      ],
      implementation: `
// Agent Collaboration
const communicator = new Communicator()

// Consult with financial analysis agent
const consultation = await communicator.sendToBusinessExpert(
  "Analyze market entry strategy for fintech startup",
  "financial-strategy-agent"
)
      `,
      protocols: "HTTP/WebSocket with standardized business message formats",
    },
    {
      name: "Agent",
      icon: <Cog className="h-6 w-6" />,
      description: "Orchestrates all components for comprehensive business education",
      features: [
        "Unified business education interface",
        "Conversation state management",
        "Learning progress tracking",
        "Personalized content delivery",
      ],
      implementation: `
// Complete Business Education Agent
const agent = new BusinessEducationAgent(llmConfig)

// Learn business concept
await agent.learnBusinessConcept(portersFramework, "strategy")

// Generate analysis tool
const tool = await agent.createAnalysisTool("SWOT Analysis")

// Provide consultation
const advice = await agent.consultOnStrategy(businessPlan)
      `,
      capabilities: "Full-stack business education with AI-powered insights",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Business Education Agent Framework</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A comprehensive TypeScript framework for building intelligent business education systems that can learn,
          generate content, provide consultation, and continuously evolve.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">{component.icon}</div>
                <div>
                  <CardTitle className="text-lg">{component.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    Core Component
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{component.description}</p>

              <div>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="text-sm space-y-1">
                  {component.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Tabs defaultValue="code" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="code">Implementation</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="mt-4">
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
                    <code>{component.implementation}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="details" className="mt-4 space-y-2">
                  {component.persistence && (
                    <div className="text-xs">
                      <strong>Storage:</strong> {component.persistence}
                    </div>
                  )}
                  {component.output && (
                    <div className="text-xs">
                      <strong>Output:</strong> {component.output}
                    </div>
                  )}
                  {component.validation && (
                    <div className="text-xs">
                      <strong>Validation:</strong> {component.validation}
                    </div>
                  )}
                  {component.protocols && (
                    <div className="text-xs">
                      <strong>Protocols:</strong> {component.protocols}
                    </div>
                  )}
                  {component.capabilities && (
                    <div className="text-xs">
                      <strong>Capabilities:</strong> {component.capabilities}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Architecture & Data Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900">Input Layer</h3>
                <p className="text-sm text-blue-700 mt-2">
                  Business concepts, case studies, user queries, and educational content
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900">Processing Layer</h3>
                <p className="text-sm text-green-700 mt-2">
                  AI-powered analysis, code generation, and intelligent summarization
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900">Output Layer</h3>
                <p className="text-sm text-purple-700 mt-2">
                  Interactive tools, strategic insights, and personalized learning content
                </p>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Typical Workflow:</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Badge>1</Badge>
                  <span>
                    <strong>Learn:</strong> Ingest business concepts into KnowledgeBase
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge>2</Badge>
                  <span>
                    <strong>Analyze:</strong> Summarizer creates contextual overviews
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge>3</Badge>
                  <span>
                    <strong>Generate:</strong> CodeBuilder creates business tools and simulations
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge>4</Badge>
                  <span>
                    <strong>Validate:</strong> CodeExecutor tests generated tools
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge>5</Badge>
                  <span>
                    <strong>Collaborate:</strong> Communicator enables multi-agent consultation
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge>6</Badge>
                  <span>
                    <strong>Deliver:</strong> Agent orchestrates personalized learning experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
