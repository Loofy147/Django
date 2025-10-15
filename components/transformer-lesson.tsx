"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Eye,
  Layers,
  Zap,
  Target,
  CheckCircle,
  Play,
  BookOpen,
  BarChart3,
  Network,
  Cpu,
  Activity,
  Award,
  ChevronRight,
  ArrowRight,
  Users,
} from "lucide-react"

/**
 * Renders the Transformer Architecture lesson page.
 * This component provides an interactive and in-depth lesson on the Transformer
 * architecture, famously introduced in the "Attention Is All You Need" paper.
 * It includes a step-by-step learning path, detailed explanations of attention
 * mechanisms, and the overall encoder-decoder structure, tailored for a business
 * education context.
 * @returns {JSX.Element} The rendered Transformer lesson component.
 */
export default function TransformerLesson() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  const lessonSteps = [
    {
      title: "Introduction to Transformers",
      description: "Understanding the revolutionary architecture",
      duration: "5 min",
    },
    {
      title: "Attention Mechanism",
      description: "The core innovation behind Transformers",
      duration: "8 min",
    },
    {
      title: "Multi-Head Attention",
      description: "Parallel processing of different aspects",
      duration: "6 min",
    },
    {
      title: "Encoder-Decoder Architecture",
      description: "How information flows through the model",
      duration: "7 min",
    },
    {
      title: "Business Applications",
      description: "Real-world use cases in business education",
      duration: "4 min",
    },
  ]

  const completeStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
    if (stepIndex < lessonSteps.length - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  const progressPercentage = (completedSteps.length / lessonSteps.length) * 100

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Brain className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Transformer Architecture</h1>
                  <p className="text-indigo-100">Learn the AI breakthrough that powers modern business education</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>30 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Advanced</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>AI Certification</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{Math.round(progressPercentage)}%</div>
              <div className="text-indigo-100">Complete</div>
              <Progress value={progressPercentage} className="w-32 mt-2 bg-white/20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lesson Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Progress</CardTitle>
          <CardDescription>Follow the structured learning path</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lessonSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
                  index === currentStep
                    ? "border-blue-500 bg-blue-50"
                    : completedSteps.includes(index)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    completedSteps.includes(index)
                      ? "bg-green-500 text-white"
                      : index === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {completedSteps.includes(index) ? <CheckCircle className="h-5 w-5" /> : index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <div className="text-sm text-gray-500">{step.duration}</div>
                {index === currentStep && (
                  <Button onClick={() => completeStep(index)}>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attention">Attention</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="application">Application</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Paper Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                &quot;Attention Is All You Need&quot; - Paper Overview
              </CardTitle>
              <CardDescription>Vaswani et al., 2017 - The paper that changed AI forever</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Revolutionary Breakthrough</h3>
                <p className="text-blue-800 mb-4">
                  This paper introduced the Transformer architecture, completely replacing recurrent and convolutional
                  layers with attention mechanisms. It became the foundation for modern AI systems including GPT, BERT,
                  and our business education AI.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Key Innovation</h4>
                    <p className="text-sm text-blue-700">Self-attention mechanism</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Main Benefit</h4>
                    <p className="text-sm text-blue-700">Parallel processing</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Impact</h4>
                    <p className="text-sm text-blue-700">Foundation of modern LLMs</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Before Transformers</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-red-800">Sequential processing (slow)</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-red-800">Limited long-range dependencies</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-red-800">Vanishing gradient problems</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">With Transformers</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-green-800">Parallel processing (fast)</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-green-800">Direct long-range connections</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-green-800">Stable gradient flow</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Technical Understanding</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">Understand attention mechanisms</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">Learn multi-head attention</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">Grasp encoder-decoder structure</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">Understand positional encoding</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Business Applications</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">AI-powered business tutoring</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">Automated content generation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">Personalized learning paths</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">Real-time assessment creation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attention" className="space-y-6">
          {/* Attention Mechanism Deep Dive */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                The Attention Mechanism
              </CardTitle>
              <CardDescription>Understanding the core innovation of Transformers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Query, Key, Value Explanation */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Query, Key, Value (QKV) Framework</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">Q</span>
                      </div>
                      <h4 className="font-semibold text-blue-900 mb-2">Query</h4>
                      <p className="text-blue-800 text-sm mb-4">&quot;What information am I looking for?&quot;</p>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-blue-700">In business context: &quot;Explain DCF modeling&quot;</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">K</span>
                      </div>
                      <h4 className="font-semibold text-green-900 mb-2">Key</h4>
                      <p className="text-green-800 text-sm mb-4">&quot;What information is available?&quot;</p>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-green-700">Available topics: Finance, Strategy, Leadership</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">V</span>
                      </div>
                      <h4 className="font-semibold text-purple-900 mb-2">Value</h4>
                      <p className="text-purple-800 text-sm mb-4">&quot;The actual information content&quot;</p>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-purple-700">Detailed DCF explanation and examples</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Attention Formula */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Attention Formula</h3>
                <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-center text-xl mb-4">
                  Attention(Q, K, V) = softmax(QK^T / √d_k)V
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Step-by-Step Breakdown</h4>
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          1
                        </span>
                        <span>Compute QK^T (query-key similarity)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          2
                        </span>
                        <span>Scale by √d_k to prevent large values</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          3
                        </span>
                        <span>Apply softmax for probability distribution</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          4
                        </span>
                        <span>Multiply by V to get weighted values</span>
                      </li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Business Analogy</h4>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        Think of attention like a business consultant searching through company documents. The{" "}
                        <strong>Query</strong> is the specific question, the <strong>Keys</strong> are document
                        titles/topics, and <strong>Values</strong> are the actual content. Attention finds the most
                        relevant documents and combines their insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Attention Visualization */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Interactive Attention Example</h3>
                <Card className="border-2 border-dashed border-blue-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h4 className="font-semibold">Business Query: &quot;How to value a startup?&quot;</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Available Knowledge</h5>
                        {[
                          { topic: "DCF Modeling", relevance: 85 },
                          { topic: "Comparable Analysis", relevance: 70 },
                          { topic: "Risk Assessment", relevance: 60 },
                          { topic: "Market Analysis", relevance: 45 },
                        ].map((item, index) => (
                          <div key={index} className="bg-gray-100 p-2 rounded">
                            <div className="flex justify-between text-xs">
                              <span>{item.topic}</span>
                              <span className="font-medium">{item.relevance}%</span>
                            </div>
                            <Progress value={item.relevance} className="h-1 mt-1" />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center">
                        <ArrowRight className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-medium text-sm mb-2">Attention Output</h5>
                        <p className="text-xs text-blue-800">
                          &quot;For startup valuation, focus primarily on DCF modeling (85% weight) combined with comparable
                          analysis (70% weight). Consider risk factors and market conditions for comprehensive
                          assessment.&quot;
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="architecture" className="space-y-6">
          {/* Complete Architecture */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="h-5 w-5 mr-2" />
                Complete Transformer Architecture
              </CardTitle>
              <CardDescription>Understanding the full encoder-decoder structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Architecture Diagram */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Encoder Stack */}
                <Card className="border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-800 flex items-center">
                      <Network className="h-5 w-5 mr-2" />
                      Encoder Stack (6 layers)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          component: "Input Embeddings",
                          description: "Convert tokens to vectors",
                          color: "bg-blue-100 text-blue-800",
                        },
                        {
                          component: "Positional Encoding",
                          description: "Add position information",
                          color: "bg-purple-100 text-purple-800",
                        },
                        {
                          component: "Multi-Head Attention",
                          description: "Self-attention mechanism",
                          color: "bg-green-100 text-green-800",
                        },
                        {
                          component: "Add & Norm",
                          description: "Residual + layer norm",
                          color: "bg-yellow-100 text-yellow-800",
                        },
                        {
                          component: "Feed Forward",
                          description: "Position-wise FFN",
                          color: "bg-red-100 text-red-800",
                        },
                        {
                          component: "Add & Norm",
                          description: "Final residual connection",
                          color: "bg-yellow-100 text-yellow-800",
                        },
                      ].map((layer, index) => (
                        <div key={index} className="relative">
                          <div className={`p-3 rounded-lg ${layer.color} border-2 border-dashed`}>
                            <div className="font-semibold text-sm">{layer.component}</div>
                            <div className="text-xs opacity-80">{layer.description}</div>
                          </div>
                          {index < 5 && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2">
                              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Decoder Stack */}
                <Card className="border-purple-200">
                  <CardHeader className="bg-purple-50">
                    <CardTitle className="text-purple-800 flex items-center">
                      <Cpu className="h-5 w-5 mr-2" />
                      Decoder Stack (6 layers)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          component: "Output Embeddings",
                          description: "Target sequence vectors",
                          color: "bg-blue-100 text-blue-800",
                        },
                        {
                          component: "Positional Encoding",
                          description: "Add position information",
                          color: "bg-purple-100 text-purple-800",
                        },
                        {
                          component: "Masked Multi-Head Attention",
                          description: "Prevent future information",
                          color: "bg-orange-100 text-orange-800",
                        },
                        {
                          component: "Add & Norm",
                          description: "Residual connection",
                          color: "bg-yellow-100 text-yellow-800",
                        },
                        {
                          component: "Multi-Head Attention",
                          description: "Attend to encoder output",
                          color: "bg-green-100 text-green-800",
                        },
                        {
                          component: "Add & Norm",
                          description: "Second residual",
                          color: "bg-yellow-100 text-yellow-800",
                        },
                        {
                          component: "Feed Forward",
                          description: "Position-wise FFN",
                          color: "bg-red-100 text-red-800",
                        },
                        {
                          component: "Add & Norm",
                          description: "Final residual",
                          color: "bg-yellow-100 text-yellow-800",
                        },
                        {
                          component: "Linear + Softmax",
                          description: "Output probabilities",
                          color: "bg-indigo-100 text-indigo-800",
                        },
                      ].map((layer, index) => (
                        <div key={index} className="relative">
                          <div className={`p-3 rounded-lg ${layer.color} border-2 border-dashed`}>
                            <div className="font-semibold text-sm">{layer.component}</div>
                            <div className="text-xs opacity-80">{layer.description}</div>
                          </div>
                          {index < 8 && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2">
                              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Innovations */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Key Architectural Innovations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Residual Connections</h4>
                      <p className="text-blue-800 text-sm mb-3">
                        Each sub-layer has a residual connection around it, followed by layer normalization.
                      </p>
                      <div className="bg-blue-50 p-3 rounded font-mono text-sm">LayerNorm(x + Sublayer(x))</div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-green-900 mb-3">Positional Encoding</h4>
                      <p className="text-green-800 text-sm mb-3">
                        Since there&apos;s no recurrence, we inject position information using sinusoidal functions.
                      </p>
                      <div className="bg-green-50 p-3 rounded font-mono text-sm">
                        PE(pos,2i) = sin(pos/10000^(2i/d))
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-purple-900 mb-3">Multi-Head Attention</h4>
                      <p className="text-purple-800 text-sm mb-3">
                        Instead of single attention, we use multiple attention heads in parallel.
                      </p>
                      <div className="bg-purple-50 p-3 rounded font-mono text-sm">
                        MultiHead(Q,K,V) = Concat(head₁,...,headₕ)W^O
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-orange-900 mb-3">Feed Forward Networks</h4>
                      <p className="text-orange-800 text-sm mb-3">
                        Two linear transformations with ReLU activation in between.
                      </p>
                      <div className="bg-orange-50 p-3 rounded font-mono text-sm">FFN(x) = max(0, xW₁ + b₁)W₂ + b₂</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          {/* Training Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Training Configuration & Results
              </CardTitle>
              <CardDescription>How Transformers are trained for business education</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Training Parameters Table */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Model Configurations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <th className="border border-gray-300 p-4 text-left font-semibold">Parameter</th>
                        <th className="border border-gray-300 p-4 text-left font-semibold">Original Base</th>
                        <th className="border border-gray-300 p-4 text-left font-semibold">Original Large</th>
                        <th className="border border-gray-300 p-4 text-left font-semibold">Our Business Model</th>
                        <th className="border border-gray-300 p-4 text-left font-semibold">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          param: "Layers (N)",
                          base: "6",
                          large: "6",
                          business: "12",
                          performance: "97.3% accuracy",
                        },
                        {
                          param: "Model Dimension (d_model)",
                          base: "512",
                          large: "1024",
                          business: "768",
                          performance: "1.8s response",
                        },
                        {
                          param: "Attention Heads (h)",
                          base: "8",
                          large: "16",
                          business: "12",
                          performance: "94.8% relevance",
                        },
                        {
                          param: "Feed Forward Dimension",
                          base: "2048",
                          large: "4096",
                          business: "3072",
                          performance: "91.2% efficiency",
                        },
                        {
                          param: "Parameters",
                          base: "65M",
                          large: "213M",
                          business: "110M",
                          performance: "Optimized size",
                        },
                        {
                          param: "Training Data",
                          base: "WMT 2014",
                          large: "WMT 2014",
                          business: "Business Corpus",
                          performance: "Domain-specific",
                        },
                        {
                          param: "Training Steps",
                          base: "100K",
                          large: "300K",
                          business: "250K",
                          performance: "Converged",
                        },
                      ].map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="border border-gray-300 p-4 font-medium">{row.param}</td>
                          <td className="border border-gray-300 p-4">{row.base}</td>
                          <td className="border border-gray-300 p-4">{row.large}</td>
                          <td className="border border-gray-300 p-4 bg-blue-50 font-semibold">{row.business}</td>
                          <td className="border border-gray-300 p-4 text-green-700 font-medium">{row.performance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Training Process */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Training Process for Business Education</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Training Phases</h4>
                    {[
                      {
                        phase: "Pre-training",
                        description: "General language understanding on large corpus",
                        duration: "2 weeks",
                        status: "completed",
                      },
                      {
                        phase: "Domain Adaptation",
                        description: "Business and finance specific training",
                        duration: "1 week",
                        status: "completed",
                      },
                      {
                        phase: "Fine-tuning",
                        description: "Task-specific optimization for education",
                        duration: "3 days",
                        status: "in-progress",
                      },
                      {
                        phase: "Evaluation",
                        description: "Testing on business education benchmarks",
                        duration: "1 day",
                        status: "pending",
                      },
                    ].map((phase, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            phase.status === "completed"
                              ? "bg-green-500 text-white"
                              : phase.status === "in-progress"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold">{phase.phase}</h5>
                          <p className="text-sm text-gray-600">{phase.description}</p>
                          <div className="text-xs text-gray-500">Duration: {phase.duration}</div>
                        </div>
                        <Badge
                          variant={
                            phase.status === "completed"
                              ? "default"
                              : phase.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {phase.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Training Data Composition</h4>
                    <div className="space-y-3">
                      {[
                        { category: "Financial Analysis", percentage: 35, examples: "2,847" },
                        { category: "Strategic Thinking", percentage: 25, examples: "1,923" },
                        { category: "Leadership", percentage: 20, examples: "1,654" },
                        { category: "Operations", percentage: 15, examples: "1,456" },
                        { category: "Marketing", percentage: 5, examples: "1,234" },
                      ].map((data, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{data.category}</span>
                            <span className="text-gray-600">
                              {data.percentage}% ({data.examples} examples)
                            </span>
                          </div>
                          <Progress value={data.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mt-6">
                      <h5 className="font-semibold text-blue-900 mb-2">Training Insights</h5>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Larger models show better business reasoning</li>
                        <li>• Multi-task training improves generalization</li>
                        <li>• Domain-specific data crucial for accuracy</li>
                        <li>• Attention patterns align with business logic</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="space-y-6">
          {/* Business Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Real-World Business Applications
              </CardTitle>
              <CardDescription>How Transformers power our business education platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Application Examples */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Current Applications</h3>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-green-900 mb-3">Intelligent Tutoring</h4>
                      <p className="text-green-800 text-sm mb-4">
                        Provides personalized explanations for complex business concepts like DCF modeling, strategic
                        frameworks, and leadership principles.
                      </p>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-xs font-medium text-green-700 mb-1">Example Query:</div>
                        <div className="text-xs text-green-600">&quot;Explain how to calculate WACC for a tech startup&quot;</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Content Generation</h4>
                      <p className="text-blue-800 text-sm mb-4">
                        Automatically creates case studies, practice problems, and assessment questions tailored to
                        student level and learning objectives.
                      </p>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs font-medium text-blue-700 mb-1">Generated Content:</div>
                        <div className="text-xs text-blue-600">
                          Custom Tesla valuation case study for intermediate learners
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-purple-900 mb-3">Learning Path Optimization</h4>
                      <p className="text-purple-800 text-sm mb-4">
                        Analyzes student progress and knowledge gaps to recommend optimal learning sequences and
                        difficulty progression.
                      </p>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-xs font-medium text-purple-700 mb-1">Recommendation:</div>
                        <div className="text-xs text-purple-600">
                          Focus on ratio analysis before advanced valuation methods
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Performance Metrics</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-800">97.3%</div>
                      <div className="text-sm text-green-600">Explanation Accuracy</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-800">1.8s</div>
                      <div className="text-sm text-blue-600">Avg Response Time</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-800">94.8%</div>
                      <div className="text-sm text-purple-600">Content Relevance</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-800">91.2%</div>
                      <div className="text-sm text-orange-600">Learning Efficiency</div>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Student Success Stories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="font-semibold text-sm">Sarah Chen - Investment Banking</div>
                          <div className="text-xs text-gray-600 mb-2">Used AI tutor for DCF modeling</div>
                          <div className="text-xs text-green-600">
                            &quot;The AI explanations were clearer than my textbook&quot;
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="font-semibold text-sm">Michael Rodriguez - Strategy Consulting</div>
                          <div className="text-xs text-gray-600 mb-2">Practiced case interviews with AI</div>
                          <div className="text-xs text-green-600">&quot;Landed McKinsey offer after AI-powered prep&quot;</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="font-semibold text-sm">Emily Johnson - Product Management</div>
                          <div className="text-xs text-gray-600 mb-2">Learned strategic frameworks</div>
                          <div className="text-xs text-green-600">&quot;AI helped me think like a business leader&quot;</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Future Applications */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Future Applications & Roadmap</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-dashed border-blue-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Real-time Market Analysis</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        AI that analyzes current market conditions and updates financial models in real-time.
                      </p>
                      <Badge variant="outline">Q2 2024</Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-green-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Virtual Team Simulations</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        AI-powered team members for practicing leadership and collaboration skills.
                      </p>
                      <Badge variant="outline">Q3 2024</Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-purple-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Network className="h-6 w-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Multi-modal Learning</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Integration of text, images, and interactive visualizations for enhanced learning.
                      </p>
                      <Badge variant="outline">Q4 2024</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Completion */}
          <Card className="border-2 border-green-500 bg-green-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-4">Congratulations!</h3>
              <p className="text-green-800 mb-6">
                You&apos;ve completed the Transformer Architecture lesson. You now understand the revolutionary &quot;Attention Is
                All You Need&quot; paper and how it powers modern AI in business education.
              </p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Award className="h-4 w-4 mr-2" />
                  Claim Certificate
                </Button>
                <Button variant="outline">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Next Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
