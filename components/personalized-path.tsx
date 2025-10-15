"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Video,
  FileText,
  Trophy,
  Clock,
  Play,
  CheckCircle,
  Lock,
  Brain,
  Target,
  Zap,
  ChevronRight,
  BarChart3,
} from "lucide-react"

interface PersonalizedPathProps {
  userLevel: string
}

const learningPaths = {
  Beginner: {
    title: "Business Fundamentals Mastery",
    description: "Build a solid foundation in core business concepts",
    totalWeeks: 12,
    modules: [
      {
        id: 1,
        title: "Business Basics & Terminology",
        status: "completed",
        confidence: 95,
        lessons: [
          { title: "Introduction to Business", type: "video", duration: "15 min", completed: true },
          { title: "Key Business Terms", type: "interactive", duration: "20 min", completed: true },
          { title: "Business Structures", type: "reading", duration: "10 min", completed: true },
          { title: "Assessment: Business Basics", type: "quiz", duration: "15 min", completed: true },
        ],
      },
      {
        id: 2,
        title: "Financial Statements Fundamentals",
        status: "current",
        confidence: 72,
        lessons: [
          { title: "Income Statement Deep Dive", type: "video", duration: "25 min", completed: true },
          { title: "Balance Sheet Analysis", type: "interactive", duration: "30 min", completed: true },
          { title: "Cash Flow Statement", type: "video", duration: "20 min", completed: false },
          { title: "Real Company Analysis", type: "project", duration: "45 min", completed: false },
        ],
      },
      {
        id: 3,
        title: "Market Analysis & Competition",
        status: "locked",
        confidence: 0,
        lessons: [
          { title: "Market Research Methods", type: "video", duration: "20 min", completed: false },
          { title: "Competitive Analysis Framework", type: "interactive", duration: "35 min", completed: false },
          { title: "SWOT Analysis Practice", type: "project", duration: "40 min", completed: false },
        ],
      },
    ],
  },
  Intermediate: {
    title: "Strategic Business Leadership",
    description: "Develop strategic thinking and leadership capabilities",
    totalWeeks: 16,
    modules: [
      {
        id: 1,
        title: "Advanced Financial Analysis",
        status: "completed",
        confidence: 88,
        lessons: [
          { title: "Ratio Analysis Mastery", type: "interactive", duration: "30 min", completed: true },
          { title: "DCF Modeling", type: "project", duration: "60 min", completed: true },
          { title: "Comparable Company Analysis", type: "video", duration: "25 min", completed: true },
        ],
      },
      {
        id: 2,
        title: "Strategic Planning & Execution",
        status: "current",
        confidence: 65,
        lessons: [
          { title: "Strategic Frameworks", type: "video", duration: "35 min", completed: true },
          { title: "Scenario Planning", type: "simulation", duration: "45 min", completed: false },
          { title: "Strategy Implementation", type: "case-study", duration: "50 min", completed: false },
        ],
      },
      {
        id: 3,
        title: "Leadership Psychology",
        status: "locked",
        confidence: 0,
        lessons: [
          { title: "Behavioral Economics", type: "video", duration: "30 min", completed: false },
          { title: "Team Dynamics", type: "simulation", duration: "40 min", completed: false },
        ],
      },
    ],
  },
}

