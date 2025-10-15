"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Target,
  Star,
  MapPin,
  DollarSign,
  Calendar,
  ChevronRight,
  Building,
  MessageSquare,
  ExternalLink,
} from "lucide-react"

const careerPaths = [
  {
    title: "Business Analyst",
    match: 92,
    salary: "$75,000 - $95,000",
    growth: "+14% (5 years)",
    description: "Analyze business processes and recommend improvements",
    skills: ["Data Analysis", "Process Mapping", "SQL", "Business Intelligence"],
    nextSteps: ["Advanced Excel", "Tableau Certification", "SQL Mastery"],
    companies: ["Microsoft", "Deloitte", "McKinsey", "Amazon"],
  },
  {
    title: "Product Manager",
    match: 87,
    salary: "$95,000 - $130,000",
    growth: "+19% (5 years)",
    description: "Lead product development and strategy",
    skills: ["Product Strategy", "User Research", "Agile", "Data Analysis"],
    nextSteps: ["Product Management Certification", "UX Fundamentals", "Agile Methodology"],
    companies: ["Google", "Meta", "Apple", "Netflix"],
  },
  {
    title: "Management Consultant",
    match: 84,
    salary: "$85,000 - $120,000",
    growth: "+11% (5 years)",
    description: "Advise organizations on business strategy and operations",
    skills: ["Strategic Thinking", "Problem Solving", "Presentation", "Client Management"],
    nextSteps: ["Case Study Practice", "Advanced Strategy", "Consulting Frameworks"],
    companies: ["BCG", "Bain", "McKinsey", "Accenture"],
  },
]

const mentors = [
  {
    name: "Sarah Chen",
    role: "Senior Product Manager at Google",
    experience: "8 years",
    rating: 4.9,
    sessions: 127,
    expertise: ["Product Strategy", "Team Leadership", "Data-Driven Decisions"],
    nextAvailable: "Tomorrow 2:00 PM",
  },
  {
    name: "Michael Rodriguez",
    role: "Management Consultant at McKinsey",
    experience: "12 years",
    rating: 4.8,
    sessions: 89,
    expertise: ["Strategic Planning", "Case Interviews", "Client Relations"],
    nextAvailable: "Friday 10:00 AM",
  },
  {
    name: "Emily Johnson",
    role: "Business Intelligence Director",
    experience: "10 years",
    rating: 4.9,
    sessions: 156,
    expertise: ["Data Analytics", "Business Intelligence", "Team Management"],
    nextAvailable: "Monday 3:00 PM",
  },
]

const jobOpportunities = [
  {
    title: "Junior Business Analyst",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$70,000 - $85,000",
    match: 94,
    posted: "2 days ago",
    applicants: 23,
    requirements: ["Bachelor's degree", "Excel proficiency", "SQL basics", "2+ years experience"],
  },
  {
    title: "Product Analyst",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$65,000 - $80,000",
    match: 89,
    posted: "1 week ago",
    applicants: 45,
    requirements: ["Data analysis", "Product metrics", "A/B testing", "Python/R preferred"],
  },
  {
    title: "Strategy Consultant",
    company: "Consulting Partners LLC",
    location: "New York, NY",
    salary: "$80,000 - $100,000",
    match: 86,
    posted: "3 days ago",
    applicants: 67,
    requirements: ["MBA preferred", "Strategy experience", "Client-facing skills", "Travel required"],
  },
]

/**
 * Renders the Career Guidance page.
 * This component provides personalized career guidance based on user assessments.
 * It displays recommended career paths, connects users with mentors,
 * and lists relevant job opportunities. The component is designed to be
 * data-driven, presenting information in a clear and actionable format.
 * @returns {JSX.Element} The rendered career guidance component.
 */
export default function CareerGuidance() {
  return (
    <div className="space-y-8">
      {/* Career Assessment Overview */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30">Career Assessment Complete</Badge>
              <h2 className="text-3xl font-bold">Your Career Readiness Score</h2>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">87%</div>
                  <div className="text-green-100">Overall Readiness</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">92%</div>
                  <div className="text-green-100">Skill Match</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">78%</div>
                  <div className="text-green-100">Interview Ready</div>
                </div>
              </div>
              <Button className="bg-white text-green-600 hover:bg-green-50">
                <Target className="h-4 w-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="w-48 h-32 bg-white/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-16 w-16 text-white/60" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Career Paths */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Recommended Career Paths</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {careerPaths.map((path, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                  <Badge className="bg-green-100 text-green-800">{path.match}% Match</Badge>
                </div>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span>{path.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span>{path.growth}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Required Skills</h5>
                  <div className="flex flex-wrap gap-1">
                    {path.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Next Steps</h5>
                  <ul className="text-sm space-y-1">
                    {path.nextSteps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Top Companies</h5>
                  <div className="flex flex-wrap gap-1">
                    {path.companies.map((company) => (
                      <Badge key={company} variant="secondary" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  Explore Path
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mentorship Program */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Connect with Mentors</h3>
          <Button variant="outline">View All Mentors</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mentors.map((mentor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-semibold">{mentor.name}</h4>
                      <p className="text-sm text-gray-600">{mentor.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{mentor.rating}</span>
                    </div>
                    <span className="text-gray-600">{mentor.sessions} sessions</span>
                    <span className="text-gray-600">{mentor.experience}</span>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2 text-sm">Expertise</h5>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800">Next available: {mentor.nextAvailable}</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Job Opportunities */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Recommended Jobs</h3>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Job Board
          </Button>
        </div>

        <div className="space-y-4">
          {jobOpportunities.map((job, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold">{job.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 mb-2">{job.match}% Match</Badge>
                        <div className="text-sm text-gray-600">
                          <div>Posted {job.posted}</div>
                          <div>{job.applicants} applicants</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2 text-sm">Requirements</h5>
                      <div className="flex flex-wrap gap-1">
                        {job.requirements.map((req) => (
                          <Badge key={req} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    <Button>
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Skill Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Skill Gap Analysis
          </CardTitle>
          <CardDescription>Areas to focus on for your target roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { skill: "Advanced Excel", current: 75, target: 90, priority: "High" },
              { skill: "SQL", current: 60, target: 85, priority: "High" },
              { skill: "Data Visualization", current: 70, target: 80, priority: "Medium" },
              { skill: "Project Management", current: 65, target: 75, priority: "Medium" },
              { skill: "Public Speaking", current: 55, target: 70, priority: "Low" },
            ].map((item) => (
              <div key={item.skill} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.skill}</span>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        item.priority === "High" ? "destructive" : item.priority === "Medium" ? "default" : "secondary"
                      }
                    >
                      {item.priority} Priority
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {item.current}% → {item.target}%
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={item.current} className="h-3" />
                  <div className="absolute top-0 h-3 w-1 bg-red-500 rounded" style={{ left: `${item.target}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
