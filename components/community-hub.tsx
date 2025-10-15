"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Heart,
  Calendar,
  Clock,
  Star,
  ChevronRight,
  Video,
  Globe,
} from "lucide-react"

const discussions = [
  {
    id: 1,
    title: "How to transition from finance to product management?",
    author: "Sarah Kim",
    authorRole: "Financial Analyst",
    timeAgo: "2 hours ago",
    replies: 23,
    likes: 45,
    category: "Career Transition",
    trending: true,
    preview:
      "I've been working in finance for 3 years and want to move into product management. What skills should I focus on developing?",
  },
  {
    id: 2,
    title: "Best practices for DCF modeling in volatile markets",
    author: "Michael Chen",
    authorRole: "Investment Analyst",
    timeAgo: "5 hours ago",
    replies: 18,
    likes: 32,
    category: "Financial Modeling",
    trending: false,
    preview:
      "With current market volatility, how do you adjust your DCF assumptions? Looking for practical tips from experienced analysts.",
  },
  {
    id: 3,
    title: "Negotiation strategies that actually work",
    author: "Emily Rodriguez",
    authorRole: "Business Development",
    timeAgo: "1 day ago",
    replies: 41,
    likes: 78,
    category: "Negotiation",
    trending: true,
    preview:
      "Sharing some negotiation techniques I've learned from closing $2M+ deals. What strategies have worked for you?",
  },
]

const studyGroups = [
  {
    name: "CFA Level 1 Study Group",
    members: 127,
    nextSession: "Tomorrow 7:00 PM",
    topic: "Financial Reporting and Analysis",
    difficulty: "Advanced",
    type: "Study Session",
  },
  {
    name: "Product Management Bootcamp",
    members: 89,
    nextSession: "Friday 6:00 PM",
    topic: "User Story Writing Workshop",
    difficulty: "Intermediate",
    type: "Workshop",
  },
  {
    name: "Business Case Competition",
    members: 156,
    nextSession: "Saturday 2:00 PM",
    topic: "Strategy Consulting Case Practice",
    difficulty: "Expert",
    type: "Competition",
  },
]

const liveEvents = [
  {
    title: "Market Analysis Masterclass",
    speaker: "Dr. James Wilson",
    speakerTitle: "Former Goldman Sachs VP",
    date: "Today",
    time: "3:00 PM EST",
    duration: "90 min",
    attendees: 234,
    type: "Masterclass",
    price: "Free",
  },
  {
    title: "Startup Valuation Workshop",
    speaker: "Lisa Chang",
    speakerTitle: "VC Partner at Sequoia",
    date: "Tomorrow",
    time: "2:00 PM EST",
    duration: "2 hours",
    attendees: 189,
    type: "Workshop",
    price: "$29",
  },
  {
    title: "Leadership in Crisis Q&A",
    speaker: "Robert Martinez",
    speakerTitle: "CEO of TechCorp",
    date: "Friday",
    time: "4:00 PM EST",
    duration: "60 min",
    attendees: 312,
    type: "Q&A",
    price: "Free",
  },
]

const mentorshipMatches = [
  {
    name: "Alexandra Thompson",
    role: "Senior Strategy Consultant",
    company: "McKinsey & Company",
    expertise: ["Strategic Planning", "Case Interviews", "Client Management"],
    matchScore: 94,
    responseTime: "< 2 hours",
    sessions: 156,
    rating: 4.9,
  },
  {
    name: "David Park",
    role: "Product Director",
    company: "Meta",
    expertise: ["Product Strategy", "Data Analysis", "Team Leadership"],
    matchScore: 91,
    responseTime: "< 4 hours",
    sessions: 203,
    rating: 4.8,
  },
  {
    name: "Maria Santos",
    role: "Investment Banking VP",
    company: "J.P. Morgan",
    expertise: ["Financial Modeling", "M&A", "Valuation"],
    matchScore: 88,
    responseTime: "< 6 hours",
    sessions: 89,
    rating: 4.9,
  },
]

/**
 * Renders the Community Hub page.
 * This component serves as a central platform for user interaction and collaboration.
 * It features sections for trending discussions, study groups, live events,
 * and mentorship matching, fostering a vibrant learning community.
 * The component is data-driven and designed to be visually engaging.
 * @returns {JSX.Element} The rendered community hub component.
 */
export default function CommunityHub() {
  return (
    <div className="space-y-8">
      {/* Community Overview */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30">Active Community</Badge>
              <h2 className="text-3xl font-bold">Connect & Learn Together</h2>
              <p className="text-indigo-100 max-w-2xl">
                Join thousands of business professionals sharing knowledge, experiences, and growing their careers
                together.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">12,847</div>
                  <div className="text-indigo-100">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="text-indigo-100">Discussions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-indigo-100">Study Groups</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-48 h-32 bg-white/10 rounded-lg flex items-center justify-center">
                <Users className="h-16 w-16 text-white/60" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Discussions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Trending Discussions</h3>
          <Button variant="outline">View All Discussions</Button>
        </div>

        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        {discussion.trending && (
                          <Badge className="bg-orange-100 text-orange-800">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        <Badge variant="outline">{discussion.category}</Badge>
                      </div>
                      <h4 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">{discussion.title}</h4>
                      <p className="text-gray-600 text-sm">{discussion.preview}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {discussion.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{discussion.author}</p>
                          <p className="text-xs text-gray-600">{discussion.authorRole}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{discussion.timeAgo}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>{discussion.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Heart className="h-4 w-4" />
                        <span>{discussion.likes}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Join Discussion
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Study Groups & Live Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Study Groups */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Active Study Groups</h3>
          <div className="space-y-4">
            {studyGroups.map((group, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{group.name}</h4>
                      <Badge
                        variant={
                          group.difficulty === "Expert"
                            ? "destructive"
                            : group.difficulty === "Advanced"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {group.difficulty}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span>{group.members} members</span>
                        </div>
                        <Badge variant="outline">{group.type}</Badge>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Next: {group.nextSession}</span>
                        </div>
                        <p className="text-sm text-blue-800 mt-1">{group.topic}</p>
                      </div>
                    </div>

                    <Button className="w-full">
                      Join Group
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Events */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Upcoming Live Events</h3>
          <div className="space-y-4">
            {liveEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-red-100 text-red-800">
                        <Video className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg">{event.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {event.speaker
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium">{event.speaker}</span>
                          <span className="text-xs text-gray-600 ml-2">{event.speakerTitle}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span>{event.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span>{event.attendees} attending</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-green-600">{event.price}</span>
                      </div>
                    </div>

                    <Button className="w-full">
                      {event.price === "Free" ? "Join Free" : `Register for ${event.price}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Mentorship Matching */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Recommended Mentors</h3>
          <Button variant="outline">Browse All Mentors</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mentorshipMatches.map((mentor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">{mentor.matchScore}% Match</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{mentor.rating}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <h4 className="font-semibold">{mentor.name}</h4>
                    <p className="text-sm text-gray-600">{mentor.role}</p>
                    <p className="text-sm text-gray-600">{mentor.company}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Response Time:</span>
                      <span className="font-medium">{mentor.responseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sessions:</span>
                      <span className="font-medium">{mentor.sessions}</span>
                    </div>
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

                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Community Impact
          </CardTitle>
          <CardDescription>See how our community is making a difference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">2,847</div>
              <div className="text-sm text-gray-600">Career Transitions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$2.3M</div>
              <div className="text-sm text-gray-600">Avg Salary Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">15,623</div>
              <div className="text-sm text-gray-600">Skills Developed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">94%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