const contentTypes = {
  video: { icon: Video, color: "text-red-500", bg: "bg-red-50" },
  interactive: { icon: Brain, color: "text-blue-500", bg: "bg-blue-50" },
  reading: { icon: FileText, color: "text-green-500", bg: "bg-green-50" },
  quiz: { icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-50" },
  project: { icon: Target, color: "text-purple-500", bg: "bg-purple-50" },
  simulation: { icon: Zap, color: "text-indigo-500", bg: "bg-indigo-50" },
  "case-study": { icon: BarChart3, color: "text-orange-500", bg: "bg-orange-50" },
}

/**
 * Renders the Personalized Learning Path page.
 * This component displays a tailored learning path based on the user's level.
 * It shows a series of modules, each containing lessons of various types.
 * The component allows users to expand modules to view lessons and track their progress.
 * @param {PersonalizedPathProps} props - The props for the component.
 * @param {string} props.userLevel - The user's current learning level (e.g., "Beginner", "Intermediate").
 * @returns {JSX.Element} The rendered personalized learning path component.
 */
export default function PersonalizedPath({ userLevel }: PersonalizedPathProps) {
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const currentPath = learningPaths[userLevel as keyof typeof learningPaths]

  return (
    <div className="space-y-6">
      {/* Path Overview */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30">{userLevel} Level Path</Badge>
              <h2 className="text-3xl font-bold">{currentPath.title}</h2>
              <p className="text-purple-100 max-w-2xl">{currentPath.description}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{currentPath.totalWeeks} weeks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{currentPath.modules.length} modules</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-48 h-32 bg-white/10 rounded-lg flex items-center justify-center">
                <Target className="h-16 w-16 text-white/60" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Your Learning Modules</h3>

        <div className="space-y-4">
          {currentPath.modules.map((module) => (
            <Card
              key={module.id}
              className={`transition-all duration-200 ${
                module.status === "current"
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : module.status === "locked"
                    ? "opacity-60"
                    : ""
              }`}
            >
              <CardHeader
                className="cursor-pointer"
                onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        module.status === "completed"
                          ? "bg-green-500 text-white"
                          : module.status === "current"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {module.status === "completed" ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : module.status === "locked" ? (
                        <Lock className="h-6 w-6" />
                      ) : (
                        <span className="font-bold">{module.id}</span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <div className="flex items-center space-x-4 mt-1">
                        <Badge
                          variant={
                            module.status === "completed"
                              ? "default"
                              : module.status === "current"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {module.status === "completed"
                            ? "Completed"
                            : module.status === "current"
                              ? "In Progress"
                              : "Locked"}
                        </Badge>
                        {module.status !== "locked" && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Confidence:</span>
                            <span className="font-semibold">{module.confidence}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {module.status !== "locked" && (
                      <div className="text-right">
                        <Progress value={module.confidence} className="w-24 h-2" />
                      </div>
                    )}
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${selectedModule === module.id ? "rotate-90" : ""}`}
                    />
                  </div>
                </div>
              </CardHeader>

              {selectedModule === module.id && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {module.lessons.map((lesson, index) => {
                      const contentType = contentTypes[lesson.type as keyof typeof contentTypes]
                      const IconComponent = contentType.icon

                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg border ${
                            lesson.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${contentType.bg}`}>
                              <IconComponent className={`h-4 w-4 ${contentType.color}`} />
                            </div>
                            <div>
                              <h5 className="font-medium">{lesson.title}</h5>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span className="capitalize">{lesson.type.replace("-", " ")}</span>
                                <span>•</span>
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {lesson.completed ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Done
                              </Badge>
                            ) : (
                              <Button size="sm" variant={module.status === "current" ? "default" : "outline"}>
                                <Play className="h-3 w-3 mr-1" />
                                Start
                              </Button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {module.status === "current" && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-blue-900">Continue Your Progress</h5>
                          <p className="text-sm text-blue-700">
                            You&apos;re{" "}
                            {Math.round(
                              (module.lessons.filter((l) => l.completed).length / module.lessons.length) * 100,
                            )}
                            % through this module
                          </p>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">Continue Learning</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Adaptive Learning Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Learning Insights
          </CardTitle>
          <CardDescription>Personalized recommendations based on your learning patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Optimal Learning Times</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Morning (9-11 AM)</span>
                  <Badge className="bg-green-100 text-green-800">Best Focus</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Afternoon (2-4 PM)</span>
                  <Badge variant="outline">Good for Practice</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Evening (7-9 PM)</span>
                  <Badge variant="outline">Review Time</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Learning Style Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Visual Learning</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="flex justify-between">
                  <span className="text-sm">Hands-on Practice</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
                <div className="flex justify-between">
                  <span className="text-sm">Collaborative Learning</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
