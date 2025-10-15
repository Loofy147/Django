"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, BookOpen, Code, BarChart3, Users, Lightbulb, Target, TrendingUp } from "lucide-react"

/**
 * Renders the Business Agent Dashboard.
 * This component provides a user interface for interacting with the Business Education Agent.
 * It displays agent status, key metrics, and provides controls for adding content,
 * generating tools, and creating simulations. The component manages its own state
 * for agent status, content, and tool requests.
 * @returns {JSX.Element} The rendered business agent dashboard component.
 */
export default function BusinessAgentDashboard() {
  const [agentStatus, setAgentStatus] = useState("ready")
  const [learningProgress, setLearningProgress] = useState(0)
  const [knowledgeItems, setKnowledgeItems] = useState(0)
  const [generatedTools, setGeneratedTools] = useState(0)
  const [activeSimulations, setActiveSimulations] = useState(0)

  const [newContent, setNewContent] = useState({
    title: "",
    content: "",
    category: "",
    difficulty: "intermediate",
    focusArea: "finance",
  })

  const [toolRequest, setToolRequest] = useState({
    type: "financial-calculator",
    requirements: "",
    complexity: "intermediate",
  })

  useEffect(() => {
    // Simulate agent activity
    const interval = setInterval(() => {
      setLearningProgress((prev) => Math.min(prev + Math.random() * 5, 100))
      setKnowledgeItems((prev) => prev + Math.floor(Math.random() * 2))
      if (Math.random() > 0.8) {
        setGeneratedTools((prev) => prev + 1)
      }
      if (Math.random() > 0.9) {
        setActiveSimulations((prev) => prev + 1)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleAddContent = async () => {
    console.log("Adding business content:", newContent)
    setAgentStatus("learning")

    // Simulate learning process
    setTimeout(() => {
      setAgentStatus("ready")
      setKnowledgeItems((prev) => prev + 1)
      setNewContent({ title: "", content: "", category: "", difficulty: "intermediate", focusArea: "finance" })
    }, 2000)
  }

  const handleGenerateTool = async () => {
    console.log("Generating business tool:", toolRequest)
    setAgentStatus("generating")

    // Simulate tool generation
    setTimeout(() => {
      setAgentStatus("ready")
      setGeneratedTools((prev) => prev + 1)
      setToolRequest({ type: "financial-calculator", requirements: "", complexity: "intermediate" })
    }, 3000)
  }

  const handleCreateSimulation = async () => {
    setAgentStatus("creating_simulation")

    setTimeout(() => {
      setAgentStatus("ready")
      setActiveSimulations((prev) => prev + 1)
    }, 4000)
  }

  return (
    <div className="space-y-6">
      {/* Agent Status Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Business Education Agent</CardTitle>
                <p className="text-gray-600">AI-Powered Learning & Content Generation System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  agentStatus === "ready"
                    ? "bg-green-500"
                    : agentStatus === "learning"
                      ? "bg-blue-500"
                      : agentStatus === "generating"
                        ? "bg-yellow-500"
                        : "bg-purple-500"
                }`}
              />
              <span className="text-sm font-medium capitalize">{agentStatus.replace("_", " ")}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Agent Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Knowledge Items</p>
                <p className="text-2xl font-bold">{knowledgeItems}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <Progress value={learningProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Learning Progress: {learningProgress.toFixed(1)}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Generated Tools</p>
                <p className="text-2xl font-bold">{generatedTools}</p>
              </div>
              <Code className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                +{Math.floor(generatedTools * 0.3)} this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Simulations</p>
                <p className="text-2xl font-bold">{activeSimulations}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                Interactive Learning
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Efficiency</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs text-green-600">
                +5% improvement
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Controls */}
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Add Content</TabsTrigger>
          <TabsTrigger value="tools">Generate Tools</TabsTrigger>
          <TabsTrigger value="simulations">Create Simulations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Add Business Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Content Title</Label>
                  <Input
                    id="title"
                    value={newContent.title}
                    onChange={(e) => setNewContent((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., DCF Valuation Framework"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newContent.category}
                    onValueChange={(value) => setNewContent((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial-analysis">Financial Analysis</SelectItem>
                      <SelectItem value="strategic-planning">Strategic Planning</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="case-studies">Case Studies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={newContent.difficulty}
                    onValueChange={(value) => setNewContent((prev) => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="focusArea">Focus Area</Label>
                  <Select
                    value={newContent.focusArea}
                    onValueChange={(value) => setNewContent((prev) => ({ ...prev, focusArea: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="strategy">Strategy</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newContent.content}
                  onChange={(e) => setNewContent((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter the business content, frameworks, case studies, or educational material..."
                  rows={6}
                />
              </div>

              <Button
                onClick={handleAddContent}
                disabled={agentStatus !== "ready" || !newContent.title || !newContent.content}
                className="w-full"
              >
                {agentStatus === "learning" ? "Processing Content..." : "Add to Knowledge Base"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Generate Business Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="toolType">Tool Type</Label>
                  <Select
                    value={toolRequest.type}
                    onValueChange={(value) => setToolRequest((prev) => ({ ...prev, type: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial-calculator">Financial Calculator</SelectItem>
                      <SelectItem value="strategy-framework">Strategy Framework</SelectItem>
                      <SelectItem value="dashboard">Business Dashboard</SelectItem>
                      <SelectItem value="analysis-template">Analysis Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="complexity">Complexity</Label>
                  <Select
                    value={toolRequest.complexity}
                    onValueChange={(value) => setToolRequest((prev) => ({ ...prev, complexity: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={toolRequest.requirements}
                  onChange={(e) => setToolRequest((prev) => ({ ...prev, requirements: e.target.value }))}
                  placeholder="Describe the specific requirements for the business tool..."
                  rows={4}
                />
              </div>

              <Button
                onClick={handleGenerateTool}
                disabled={agentStatus !== "ready" || !toolRequest.requirements}
                className="w-full"
              >
                {agentStatus === "generating" ? "Generating Tool..." : "Generate Business Tool"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Create Business Simulations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={handleCreateSimulation}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Target className="h-6 w-6 mb-2" />
                  <span>Market Entry Strategy</span>
                </Button>
                <Button
                  onClick={handleCreateSimulation}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span>Financial Planning</span>
                </Button>
                <Button
                  onClick={handleCreateSimulation}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Users className="h-6 w-6 mb-2" />
                  <span>Team Management</span>
                </Button>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Simulation Features:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Interactive decision-making scenarios</li>
                  <li>• Real-time feedback and consequences</li>
                  <li>• Performance metrics and analytics</li>
                  <li>• Collaborative learning experiences</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Content Absorption Rate</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tool Utilization</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Simulation Engagement</span>
                    <span className="font-semibold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Add Advanced Financial Models</p>
                      <p className="text-xs text-gray-600">Students are ready for complex DCF scenarios</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Create Industry-Specific Cases</p>
                      <p className="text-xs text-gray-600">Focus on tech and healthcare sectors</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Enhance Collaboration Tools</p>
                      <p className="text-xs text-gray-600">Add team-based simulation features</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Agent Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Agent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
              <span className="text-sm">Generated Financial Calculator for Advanced DCF Analysis</span>
              <Badge variant="outline" className="text-xs">
                2 min ago
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <span className="text-sm">Added Case Study: Tesla&apos;s Market Strategy</span>
              <Badge variant="outline" className="text-xs">
                5 min ago
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
              <span className="text-sm">Created Market Entry Simulation</span>
              <Badge variant="outline" className="text-xs">
                12 min ago
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
              <span className="text-sm">Summarized Strategic Planning Content</span>
              <Badge variant="outline" className="text-xs">
                18 min ago
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
