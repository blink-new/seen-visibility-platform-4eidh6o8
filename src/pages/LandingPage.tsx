import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Search, 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Globe,
  Bot,
  BarChart3,
  Sparkles
} from 'lucide-react'

const LandingPage = () => {
  const [website, setWebsite] = useState('')
  const navigate = useNavigate()

  const handleStartScan = () => {
    if (website.trim()) {
      navigate(`/scan?url=${encodeURIComponent(website)}`)
    }
  }

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Instant Visibility Audit",
      description: "Get comprehensive SEO and LLM visibility scores in seconds"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "LLM Coverage Analysis",
      description: "See how ChatGPT, Perplexity, and Gemini mention your brand"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Competitor Intelligence",
      description: "Compare your visibility against top competitors"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Optimization",
      description: "Get actionable recommendations to boost your presence"
    }
  ]

  const platforms = [
    { name: "Google", logo: "🔍" },
    { name: "ChatGPT", logo: "🤖" },
    { name: "Perplexity", logo: "🔮" },
    { name: "Gemini", logo: "✨" },
    { name: "Bing", logo: "🌐" },
    { name: "Claude", logo: "🧠" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Seen</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">How it Works</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Bot className="h-4 w-4 mr-2" />
            Next-Gen Visibility Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Dominate Both
            <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent"> SEO </span>
            and
            <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent"> AI Search</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Boost your brand visibility across traditional search engines and AI-powered platforms like ChatGPT, Perplexity, and Gemini with instant audits and optimization.
          </p>

          {/* Instant Scan CTA */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-4 text-slate-900">
                  Start Your Free Visibility Audit
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="Enter your website URL (e.g., example.com)"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="flex-1 h-12 text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleStartScan()}
                  />
                  <Button 
                    onClick={handleStartScan}
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Scan Now
                  </Button>
                </div>
                <p className="text-sm text-slate-500 mt-3">
                  ✨ Get instant results • No signup required • 100% free audit
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Platform Logos */}
          <div className="mb-20">
            <p className="text-sm text-slate-500 mb-6">Analyze your visibility across all major platforms</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {platforms.map((platform, index) => (
                <div key={index} className="flex items-center space-x-2 text-slate-600">
                  <span className="text-2xl">{platform.logo}</span>
                  <span className="font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Win Online
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive visibility optimization that works across traditional search and AI platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-slate-50/50">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Seen Works
            </h2>
            <p className="text-xl text-slate-600">
              Three simple steps to visibility dominance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Plug & Scan</h3>
              <p className="text-slate-600">
                Enter your website and let our AI analyze your visibility across search engines and LLM platforms
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Get Insights</h3>
              <p className="text-slate-600">
                Receive detailed visibility scores, competitor analysis, and AI-powered optimization recommendations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Optimize & Win</h3>
              <p className="text-slate-600">
                Implement our suggestions and watch your brand dominate both traditional and AI-powered search
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Dominate AI Search?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of brands already optimizing for the future of search
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="h-14 px-8 text-lg"
            onClick={() => document.querySelector('input')?.focus()}
          >
            Start Your Free Audit
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Seen</span>
              </div>
              <p className="text-slate-400">
                Next-generation visibility optimization for the AI era.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Seen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage