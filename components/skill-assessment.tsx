"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, Clock, Target, TrendingUp, Award, Brain } from "lucide-react"

const assessmentQuestions = [
  {
    id: 1,
    category: "Financial Analysis",
    question:
      "A company has an EBITDA of $100M, Capex of $20M, and working capital increase of $5M. What is the Free Cash Flow?",
    options: ["$75M", "$85M", "$95M", "$105M"],
    correct: 1,
    explanation:
      "FCF = EBITDA - Taxes - Capex - Change in Working Capital. Assuming no taxes for simplicity: $100M - $20M - $5M = $75M",
  },
  {
    id: 2,
    category: "Strategic Thinking",
    question: "Which of Porter's Five Forces would be MOST affected by the rise of e-commerce in retail?",
    options: [
      "Threat of new entrants",
      "Bargaining power of suppliers",
      "Threat of substitutes",
      "Competitive rivalry",
    ],
    correct: 0,
    explanation:
      "E-commerce significantly lowers barriers to entry, allowing new players to enter markets without physical stores, increasing the threat of new entrants.",
  },
  {
    id: 3,
    category: "Leadership",
    question:
      "An experienced team member is skilled but seems unmotivated. According to Situational Leadership, what style should you use?",
    options: ["Directing (S1)", "Coaching (S2)", "Supporting (S3)", "Delegating (S4)"],
    correct: 2,
    explanation:
      "High competence + Low commitment = Supporting style. Focus on motivation and encouragement rather than direction.",
  },
  {
    id: 4,
    category: "Operations",
    question: "In Lean Six Sigma, what does the 'Analyze' phase of DMAIC focus on?",
    options: [
      "Defining the problem",
      "Measuring current performance",
      "Identifying root causes",
      "Implementing solutions",
    ],
    correct: 2,
    explanation:
      "The Analyze phase focuses on analyzing data to identify root causes of problems using tools like fishbone diagrams and statistical analysis.",
  },
  {
    id: 5,
    category: "Marketing",
    question: "In the STP framework, what comes after Segmentation?",
    options: ["Positioning", "Targeting", "Promotion", "Pricing"],
    correct: 1,
    explanation:
      "STP stands for Segmentation, Targeting, Positioning. After dividing the market into segments, you select which segments to target.",
  },
]

const skillAreas = [
  { name: "Financial Analysis", weight: 0.25, questions: [1] },
  { name: "Strategic Thinking", weight: 0.25, questions: [2] },
  { name: "Leadership", weight: 0.2, questions: [3] },
  { name: "Operations", weight: 0.15, questions: [4] },
  { name: "Marketing", weight: 0.15, questions: [5] },
]

/**
 * Renders the Skill Assessment page.
 * This component provides an interactive quiz to assess the user's business skills
 * across various domains. It guides the user through a series of questions,
 * calculates the results, and displays a detailed breakdown of their performance
 * with personalized recommendations.
 * @returns {JSX.Element} The rendered skill assessment component.
 */
