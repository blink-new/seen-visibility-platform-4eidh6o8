import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { scanService, type ScanResult } from '../services/scanService'
import blink from '../blink/client'
import { 
  ArrowLeft, 
  Plus,
  Sparkles,
  TrendingUp,
  Globe,
  Brain,
  BarChart3,
  Calendar,
  Settings,
  Download,
  Zap,
  Loader2
} from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [recentScans, setRecentScans] = useState<ScanResult[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const initDashboard = async () => {
      try {
        // Initialize auth
        const userData = await blink.auth.me()
        setUser(userData)

        // Load recent scans
        const scans = await scanService.getUserScans(10)
        setRecentScans(scans)
      } catch (error) {
        console.error('Dashboard init error:', error)
      } finally {
        setLoading(false)
      }
    }

    initDashboard()
  }, [])

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

  // Calculate dashboard stats
  const totalScans = recentScans.length
  const avgOverallScore = totalScans > 0 ? Math.round(recentScans.reduce((sum, scan) => sum + scan.overallScore, 0) / totalScans) : 0
  const avgSeoScore = totalScans > 0 ? Math.round(recentScans.reduce((sum, scan) => sum + scan.seoScore, 0) / totalScans) : 0
  const avgLlmScore = totalScans > 0 ? Math.round(recentScans.reduce((sum, scan) => sum + scan.llmScore, 0) / totalScans) : 0

  if (loading) {
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            <span className="ml-2 text-lg text-slate-600">Loading dashboard...</span>
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
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" onClick={() => navigate('/')}>
                <Plus className="h-4 w-4 mr-2" />
                New Scan
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Welcome to Your Visibility Dashboard
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Track your brand's visibility across search engines and AI platforms
          </p>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-white shadow-lg">
              <CardContent className="p-0 text-center">
                <div className="text-2xl font-bold text-slate-900 mb-2">{totalScans}</div>
                <div className="text-sm text-slate-600 mb-3">Total Scans</div>
                <BarChart3 className="h-6 w-6 text-indigo-500 mx-auto" />
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <CardContent className="p-0 text-center">
                <div className={`text-2xl font-bold mb-2 ${getScoreColor(avgOverallScore)}`}>{avgOverallScore}</div>
                <div className="text-sm text-slate-600 mb-3">Avg. Overall Score</div>
                <TrendingUp className="h-6 w-6 text-emerald-500 mx-auto" />
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <CardContent className="p-0 text-center">
                <div className={`text-2xl font-bold mb-2 ${getScoreColor(avgSeoScore)}`}>{avgSeoScore}</div>
                <div className="text-sm text-slate-600 mb-3">Avg. SEO Score</div>
                <Globe className="h-6 w-6 text-indigo-500 mx-auto" />
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <CardContent className="p-0 text-center">
                <div className={`text-2xl font-bold mb-2 ${getScoreColor(avgLlmScore)}`}>{avgLlmScore}</div>
                <div className="text-sm text-slate-600 mb-3">Avg. LLM Score</div>
                <Brain className="h-6 w-6 text-emerald-500 mx-auto" />
              </CardContent>
            </Card>
          </div>

          {/* CTA Card */}
          <Card className="p-8 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready for Another Scan?</h3>
                  <p className="text-indigo-100 mb-4 md:mb-0">
                    Analyze a new website or re-scan an existing one to track improvements
                  </p>
                </div>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/')}
                  className="shrink-0"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Start New Scan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Scans */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recent Scans</h2>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>

          <div className="space-y-4">
            {recentScans.map((scan) => (
              <Card key={scan.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {scan.domain}
                        </h3>
                        <Badge variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(scan.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                          <div className={`text-xl font-bold ${getScoreColor(scan.overallScore)}`}>
                            {scan.overallScore}
                          </div>
                          <div className="text-xs text-slate-500">Overall</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${getScoreColor(scan.seoScore)}`}>
                            {scan.seoScore}
                          </div>
                          <div className="text-xs text-slate-500">SEO</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${getScoreColor(scan.llmScore)}`}>
                            {scan.llmScore}
                          </div>
                          <div className="text-xs text-slate-500">LLM</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge variant={getScoreBadgeVariant(scan.overallScore)}>
                        {scan.overallScore >= 80 ? 'Excellent' : 
                         scan.overallScore >= 60 ? 'Good' : 'Needs Work'}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/scan?url=${encodeURIComponent(scan.websiteUrl)}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/scan?url=${encodeURIComponent(scan.websiteUrl)}`)}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Re-scan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {recentScans.length === 0 && (
            <Card className="p-12 text-center bg-white shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No scans yet
                </h3>
                <p className="text-slate-600 mb-6">
                  Start your first visibility audit to see your results here
                </p>
                <Button onClick={() => navigate('/')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Start Your First Scan
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard