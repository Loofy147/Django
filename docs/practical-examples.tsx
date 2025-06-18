"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlayCircle, Code2, BookOpen } from "lucide-react"

export default function PracticalExamples() {
  const examples = [
    {
      title: "Financial Analysis Tool Generation",
      category: "Finance",
      difficulty: "Intermediate",
      description: "Generate a comprehensive financial ratio calculator with visualization",
      steps: [
        "Learn financial analysis concepts",
        "Generate TypeScript calculator class",
        "Create React visualization component",
        "Test calculations with sample data",
        "Deploy to business education platform",
      ],
      code: `
// 1. Learn Financial Concepts
await agent.learnFromText(\`
Financial Ratio Analysis:
- Liquidity Ratios: Current Ratio, Quick Ratio
- Profitability Ratios: ROE, ROA, Profit Margin
- Leverage Ratios: Debt-to-Equity, Interest Coverage
- Efficiency Ratios: Asset Turnover, Inventory Turnover
\`, { category: 'finance', difficulty: 'intermediate' })

// 2. Generate Calculator Tool
const calculatorResult = await agent.buildCode(\`
Create a comprehensive financial ratio calculator that:
1. Calculates all major financial ratios
2. Provides industry benchmarks
3. Generates health scores
4. Exports results to PDF
5. Includes educational explanations
\`)

// 3. Test Generated Tool
const testResult = await agent.executeNode(
  calculatorResult.filesGenerated['financial-calculator.js']
)

console.log('Financial Calculator Test:', testResult.passed)
      `,
      output: "Interactive financial calculator with educational content and industry benchmarks",
    },
    {
      title: "Strategic Framework Implementation",
      category: "Strategy",
      difficulty: "Advanced",
      description: "Build Porter's Five Forces analysis tool with industry data integration",
      steps: [
        "Ingest Porter's Five Forces framework",
        "Generate interactive analysis component",
        "Integrate real-time industry data",
        "Create visualization dashboard",
        "Provide strategic recommendations",
      ],
      code: `
// 1. Learn Strategic Framework
await agent.learnFromText(\`
Porter's Five Forces Analysis:
1. Threat of New Entrants - barriers to entry
2. Bargaining Power of Suppliers - supplier concentration
3. Bargaining Power of Buyers - customer power
4. Threat of Substitutes - alternative solutions
5. Competitive Rivalry - market competition intensity
\`, { category: 'strategy', framework: 'porters-five-forces' })

// 2. Generate Analysis Tool
const strategyTool = await agent.buildCode(\`
Create a Porter's Five Forces analysis tool with:
1. Interactive force rating system
2. Industry benchmark comparisons
3. Strategic recommendation engine
4. Competitive landscape visualization
5. Export capabilities for presentations
\`)

// 3. Enhance with AI Consultation
const strategicAdvice = await agent.chatWithOpenAI(
  'Analyze the competitive landscape for a fintech startup',
  llmConfig
)
      `,
      output: "Complete strategic analysis platform with AI-powered insights and recommendations",
    },
    {
      title: "Business Case Study Analyzer",
      category: "Case Studies",
      difficulty: "Advanced",
      description: "Create an AI system that analyzes business cases and generates learning materials",
      steps: [
        "Ingest multiple business case studies",
        "Generate analysis framework",
        "Create interactive case study viewer",
        "Build assessment tools",
        "Provide personalized learning paths",
      ],
      code: `
// 1. Learn from Case Studies
await agent.learnFromFile('./cases/netflix-transformation.pdf', {
  category: 'case-study',
  company: 'Netflix',
  industry: 'Entertainment',
  themes: ['digital-transformation', 'strategic-pivot']
})

// 2. Generate Case Analysis Tool
const caseAnalyzer = await agent.buildCode(\`
Create a business case study analyzer that:
1. Extracts key business decisions
2. Identifies success factors
3. Generates discussion questions
4. Creates assessment rubrics
5. Suggests similar cases for comparison
\`)

// 3. Summarize Learning Insights
const insights = await agent.summarizeKnowledge('case-study')
console.log('Case Study Insights:', insights.summary)
      `,
      output: "Intelligent case study platform with automated analysis and personalized learning",
    },
    {
      title: "Market Entry Simulation",
      category: "Entrepreneurship",
      difficulty: "Expert",
      description: "Build an interactive business simulation for market entry decisions",
      steps: [
        "Learn market entry strategies",
        "Generate simulation engine",
        "Create decision tree interface",
        "Implement financial modeling",
        "Add AI-powered coaching",
      ],
      code: `
// 1. Learn Market Entry Concepts
await agent.learnFromText(\`
Market Entry Strategies:
- Direct Investment: Full control, high risk
- Joint Ventures: Shared risk, local expertise
- Licensing: Low risk, limited control
- Franchising: Scalable, brand consistency
- Acquisition: Fast entry, integration challenges
\`, { category: 'entrepreneurship', topic: 'market-entry' })

// 2. Generate Simulation
const simulation = await agent.buildCode(\`
Create an interactive market entry simulation with:
1. Multiple entry strategy options
2. Dynamic market conditions
3. Financial impact modeling
4. Risk assessment tools
5. AI-powered decision coaching
\`)

// 3. Test Simulation Logic
const simTest = await agent.runBusinessSimulation(
  simulation.filesGenerated['market-entry-sim.js']
)
      `,
      output: "Comprehensive business simulation with AI coaching and real-time decision support",
    },
  ]

  const runExample = (exampleTitle: string) => {
    console.log(`Running example: ${exampleTitle}`)
    // In a real implementation, this would trigger the actual agent workflow
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Practical Implementation Examples</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Real-world examples showing how to use the Business Education Agent Framework to create intelligent learning
          tools and educational content.
        </p>
      </div>

      <div className="grid gap-8">
        {examples.map((example, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{example.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{example.category}</Badge>
                    <Badge
                      variant={
                        example.difficulty === "Expert"
                          ? "destructive"
                          : example.difficulty === "Advanced"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {example.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{example.description}</p>
                </div>
                <Button onClick={() => runExample(example.title)} className="shrink-0">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Run Example
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="steps" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="steps">Implementation Steps</TabsTrigger>
                  <TabsTrigger value="code">Code Example</TabsTrigger>
                  <TabsTrigger value="output">Expected Output</TabsTrigger>
                </TabsList>

                <TabsContent value="steps" className="mt-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Step-by-Step Implementation:</h4>
                    <div className="space-y-3">
                      {example.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-3">
                          <Badge variant="outline" className="shrink-0">
                            {stepIndex + 1}
                          </Badge>
                          <span className="text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Code2 className="h-4 w-4" />
                      <h4 className="font-semibold">Implementation Code:</h4>
                    </div>
                    <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="output" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <h4 className="font-semibold">Expected Output:</h4>
                    </div>
                    <div className="bg-green-50 p-4 rounded-md border border-green-200">
                      <p className="text-sm text-green-800">{example.output}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Prerequisites:</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                    1
                  </Badge>
                  <span>Node.js v16+ installed</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                    2
                  </Badge>
                  <span>OpenAI API key configured</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                    3
                  </Badge>
                  <span>TypeScript development environment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                    4
                  </Badge>
                  <span>Business education content ready</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Installation Commands:</h4>
              <div className="bg-muted p-3 rounded-md">
                <pre className="text-sm">
                  {`npm install
export BUSINESS_AI_API_KEY="your-api-key"
npm run build
npm start`}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Start with simple financial calculators before building complex simulations</li>
              <li>• Use the knowledge base search to avoid duplicate content</li>
              <li>• Test generated code thoroughly before deploying to students</li>
              <li>• Leverage agent communication for collaborative problem-solving</li>
              <li>• Monitor analytics to optimize learning outcomes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
