import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

/**
 * Renders the Home Page of the Business Logic Academy.
 * This component serves as the main landing page, showcasing the platform's
 * features, learning phases, and expert analysis. It is designed to be
 * visually engaging and informative, encouraging users to start their
 * learning journey.
 * @returns {JSX.Element} The rendered home page component.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  The New Era
                </span>
                <br />
                <span className="text-white">of Business & AI Mastery</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Where adaptive learning meets creative pedagogy to transform how professionals master AI-driven business innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                  Start Your Journey
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Explore Curriculum
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full h-[400px]">
                <Image 
                  src="/images/ai-business-hero.png" 
                  alt="AI Business Integration Visualization" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Phases Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            The Five Phases of <span className="text-purple-600">Adaptive Mastery</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                phase: "Phase 0",
                title: "Foundation",
                description: "Build essential knowledge foundations through personalized learning paths",
                icon: "🌱",
                color: "from-emerald-500 to-teal-600"
              },
              {
                phase: "Phase 1",
                title: "Exploration",
                description: "Discover AI concepts through guided inquiry and creative exploration",
                icon: "🔍",
                color: "from-blue-500 to-indigo-600"
              },
              {
                phase: "Phase 2",
                title: "Application",
                description: "Apply AI tools to real business challenges with expert guidance",
                icon: "⚙️",
                color: "from-purple-500 to-violet-600"
              },
              {
                phase: "Phase 3",
                title: "Integration",
                description: "Integrate AI solutions across business functions with strategic frameworks",
                icon: "🔄",
                color: "from-orange-500 to-amber-600"
              },
              {
                phase: "Phase 4",
                title: "Innovation",
                description: "Lead AI-driven business transformation and pioneer new approaches",
                icon: "💡",
                color: "from-pink-500 to-rose-600"
              }
            ].map((phase, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className={`bg-gradient-to-br ${phase.color} text-white rounded-t-lg`}>
                  <div className="text-4xl mb-2">{phase.icon}</div>
                  <CardTitle>{phase.phase}</CardTitle>
                  <CardDescription className="text-white/90 font-medium">
                    {phase.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p>{phase.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">Explore Modules</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Analysis Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert Analysis & Real-World Application</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry leaders and apply cutting-edge research to solve complex business challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>AI Market Analysis</CardTitle>
                <CardDescription>Expert insights on AI market trends and forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-4 bg-slate-100 rounded-md overflow-hidden">
                  <Image 
                    src="/images/ai-market-analysis.png" 
                    alt="AI Market Analysis" 
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Our expert analysis shows AI enterprise solutions growing at 38% CAGR through 2028, with generative AI applications leading adoption across financial services, healthcare, and manufacturing sectors.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Full Analysis</Button>
              </CardFooter>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Transformer Architecture Deep Dive</CardTitle>
                <CardDescription>Technical breakdown of attention mechanisms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-4 bg-slate-100 rounded-md overflow-hidden">
                  <Image 
                    src="/images/transformer-architecture.png" 
                    alt="Transformer Architecture" 
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Explore the multi-head attention mechanism that revolutionized NLP, with performance benchmarks showing 37% improvement in translation tasks and 42% reduction in training time compared to RNN architectures.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Study Technical Details</Button>
              </CardFooter>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Business Implementation Case Studies</CardTitle>
                <CardDescription>Real-world AI transformation stories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-4 bg-slate-100 rounded-md overflow-hidden">
                  <Image 
                    src="/images/business-case-studies.png" 
                    alt="Business Case Studies" 
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Analysis of 50+ enterprise AI implementations reveals 27% average cost reduction, 32% productivity improvement, and 41% faster time-to-market across manufacturing, retail, and financial services sectors.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Explore Case Studies</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Adaptive Learning Features */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Powered by <span className="text-purple-400">Advanced Adaptive Learning</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI-Driven Assessment",
                description: "Continuous evaluation that adapts to your learning style and pace",
                icon: "📊"
              },
              {
                title: "Personalized Learning Paths",
                description: "Custom curriculum based on your goals, experience, and progress",
                icon: "🧭"
              },
              {
                title: "Interactive Simulations",
                description: "Hands-on practice with real AI models and business scenarios",
                icon: "🔬"
              },
              {
                title: "Expert Mentorship",
                description: "Connect with industry leaders for guidance and feedback",
                icon: "👨‍🏫"
              },
              {
                title: "Business Integration Projects",
                description: "Apply AI solutions to real business challenges with measurable outcomes",
                icon: "💼"
              },
              {
                title: "Community Collaboration",
                description: "Learn alongside peers and build your professional network",
                icon: "👥"
              },
              {
                title: "Verified Certification",
                description: "Earn industry-recognized credentials for your achievements",
                icon: "🏆"
              },
              {
                title: "Continuous Innovation",
                description: "Stay current with the latest AI advancements and business applications",
                icon: "🚀"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Master the New Era?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals transforming their careers through our adaptive AI business mastery platform
          </p>
          <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-6 text-lg">
            Begin Your Learning Journey
          </Button>
        </div>
      </section>
    </div>
  );
}
