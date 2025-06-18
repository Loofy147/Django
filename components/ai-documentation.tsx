"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Code, Play, ChevronRight, Database, Cpu, Network } from "lucide-react"

const aiConcepts = [
  {
    id: "what-is-ai",
    title: "What is Artificial Intelligence?",
    level: "Beginner",
    duration: "10 min",
    description: "Understanding AI basics and how it applies to business education",
    content: {
      overview: "AI is technology that enables machines to perform tasks that typically require human intelligence.",
      keyPoints: [
        "AI can recognize patterns in data",
        "Machine learning allows AI to improve over time",
        "AI can automate decision-making processes",
        "Natural language processing helps AI understand text",
      ],
      businessApplication: "In our platform, AI personalizes learning paths and provides intelligent tutoring.",
      example: "When you struggle with DCF modeling, our AI notices and suggests additional practice exercises.",
    },
  },
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    level: "Intermediate",
    duration: "15 min",
    description: "How machines learn from data to make predictions",
    content: {
      overview: "Machine learning is a subset of AI that learns patterns from data without explicit programming.",
      keyPoints: [
        "Supervised learning uses labeled examples",
        "Unsupervised learning finds hidden patterns",
        "Reinforcement learning learns through trial and error",
        "Deep learning uses neural networks",
      ],
      businessApplication: "Our platform uses ML to analyze your learning patterns and optimize content delivery.",
      example: "The system learns that visual learners prefer diagrams and automatically shows more charts.",
    },
  },
  {
    id: "llm-basics",
    title: "Large Language Models (LLMs)",
    level: "Intermediate",
    duration: "12 min",
    description: "Understanding how AI generates and understands text",
    content: {
      overview: "LLMs are AI models trained on vast amounts of text to understand and generate human-like language.",
      keyPoints: [
        "Trained on billions of text examples",
        "Can understand context and nuance",
        "Generate coherent, relevant responses",
        "Can be fine-tuned for specific domains",
      ],
      businessApplication: "Our custom LLM is trained on business education content to provide expert tutoring.",
      example: "Ask 'Explain Porter's Five Forces' and get a detailed, contextual business explanation.",
    },
  },
  {
    id: "transformer-architecture",
    title: "Transformer Architecture",
    level: "Advanced",
    duration: "20 min",
    description: "In-depth look at the architecture powering modern LLMs",
    content: {
      overview:
        "The Transformer architecture is a neural network architecture that relies on self-attention mechanisms to process input sequences.",
      keyPoints: [
        "Self-attention allows the model to weigh the importance of different parts of the input sequence.",
        "Transformers can process sequences in parallel, making them faster than recurrent neural networks.",
        "The architecture includes encoder and decoder layers.",
        "Positional encoding is used to provide information about the position of words in the sequence.",
      ],
      businessApplication:
        "Our platform leverages the Transformer architecture to provide more accurate and context-aware responses.",
      example:
        "When you ask a question about financial modeling, the Transformer architecture helps the AI understand the context and provide a relevant answer.",
    },
  },
]

const trainingData = [
  {
    category: "Financial Analysis",
    examples: 150,
    topics: ["DCF Modeling", "Ratio Analysis", "Valuation", "Financial Statements"],
    quality: 95,
  },
  {
    category: "Strategic Thinking",
    examples: 120,
    topics: ["Porter's Five Forces", "SWOT Analysis", "Blue Ocean Strategy", "Competitive Analysis"],
    quality: 92,
  },
  {
    category: "Leadership",
    examples: 100,
    topics: ["Situational Leadership", "Team Management", "Emotional Intelligence", "Communication"],
    quality: 88,
  },
  {
    category: "Operations",
    examples: 80,
    topics: ["Lean Six Sigma", "Process Optimization", "Supply Chain", "Quality Management"],
    quality: 90,
  },
]

export default function AIDocumentation() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("concepts")

  if (selectedConcept) {
    const concept = aiConcepts.find((c) => c.id === selectedConcept)
    if (!concept) return null

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Button variant="ghost" onClick={() => setSelectedConcept(null)} className="w-fit">
              ← Back to AI Documentation
            </Button>
            <div className="space-y-2">
              <Badge variant={concept.level === "Beginner" ? "default" : "secondary"}>{concept.level}</Badge>
              <CardTitle className="text-2xl">{concept.title}</CardTitle>
              <CardDescription>{concept.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">Overview</h3>
              <p className="text-blue-800">{concept.content.overview}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Key Concepts</h3>
              <div className="space-y-3">
                {concept.content.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-semibold">{index + 1}</span>
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-3">Business Application</h3>
              <p className="text-green-800">{concept.content.businessApplication}</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-3">Real Example</h3>
              <p className="text-purple-800">{concept.content.example}</p>
            </div>

            <Button className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Try Interactive Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">AI Documentation</h1>
                <p className="text-blue-100">Learn AI concepts applied to business education</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-blue-100">AI Concepts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-100">Training Examples</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-blue-100">Model Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-100">AI Tutoring</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">AI Concepts</TabsTrigger>
          <TabsTrigger value="training">Model Training</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="concepts" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">AI Concepts for Business Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiConcepts.map((concept) => (
                <Card key={concept.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={concept.level === "Beginner" ? "default" : "secondary"}>{concept.level}</Badge>
                      <span className="text-sm text-gray-600">{concept.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{concept.title}</CardTitle>
                    <CardDescription>{concept.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" onClick={() => setSelectedConcept(concept.id)}>
                      Learn More
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Training Data Overview
              </CardTitle>
              <CardDescription>High-quality business education content for AI training</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingData.map((data, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{data.category}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{data.examples} examples</Badge>
                        <Badge className="bg-green-100 text-green-800">{data.quality}% quality</Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="h-5 w-5 mr-2" />
                Training Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Data Collection",
                    description: "Gather high-quality business education content",
                    status: "completed",
                  },
                  {
                    step: 2,
                    title: "Data Preprocessing",
                    description: "Clean and format training data",
                    status: "completed",
                  },
                  {
                    step: 3,
                    title: "Model Training",
                    description: "Train LLM on business education content",
                    status: "in-progress",
                  },
                  {
                    step: 4,
                    title: "Fine-tuning",
                    description: "Optimize for business education tasks",
                    status: "pending",
                  },
                  {
                    step: 5,
                    title: "Evaluation",
                    description: "Test model performance and accuracy",
                    status: "pending",
                  },
                ].map((step) => (
                  <div key={step.step} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        step.status === "completed"
                          ? "bg-green-500 text-white"
                          : step.status === "in-progress"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium">{step.title}</h5>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <Badge
                      variant={
                        step.status === "completed"
                          ? "default"
                          : step.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {step.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Implementation Guide
              </CardTitle>
              <CardDescription>How to integrate AI into your business education platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">1. Setup AI SDK</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <code>{`npm install ai @ai-sdk/openai
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'`}</code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">2. Create Business Education AI</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <code>{`const businessAI = await generateText({
  model: openai('gpt-4'),
  system: 'You are a business education expert...',
  prompt: 'Explain DCF modeling'
})`}</code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">3. Integrate with Platform</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <code>{`// Add AI tutoring to lessons
const aiTutor = new BusinessEducationAI()
const response = await aiTutor.explain(topic, userLevel)`}</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Network className="h-5 w-5 mr-2" />
                AI API Reference
              </CardTitle>
              <CardDescription>Complete API documentation for AI features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Generate Explanation</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">POST /api/ai/explain</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                      <code>{`{
  "topic": "DCF Modeling",
  "level": "intermediate",
  "context": "financial-analysis"
}`}</code>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Personalized Learning Path</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">POST /api/ai/learning-path</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                      <code>{`{
  "userId": "user123",
  "currentSkills": ["basic-finance"],
  "goals": ["investment-banking"]
}`}</code>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Assessment Generation</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">POST /api/ai/generate-assessment</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                      <code>{`{
  "topic": "strategic-planning",
  "difficulty": "advanced",
  "questionCount": 5
}`}</code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
