'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Briefcase,
  Users,
  Target,
  Clock,
  Star,
  Play,
  CheckCircle,
  Building,
  DollarSign,
  BarChart3,
  Lightbulb,
} from 'lucide-react'

const realWorldProjects = [
  {
    id: 'tesla-valuation',
    title: 'Tesla Valuation Analysis',
    company: 'Tesla Inc.',
    industry: 'Automotive/Technology',
    difficulty: 'Advanced',
    duration: '3-4 hours',
    type: 'Financial Analysis',
    rating: 4.9,
    participants: 1247,
    description:
      'Conduct a comprehensive valuation of Tesla using multiple methodologies including DCF, comparable analysis, and sum-of-the-parts.',
    objectives: [
      'Build a 10-year DCF model for Tesla',
      'Perform comparable company analysis with other EV manufacturers',
      'Value Tesla\'s different business segments (automotive, energy, autonomous driving)',
      'Present investment recommendation with price target',
    ],
    skills: ['DCF Modeling', 'Comparable Analysis', 'Industry Analysis', 'Excel', 'Presentation'],
    realWorldContext:
      'You\'re an equity research analyst at Goldman Sachs preparing a research report on Tesla for institutional clients.',
    deliverables: [
      'Complete financial model in Excel',
      '10-slide investment presentation',
      'Written investment thesis (2 pages)',
      'Price target and recommendation',
    ],
    data: {
      revenue2023: 96773000000,
      vehicleDeliveries: 1808581,
      grossMargin: 0.19,
      rndSpending: 3075000000,
      cashPosition: 29094000000,
    },
    mentorSupport: true,
    certification: 'Goldman Sachs Equity Research Certificate',
  },
  {
    id: 'netflix-strategy',
    title: 'Netflix Global Expansion Strategy',
    company: 'Netflix Inc.',
    industry: 'Media & Entertainment',
    difficulty: 'Advanced',
    duration: '4-5 hours',
    type: 'Strategic Planning',
    rating: 4.8,
    participants: 892,
    description:
      'Develop a comprehensive strategy for Netflix\'s expansion into emerging markets, considering local content, pricing, and competition.',
    objectives: [
      'Analyze market opportunity in 3 emerging markets',
      'Develop localization strategy for content and pricing',
      'Create competitive response plan',
      'Design go-to-market strategy with timeline and budget',
    ],
    skills: ['Market Analysis', 'Strategic Planning', 'Competitive Intelligence', 'Financial Modeling', 'Presentation'],
    realWorldContext:
      'You\'re a strategy consultant at McKinsey hired by Netflix\'s executive team to guide their next phase of international expansion.',
    deliverables: [
      'Market analysis report for target countries',
      'Strategic recommendations presentation',
      'Financial projections and ROI analysis',
      'Implementation roadmap',
    ],
    data: {
      globalSubscribers: 260280000,
      contentSpending: 17000000000,
      averageRevenuePerUser: 11.76,
      internationalRevenue: 0.52,
    },
    mentorSupport: true,
    certification: 'McKinsey Strategy Consulting Certificate',
  },
  {
    id: 'amazon-operations',
    title: 'Amazon Warehouse Optimization',
    company: 'Amazon',
    industry: 'E-commerce/Logistics',
    difficulty: 'Intermediate',
    duration: '2-3 hours',
    type: 'Operations Excellence',
    rating: 4.7,
    participants: 1456,
    description:
      'Apply Lean Six Sigma methodology to optimize Amazon\'s warehouse operations, reducing costs and improving delivery times.',
    objectives: [
      'Identify bottlenecks in current warehouse processes',
      'Apply DMAIC methodology to solve operational challenges',
      'Design improved process flows',
      'Calculate cost savings and efficiency gains',
    ],
    skills: ['Lean Six Sigma', 'Process Mapping', 'Data Analysis', 'Project Management', 'Cost Analysis'],
    realWorldContext:
      'You\'re an operations consultant working with Amazon\'s fulfillment team to improve warehouse efficiency during peak season.',
    deliverables: [
      'Current state process map',
      'Root cause analysis report',
      'Future state process design',
      'Implementation plan with ROI projections',
    ],
    data: {
      dailyOrders: 1600000,
      averagePickTime: 45,
      packingAccuracy: 0.997,
      warehouseCount: 185,
      fulfillmentCost: 0.15,
    },
    mentorSupport: true,
    certification: 'Amazon Operations Excellence Certificate',
  },
  {
    id: 'startup-launch',
    title: 'FinTech Startup Launch Plan',
    company: 'Your Startup',
    industry: 'Financial Technology',
    difficulty: 'Expert',
    duration: '6-8 hours',
    type: 'Entrepreneurship',
    rating: 4.9,
    participants: 634,
    description:
      'Create a comprehensive business plan for launching a FinTech startup, from idea validation to Series A fundraising.',
    objectives: [
      'Validate business idea using lean startup methodology',
      'Develop business model and revenue projections',
      'Create go-to-market strategy',
      'Prepare Series A pitch deck and financial model',
    ],
    skills: ['Business Planning', 'Market Research', 'Financial Modeling', 'Fundraising', 'Lean Startup'],
    realWorldContext:
      'You\'re an entrepreneur with a FinTech idea, working to launch your startup and raise venture capital funding.',
    deliverables: [
      'Business model canvas',
      '5-year financial projections',
      'Series A pitch deck (15 slides)',
      'Go-to-market strategy document',
    ],
    data: {
      marketSize: 332000000000,
      targetCustomers: 50000000,
      competitorFunding: 25000000000,
      averageCAC: 150,
      projectedLTV: 2400,
    },
    mentorSupport: true,
    certification: 'Y Combinator Startup Certificate',
  },
]

export default function RealWorldProjects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  if (selectedProject) {
    const project = realWorldProjects.find((p) => p.id === selectedProject)
    if (!project) return null

    return (
      <div className='space-y-6'>
        {/* Project Header */}
        <Card className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white'>
          <CardContent className='p-8'>
            <div className='space-y-4'>
              <Button
                variant='ghost'
                className='text-white hover:bg-white/20 p-0 h-auto'
                onClick={() => setSelectedProject(null)}
              >
                ← Back to Projects
              </Button>
              <div className='space-y-2'>
                <Badge className='bg-white/20 text-white border-white/30'>{project.type}</Badge>
                <h1 className='text-3xl font-bold'>{project.title}</h1>
                <p className='text-indigo-100'>{project.description}</p>
              </div>
              <div className='flex items-center space-x-6'>
                <div className='flex items-center space-x-2'>
                  <Building className='h-5 w-5' />
                  <span>{project.company}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Clock className='h-5 w-5' />
                  <span>{project.duration}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Star className='h-5 w-5 fill-current' />
                  <span>{project.rating}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Users className='h-5 w-5' />
                  <span>{project.participants} completed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='objectives'>Objectives</TabsTrigger>
            <TabsTrigger value='data'>Data & Resources</TabsTrigger>
            <TabsTrigger value='deliverables'>Deliverables</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Project Context</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='bg-blue-50 p-4 rounded-lg'>
                    <h4 className='font-semibold text-blue-800 mb-2'>Your Role</h4>
                    <p className='text-blue-700'>{project.realWorldContext}</p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <h4 className='font-semibold mb-2'>Industry</h4>
                      <p className='text-gray-600'>{project.industry}</p>
                    </div>
                    <div>
                      <h4 className='font-semibold mb-2'>Difficulty</h4>
                      <Badge
                        variant={
                          project.difficulty === 'Expert'
                            ? 'destructive'
                            : project.difficulty === 'Advanced'
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {project.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className='font-semibold mb-2'>Skills You&apos;ll Apply</h4>
                    <div className='flex flex-wrap gap-2'>
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant='outline'>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {project.mentorSupport && (
                    <div className='bg-green-50 p-4 rounded-lg'>
                      <h4 className='font-semibold text-green-800 mb-2'>🎯 Mentor Support Available</h4>
                      <p className='text-green-700'>Get guidance from industry experts throughout your project.</p>
                    </div>
                  )}

                  {project.certification && (
                    <div className='bg-purple-50 p-4 rounded-lg'>
                      <h4 className='font-semibold text-purple-800 mb-2'>🏆 Certification</h4>
                      <p className='text-purple-700'>Earn: {project.certification}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='objectives' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Target className='h-5 w-5 mr-2' />
                  Project Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {project.objectives.map((objective, index) => (
                    <div key={index} className='flex items-start space-x-3 p-4 border rounded-lg'>
                      <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0'>
                        {index + 1}
                      </div>
                      <div>
                        <p className='font-medium'>{objective}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='data' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <BarChart3 className='h-5 w-5 mr-2' />
                  Company Data & Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {Object.entries(project.data).map(([key, value]) => (
                    <div key={key} className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='font-semibold capitalize mb-1'>{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                      <p className='text-2xl font-bold text-blue-600'>
                        {typeof value === 'number' && value > 1000000000
                          ? `$${(value / 1000000000).toFixed(1)}B`
                          : typeof value === 'number' && value > 1000000
                            ? `$${(value / 1000000).toFixed(1)}M`
                            : typeof value === 'number' && value < 1 && value > 0
                              ? `${(value * 100).toFixed(1)}%`
                              : value.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='deliverables' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <CheckCircle className='h-5 w-5 mr-2' />
                  Project Deliverables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {project.deliverables.map((deliverable, index) => (
                    <div key={index} className='flex items-center space-x-3 p-4 border rounded-lg'>
                      <CheckCircle className='h-5 w-5 text-green-500 flex-shrink-0' />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>

                <div className='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                  <h4 className='font-semibold text-yellow-800 mb-2'>💡 Success Tips</h4>
                  <ul className='text-yellow-700 text-sm space-y-1'>
                    <li>• Focus on practical, actionable recommendations</li>
                    <li>• Support your analysis with data and frameworks</li>
                    <li>• Present findings clearly and professionally</li>
                    <li>• Consider implementation challenges and solutions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-lg font-semibold'>Ready to Start?</h3>
                <p className='text-gray-600'>
                  Begin your real-world business project and earn professional certification.
                </p>
              </div>
              <Button size='lg' className='bg-gradient-to-r from-blue-600 to-purple-600'>
                <Play className='h-4 w-4 mr-2' />
                Start Project
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <Card className='bg-gradient-to-r from-green-600 to-blue-600 text-white'>
        <CardContent className='p-8'>
          <div className='space-y-4'>
            <Badge className='bg-white/20 text-white border-white/30'>Real-World Projects</Badge>
            <h2 className='text-3xl font-bold'>Apply Your Skills to Real Business Challenges</h2>
            <p className='text-green-100 max-w-3xl'>
              Work on actual business problems faced by Fortune 500 companies. Build your portfolio with projects that
              demonstrate real-world impact and earn industry-recognized certifications.
            </p>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              <div className='text-center'>
                <div className='text-2xl font-bold'>50+</div>
                <div className='text-green-100'>Real Projects</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>95%</div>
                <div className='text-green-100'>Completion Rate</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>4.8★</div>
                <div className='text-green-100'>Average Rating</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>12k+</div>
                <div className='text-green-100'>Completed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Categories */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          { name: 'Financial Analysis', icon: DollarSign, count: 12, color: 'bg-blue-500' },
          { name: 'Strategic Planning', icon: Target, count: 8, color: 'bg-purple-500' },
          { name: 'Operations', icon: BarChart3, count: 15, color: 'bg-green-500' },
          { name: 'Entrepreneurship', icon: Lightbulb, count: 6, color: 'bg-orange-500' },
        ].map((category) => (
          <Card key={category.name} className='hover:shadow-md transition-shadow cursor-pointer'>
            <CardContent className='p-6 text-center'>
              <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <category.icon className='h-6 w-6 text-white' />
              </div>
              <h3 className='font-semibold'>{category.name}</h3>
              <p className='text-sm text-gray-600'>{category.count} projects</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Projects */}
      <div>
        <h3 className='text-2xl font-bold mb-6'>Featured Projects</h3>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {realWorldProjects.map((project) => (
            <Card key={project.id} className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge
                    variant={
                      project.difficulty === 'Expert'
                        ? 'destructive'
                        : project.difficulty === 'Advanced'
                          ? 'default'
                          : 'secondary'
                    }
                  >
                    {project.difficulty}
                  </Badge>
                  <div className='flex items-center space-x-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm'>{project.rating}</span>
                  </div>
                </div>
                <CardTitle className='text-xl'>{project.title}</CardTitle>
                <CardDescription>
                  {project.company} • {project.industry}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <p className='text-sm text-gray-600'>{project.description}</p>

                  <div className='flex items-center justify-between text-sm text-gray-600'>
                    <div className='flex items-center space-x-2'>
                      <Clock className='h-4 w-4' />
                      <span>{project.duration}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Users className='h-4 w-4' />
                      <span>{project.participants} completed</span>
                    </div>
                  </div>

                  <div>
                    <h5 className='font-semibold mb-2 text-sm'>Skills Applied:</h5>
                    <div className='flex flex-wrap gap-1'>
                      {project.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant='outline' className='text-xs'>
                          {skill}
                        </Badge>
                      ))}
                      {project.skills.length > 3 && (
                        <Badge variant='outline' className='text-xs'>
                          +{project.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      {project.mentorSupport && (
                        <Badge className='bg-green-100 text-green-800 text-xs'>Mentor Support</Badge>
                      )}
                      {project.certification && (
                        <Badge className='bg-purple-100 text-purple-800 text-xs'>Certificate</Badge>
                      )}
                    </div>
                  </div>

                  <Button className='w-full' onClick={() => setSelectedProject(project.id)}>
                    <Briefcase className='h-4 w-4 mr-2' />
                    View Project Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <Card>
        <CardHeader>
          <CardTitle>Project Success Stories</CardTitle>
          <CardDescription>How real-world projects accelerated careers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[
              {
                name: 'Alex Chen',
                role: 'Financial Analyst → Investment Banking Associate',
                project: 'Tesla Valuation Analysis',
                outcome: 'Landed Goldman Sachs role',
                quote: 'The Tesla valuation project gave me the exact skills I needed for my Goldman Sachs interviews.',
              },
              {
                name: 'Maria Rodriguez',
                role: 'Marketing Manager → Strategy Consultant',
                project: 'Netflix Global Strategy',
                outcome: 'Joined McKinsey & Company',
                quote: 'Working on the Netflix strategy case prepared me perfectly for consulting case interviews.',
              },
              {
                name: 'David Park',
                role: 'Software Engineer → Product Manager',
                project: 'Amazon Operations Optimization',
                outcome: 'Promoted to Senior PM',
                quote: 'The operations project taught me to think like a business leader, not just an engineer.',
              },
            ].map((story, index) => (
              <div key={index} className='bg-gray-50 p-6 rounded-lg'>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold'>
                      {story.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h4 className='font-semibold'>{story.name}</h4>
                      <p className='text-sm text-gray-600'>{story.role}</p>
                    </div>
                  </div>
                  <Badge className='bg-blue-100 text-blue-800'>{story.project}</Badge>
                  <Badge className='bg-green-100 text-green-800'>{story.outcome}</Badge>
                  <p className='text-sm italic'>&apos;{story.quote}&apos;</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
