"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  Play,
  CheckCircle,
  BookOpen,
  Target,
  Lightbulb,
  TrendingUp,
  Users,
  Calculator,
  BarChart3,
  Award,
  Clock,
} from "lucide-react"
import { businessCurriculum } from "@/data/curriculum"

interface LessonViewerProps {
  lessonId: string
  onBack: () => void
}

export default function LessonViewer({ lessonId, onBack }: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [completed, setCompleted] = useState(false)

  // Find the lesson and module
  let currentLesson: any = null
  let currentModule: any = null

  for (const mod of businessCurriculum.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId)
    if (lesson) {
      currentLesson = lesson
      currentModule = mod
      break
    }
  }

  if (!currentLesson || !currentModule) {
    return <div>Lesson not found</div>
  }

  const handleComplete = () => {
    setCompleted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Curriculum
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{currentLesson.title}</h1>
                <p className="text-sm text-gray-600">
                  {currentModule.title} • {currentLesson.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={completed ? "default" : "secondary"}>
                {completed ? "Completed" : currentLesson.type}
              </Badge>
              {!completed && (
                <Button onClick={handleComplete}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Lesson Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Lesson Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-lg">{currentLesson.content.overview}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold">Duration</span>
                        </div>
                        <p className="text-blue-800">{currentLesson.duration}</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="h-5 w-5 text-green-600" />
                          <span className="font-semibold">Type</span>
                        </div>
                        <p className="text-green-800 capitalize">{currentLesson.type}</p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="h-5 w-5 text-purple-600" />
                          <span className="font-semibold">Level</span>
                        </div>
                        <p className="text-purple-800">{currentModule.difficulty}</p>
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
                    What You&apos;ll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentLesson.content.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Real-World Application */}
              {currentLesson.content.realWorldExample && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Real-World Application
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentLesson.content.realWorldExample.company && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">
                            Case Study: {currentLesson.content.realWorldExample.company}
                          </h4>
                          <p>{currentLesson.content.realWorldExample.scenario}</p>
                        </div>
                      )}

                      {currentLesson.content.realWorldExample.data && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Financial Data</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {Object.entries(currentLesson.content.realWorldExample.data).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                                <span className="font-medium">
                                  {typeof value === "number" && value > 1000000
                                    ? `$${(value / 1000000000).toFixed(1)}B`
                                    : typeof value === "number" && value < 1
                                      ? `${(value * 100).toFixed(1)}%`
                                      : value.toString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              {/* Framework Deep Dive */}
              {currentLesson.content.framework && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2" />
                      {currentLesson.content.framework.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {currentLesson.content.framework.forces && (
                        <div className="space-y-4">
                          {currentLesson.content.framework.forces.map((force: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
                              <h4 className="font-semibold text-lg mb-2">{force.name}</h4>
                              <p className="text-gray-600 mb-3">{force.analysis}</p>
                              <div className="space-y-2">
                                <h5 className="font-medium">Key Factors:</h5>
                                <ul className="grid grid-cols-2 gap-2">
                                  {force.factors.map((factor: string, factorIndex: number) => (
                                    <li key={factorIndex} className="flex items-center space-x-2">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                      <span className="text-sm">{factor}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {currentLesson.content.framework.phases && (
                        <div className="space-y-4">
                          {currentLesson.content.framework.phases.map((phase: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                  {index + 1}
                                </div>
                                <h4 className="font-semibold text-lg">{phase.phase}</h4>
                              </div>
                              <p className="text-gray-600 mb-3">{phase.objective}</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium mb-2">Tools & Techniques:</h5>
                                  <ul className="space-y-1">
                                    {phase.tools.map((tool: string, toolIndex: number) => (
                                      <li key={toolIndex} className="flex items-center space-x-2">
                                        <Calculator className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm">{tool}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium mb-2">Deliverable:</h5>
                                  <p className="text-sm bg-green-50 p-2 rounded">{phase.deliverable}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Methodology */}
              {currentLesson.content.methodology && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      {currentLesson.content.methodology.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentLesson.content.methodology.steps.map((step: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-semibold text-lg mb-2">{step.step}</h4>
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          {step.focus && (
                            <div className="bg-blue-50 p-3 rounded">
                              <p className="text-blue-800">
                                <strong>Focus:</strong> {step.focus}
                              </p>
                            </div>
                          )}
                          {step.example && (
                            <div className="bg-green-50 p-3 rounded mt-2">
                              <p className="text-green-800">
                                <strong>Example:</strong> {step.example}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="practice">
            <div className="space-y-6">
              {/* Practical Exercise */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Hands-On Practice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-lg">{currentLesson.content.practicalExercise}</p>

                    {currentLesson.content.tools && (
                      <div>
                        <h4 className="font-semibold mb-2">Tools You&apos;ll Use:</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentLesson.content.tools.map((tool: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tip</h4>
                      <p className="text-yellow-700">
                        This exercise mirrors real-world scenarios you&apos;ll encounter in your career. Take your time and
                        focus on understanding the underlying principles.
                      </p>
                    </div>

                    <Button className="w-full" size="lg">
                      <Play className="h-4 w-4 mr-2" />
                      Start Practice Exercise
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Real-World Case Study */}
              {currentLesson.content.realWorldCase && (
                <Card>
                  <CardHeader>
                    <CardTitle>Case Study: {currentLesson.content.realWorldCase.company}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-800 mb-2">Problem</h4>
                          <p className="text-red-700">{currentLesson.content.realWorldCase.problem}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Solution</h4>
                          <p className="text-green-700">{currentLesson.content.realWorldCase.conclusion}</p>
                        </div>
                      </div>

                      {currentLesson.content.realWorldCase.analysis && (
                        <div className="space-y-3">
                          <h4 className="font-semibold">Analysis Breakdown:</h4>
                          {Object.entries(currentLesson.content.realWorldCase.analysis).map(([key, value]) => (
                            <div key={key} className="border-l-4 border-blue-500 pl-4">
                              <h5 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</h5>
                              <p className="text-gray-600">{value as string}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="assessment">
            <div className="space-y-6">
              {/* Assessment Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Assessment & Certification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentLesson.content.assessment && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Type</h4>
                          <p className="text-blue-700 capitalize">{currentLesson.content.assessment.type}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Passing Score</h4>
                          <p className="text-green-700">{currentLesson.content.assessment.passingScore}%</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">Format</h4>
                          <p className="text-purple-700">Practical Application</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Assessment Description</h4>
                      <p>
                        {currentLesson.content.assessment?.description ||
                          "Complete the practical exercise and demonstrate your understanding of the key concepts."}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Assessment Criteria:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Correct application of framework/methodology</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Quality of analysis and insights</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Practical recommendations</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Professional presentation</span>
                        </li>
                      </ul>
                    </div>

                    <Button className="w-full" size="lg">
                      <Award className="h-4 w-4 mr-2" />
                      Take Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="space-y-6">
              {/* Additional Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                  <CardDescription>Deepen your understanding with these curated resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Recommended Reading</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span>&quot;Valuation: Measuring and Managing the Value of Companies&quot; by McKinsey</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span>&quot;Investment Banking: Valuation, Leveraged Buyouts, and Mergers&quot; by Rosenbaum</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span>&quot;Financial Statement Analysis and Security Valuation&quot; by Penman</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Professional Tools</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium">Excel Templates</h5>
                          <p className="text-sm text-gray-600 mb-2">Professional DCF and valuation models</p>
                          <Button size="sm" variant="outline">
                            Download
                          </Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium">Financial Calculator</h5>
                          <p className="text-sm text-gray-600 mb-2">Online calculator for quick valuations</p>
                          <Button size="sm" variant="outline">
                            Access Tool
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Industry Reports</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <BarChart3 className="h-4 w-4 text-green-500" />
                          <span>McKinsey Global Institute - Industry Analysis Reports</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BarChart3 className="h-4 w-4 text-green-500" />
                          <span>BCG Insights - Strategic Planning Resources</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BarChart3 className="h-4 w-4 text-green-500" />
                          <span>Bain & Company - Market Research Studies</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
