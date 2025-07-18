import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { useToast } from '../hooks/use-toast'
import { scanService, type ScanResult, type QuickFix } from '../services/scanService'
import blink from '../blink/client'
import { 
  ArrowLeft, 
  Globe, 
  Brain, 
  TrendingUp,
  CheckCircle,
  Download,
  Sparkles,
  Search,
  Bot,
  BarChart3,
  Zap,
  Target,
  Eye,
  Users,
  AlertCircle
} from 'lucide-react'

const PlugScan = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [scanProgress, setScanProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [isScanning, setIsScanning] = useState(true)
  const [scanResults, setScanResults] = useState<ScanResult | null>(null)
  const [quickFixes, setQuickFixes] = useState<QuickFix[]>([])
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const website = searchParams.get('url') || ''

  useEffect(() => {
    if (!website) {
      navigate('/')
      return
    }

    // Initialize auth state
    const initAuth = async () => {
      try {
        const userData = await blink.auth.me()
        setUser(userData)
      } catch (error) {
        console.error('Auth error:', error)
        // User will be redirected to auth automatically by Blink SDK
      }
    }

    initAuth()
  }, [website, navigate])

  useEffect(() => {
    if (!user || !website) return

    const runRealScan = async () => {
      try {
        setError(null)
        setIsScanning(true)
        setScanProgress(0)

        // Create scan
        setCurrentStep('Initializing scan...')
        const scanId = await scanService.createScan(website)
        setScanProgress(10)

        // Simulate progress updates
        const scanSteps = [
          { step: 'Analyzing website structure...', progress: 25 },
          { step: 'Querying search engines...', progress: 45 },
          { step: 'Testing LLM responses...', progress: 65 },
          { step: 'Analyzing competitor presence...', progress: 80 },
          { step: 'Generating visibility scores...', progress: 90 },
          { step: 'Preparing recommendations...', progress: 95 }
        ]

        // Update progress with delays
        for (const step of scanSteps) {
          setCurrentStep(step.step)
          setScanProgress(step.progress)
          await new Promise(resolve => setTimeout(resolve, 1500))
        }

        // Perform actual scan
        const result = await scanService.performScan(scanId, website)
        setScanResults(result)

        // Get quick fixes
        const fixes = await scanService.getQuickFixes(scanId)
        setQuickFixes(fixes)

        setScanProgress(100)
        setCurrentStep('Scan complete!')
        
        setTimeout(() => {
          setIsScanning(false)
          toast({
            title: "Scan Complete!",
            description: `Your visibility analysis for ${website} is ready.`
          })
        }, 1000)

      } catch (error) {
        console.error('Scan failed:', error)
        setError('Scan failed. Please try again.')
        setIsScanning(false)
        toast({
          title: "Scan Failed",
          description: "There was an error analyzing your website. Please try again.",
          variant: "destructive"
        })
      }
    }

    runRealScan()
  }, [user, website, toast])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default'
    if (score >= 60) return 'secondary'
    return 'destructive'
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-slate-900">Seen</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Scan Failed
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              {error}
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isScanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-slate-900">Seen</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scanning Interface */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
              <Search className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Scanning {website}
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Analyzing your visibility across search engines and AI platforms
            </p>
          </div>

          <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-slate-700">
                    Scan Progress
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {Math.round(scanProgress)}%
                  </span>
                </div>
                <Progress value={scanProgress} className="h-3" />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-lg font-medium text-slate-700">
                  {currentStep}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-0 text-center">
                <Globe className="h-8 w-8 text-indigo-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">SEO Analysis</h3>
                <p className="text-sm text-slate-600">Traditional search engine optimization</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-0 text-center">
                <Brain className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">LLM Coverage</h3>
                <p className="text-sm text-slate-600">AI platform visibility analysis</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-0 text-center">
                <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Competitor Intel</h3>
                <p className="text-sm text-slate-600">Market position analysis</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">Seen</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm">
                Start Optimization
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Results Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Scan Complete for {website}
          </h1>
          <p className="text-lg text-slate-600">
            Here's your comprehensive visibility analysis
          </p>
        </div>

        {/* Overall Score Cards */}
        {scanResults && (
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center bg-white shadow-lg">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {scanResults.overallScore}
                </div>
                <div className="text-sm text-slate-600 mb-3">Overall Visibility</div>
                <Badge variant={getScoreBadgeVariant(scanResults.overallScore)}>
                  {scanResults.overallScore >= 80 ? 'Excellent' : 
                   scanResults.overallScore >= 60 ? 'Good' : 'Needs Work'}
                </Badge>
              </CardContent>
            </Card>

            <Card className="p-6 text-center bg-white shadow-lg">
              <CardContent className="p-0">
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(scanResults.seoScore)}`}>
                  {scanResults.seoScore}
                </div>
                <div className="text-sm text-slate-600 mb-3">SEO Score</div>
                <Globe className="h-6 w-6 text-indigo-500 mx-auto" />
              </CardContent>
            </Card>

            <Card className="p-6 text-center bg-white shadow-lg">
              <CardContent className="p-0">
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(scanResults.llmScore)}`}>
                  {scanResults.llmScore}
                </div>
                <div className="text-sm text-slate-600 mb-3">LLM Coverage</div>
                <Brain className="h-6 w-6 text-emerald-500 mx-auto" />
              </CardContent>
            </Card>

            <Card className="p-6 text-center bg-white shadow-lg">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  #{scanResults.competitorRank}
                </div>
                <div className="text-sm text-slate-600 mb-3">Market Position</div>
                <div className="text-xs text-slate-500">
                  of {scanResults.totalCompetitors} competitors
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Platform Breakdown */}
        {scanResults && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 bg-white shadow-lg">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-indigo-500" />
                  <span>Platform Visibility</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {Object.entries(scanResults.platformScores).map(([platform, data]) => (
                    <div key={platform} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          {platform === 'google' && '🔍'}
                          {platform === 'chatgpt' && '🤖'}
                          {platform === 'perplexity' && '🔮'}
                          {platform === 'gemini' && '✨'}
                          {platform === 'bing' && '🌐'}
                          {platform === 'claude' && '🧠'}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{platform}</div>
                          <div className="text-sm text-slate-500">{Math.round(data.score)} mentions</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${getScoreColor(Math.round(data.score))}`}>
                          {Math.round(data.score)}
                        </div>
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full"
                            style={{ width: `${Math.min(100, data.score)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-emerald-500" />
                  <span>Quick Wins Available</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {quickFixes.length > 0 ? (
                    quickFixes.map((fix) => (
                      <div key={fix.id} className={`flex items-center justify-between p-4 rounded-lg ${
                        fix.category === 'seo' ? 'bg-emerald-50' :
                        fix.category === 'llm' ? 'bg-blue-50' :
                        fix.category === 'technical' ? 'bg-purple-50' : 'bg-orange-50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          {fix.category === 'seo' && <Target className="h-5 w-5 text-emerald-600" />}
                          {fix.category === 'llm' && <Bot className="h-5 w-5 text-blue-600" />}
                          {fix.category === 'technical' && <Eye className="h-5 w-5 text-purple-600" />}
                          {fix.category === 'content' && <Users className="h-5 w-5 text-orange-600" />}
                          <div>
                            <div className="font-medium">{fix.title}</div>
                            <div className="text-sm text-slate-600">+{fix.impactPoints} points</div>
                          </div>
                        </div>
                        <Badge variant={fix.difficulty === 'easy' ? 'secondary' : fix.difficulty === 'advanced' ? 'outline' : 'secondary'}>
                          {fix.difficulty.charAt(0).toUpperCase() + fix.difficulty.slice(1)}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <p>No quick fixes available at this time.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-emerald-600">
              <Zap className="h-5 w-5 mr-2" />
              Start Optimization
            </Button>
            <Button size="lg" variant="outline">
              <Download className="h-5 w-5 mr-2" />
              Download Full Report
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
              <BarChart3 className="h-5 w-5 mr-2" />
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlugScan