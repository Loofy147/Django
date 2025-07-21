"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Target,
  Brain,
  Zap,
  Award,
  ChevronRight,
  Calendar,
  Globe,
} from "lucide-react"
import Image from "next/image"

interface LearningDashboardProps {
  stats: {
    totalHours: number
    completedCourses: number
    skillsAcquired: number
    confidenceScore: number
    careerReadiness: number
    networkConnections: number
  }
  featuredContent: Array<{
    id: string
    title: string
    type: string
    duration: string
    difficulty: string
    rating: number
    students: number
    thumbnail: string
    description: string
    skills: string[]
    realWorldProject: string
  }>
}

export default function LearningDashboard({ stats, featuredContent }: LearningDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section with AI Recommendations */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6" />
                <Badge className="bg-white/20 text-white border-white/30">AI Powered</Badge>
              </div>
              <h2 className="text-3xl font-bold">Your Personalized Learning Journey</h2>
              <p className="text-blue-100 max-w-2xl">
                Our AI has analyzed your progress and recommends focusing on strategic thinking and advanced financial
                modeling to accelerate your path to senior business roles.
              </p>
              <div className="flex items-center space-x-4">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <Zap className="h-4 w-4 mr-2" />
                  Start AI-Recommended Path
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  View Full Assessment
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-64 h-48 bg-white/10 rounded-lg flex items-center justify-center">
                <Brain className="h-24 w-24 text-white/60" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Learning Hours", value: stats.totalHours, icon: Clock, color: "text-blue-600" },
          { label: "Courses Done", value: stats.completedCourses, icon: BookOpen, color: "text-green-600" },
          { label: "Skills Gained", value: stats.skillsAcquired, icon: Target, color: "text-purple-600" },
          { label: "Confidence", value: `${stats.confidenceScore}%`, icon: TrendingUp, color: "text-orange-600" },
          { label: "Career Ready", value: `${stats.careerReadiness}%`, icon: Award, color: "text-red-600" },
          { label: "Network", value: stats.networkConnections, icon: Users, color: "text-indigo-600" },
        ].map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="p-4">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today&apos;s Learning Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Today&apos;s Learning Plan
              </CardTitle>
              <CardDescription>Optimized for 45 minutes of focused learning</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">On Track</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "9:00 AM",
                activity: "Advanced DCF Modeling",
                type: "Interactive Lesson",
                duration: "15 min",
                status: "completed",
              },
              {
                time: "2:00 PM",
                activity: "Strategic Analysis Case Study",
                type: "Real-World Project",
                duration: "20 min",
                status: "current",
              },
              {
                time: "6:00 PM",
                activity: "Peer Discussion: Market Trends",
                type: "Community",
                duration: "10 min",
                status: "upcoming",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-3 rounded-lg ${
                  item.status === "current"
                    ? "bg-blue-50 border border-blue-200"
                    : item.status === "completed"
                      ? "bg-green-50"
                      : "bg-gray-50"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.status === "completed"
                      ? "bg-green-500"
                      : item.status === "current"
                        ? "bg-blue-500"
                        : "bg-gray-300"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{item.activity}</h4>
                    <span className="text-sm text-gray-600">{item.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
                {item.status === "current" && (
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Continue
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Content */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Recommended for You</h3>
          <Button variant="outline">View All Courses</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredContent.map((content) => (
            <Card key={content.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={content.thumbnail || "/placeholder.svg"}
                  alt={content.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button className="bg-white/90 text-black hover:bg-white">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <Badge className="absolute top-3 left-3 bg-black/70 text-white">{content.type}</Badge>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        content.difficulty === "Expert"
                          ? "destructive"
                          : content.difficulty === "Advanced"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {content.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{content.rating}</span>
                      <span className="text-sm text-gray-600">({content.students})</span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-lg leading-tight">{content.title}</h4>
                  <p className="text-gray-600 text-sm">{content.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {content.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {content.students.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {content.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Real Project:</strong> {content.realWorldProject}
                    </p>
                  </div>

                  <Button className="w-full">
                    Start Learning
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Learning Velocity
            </CardTitle>
            <CardDescription>Your learning pace over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>This Week</span>
                <span className="font-semibold text-green-600">+23% faster</span>
              </div>
              <Progress value={78} className="h-3" />
              <p className="text-sm text-gray-600">
                You&apos;re learning 23% faster than your average. Keep up the momentum!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Global Ranking
            </CardTitle>
            <CardDescription>How you compare to learners worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">Top 15%</div>
                <p className="text-sm text-gray-600">Among business learners globally</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Knowledge Retention</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Practical Application</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Peer Collaboration</span>
                  <span className="font-medium">94%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