export default function SkillAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  const handleNext = () => {
    if (selectedAnswer !== "") {
      setAnswers({ ...answers, [currentQuestion]: Number.parseInt(selectedAnswer) })
      setSelectedAnswer("")

      if (currentQuestion < assessmentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResults(true)
      }
    }
  }

  const calculateResults = () => {
    let totalScore = 0
    const skillScores: { [key: string]: number } = {}

    skillAreas.forEach((skill) => {
      let skillScore = 0
      let skillQuestions = 0

      skill.questions.forEach((questionIndex) => {
        const userAnswer = answers[questionIndex - 1]
        const correctAnswer = assessmentQuestions[questionIndex - 1].correct
        if (userAnswer === correctAnswer) {
          skillScore += 100
        }
        skillQuestions++
      })

      skillScores[skill.name] = skillQuestions > 0 ? skillScore / skillQuestions : 0
      totalScore += skillScores[skill.name] * skill.weight
    })

    return { totalScore, skillScores }
  }

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { level: "Expert", color: "text-green-600", bg: "bg-green-100" }
    if (score >= 75) return { level: "Advanced", color: "text-blue-600", bg: "bg-blue-100" }
    if (score >= 60) return { level: "Intermediate", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { level: "Beginner", color: "text-red-600", bg: "bg-red-100" }
  }

  if (showResults) {
    const { totalScore, skillScores } = calculateResults()
    const overallLevel = getScoreLevel(totalScore)

    return (
      <div className="space-y-6">
        {/* Results Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <Award className="h-16 w-16 mx-auto" />
              <h2 className="text-3xl font-bold">Assessment Complete!</h2>
              <div className="space-y-2">
                <div className="text-5xl font-bold">{Math.round(totalScore)}%</div>
                <Badge className={`${overallLevel.bg} ${overallLevel.color} border-white/30 text-lg px-4 py-2`}>
                  {overallLevel.level} Level
                </Badge>
              </div>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Great job! Your assessment results show your current skill level across key business areas. Use these
                insights to focus your learning journey.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Skill Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Skill Breakdown
            </CardTitle>
            <CardDescription>Your performance across different business skill areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {skillAreas.map((skill) => {
                const score = skillScores[skill.name]
                const level = getScoreLevel(score)

                return (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{skill.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${level.bg} ${level.color}`}>{level.level}</Badge>
                        <span className="font-medium">{Math.round(score)}%</span>
                      </div>
                    </div>
                    <Progress value={score} className="h-3" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Personalized Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Personalized Learning Recommendations
            </CardTitle>
            <CardDescription>Based on your assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillAreas
                .sort((a, b) => skillScores[a.name] - skillScores[b.name])
                .slice(0, 3)
                .map((skill, index) => {
                  const score = skillScores[skill.name]
                  const priority = index === 0 ? "High" : index === 1 ? "Medium" : "Low"

                  return (
                    <div key={skill.name} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{skill.name}</h4>
                        <Badge
                          variant={
                            priority === "High" ? "destructive" : priority === "Medium" ? "default" : "secondary"
                          }
                        >
                          {priority} Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Current Score: {Math.round(score)}% - Focus on this area to accelerate your business expertise.
                      </p>
                      <Button size="sm" variant="outline">
                        Start Learning Path
                      </Button>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Your Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Immediate Actions</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Start with your lowest-scoring skill area</li>
                  <li>• Complete 2-3 lessons per week</li>
                  <li>• Practice with real-world case studies</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Long-term Goals</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Achieve 85%+ in all skill areas</li>
                  <li>• Complete certification programs</li>
                  <li>• Apply skills in real projects</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100
  const question = assessmentQuestions[currentQuestion]

  return (
    <div className="space-y-6">
      {/* Assessment Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="space-y-4">
            <Badge className="bg-white/20 text-white border-white/30">Skill Assessment</Badge>
            <h2 className="text-3xl font-bold">Business Skills Assessment</h2>
            <p className="text-purple-100 max-w-2xl">
              Evaluate your current business knowledge across key areas. This assessment will help personalize your
              learning journey.
            </p>
            <div className="flex items-center space-x-4">
              <Clock className="h-5 w-5" />
              <span>15 minutes</span>
              <Target className="h-5 w-5" />
              <span>5 questions</span>
              <CheckCircle className="h-5 w-5" />
              <span>Instant results</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{question.category}</Badge>
            <span className="text-sm text-gray-600">Question {currentQuestion + 1}</span>
          </div>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Previous
            </Button>
            <Button onClick={handleNext} disabled={selectedAnswer === ""}>
              {currentQuestion === assessmentQuestions.length - 1 ? "Finish Assessment" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assessment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">What We Measure</h4>
              <ul className="text-sm space-y-1">
                <li>• Financial Analysis & Modeling</li>
                <li>• Strategic Thinking & Planning</li>
                <li>• Leadership & Management</li>
                <li>• Operations & Process Excellence</li>
                <li>• Marketing & Sales Strategy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">How It Helps</h4>
              <ul className="text-sm space-y-1">
                <li>• Identifies your strengths and gaps</li>
                <li>• Creates personalized learning paths</li>
                <li>• Tracks progress over time</li>
                <li>• Recommends relevant courses</li>
                <li>• Builds confidence in weak areas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
