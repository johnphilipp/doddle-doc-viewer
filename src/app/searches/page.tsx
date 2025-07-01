"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  MoreVertical,
  Building,
  Zap,
  Car,
  TreePine,
  Shield,
  FileText,
  PoundSterling,
} from "lucide-react"

interface SearchResult {
  id: string
  type: string
  status: "complete" | "pending" | "in-progress" | "failed"
  provider: string
  orderDate: string
  completedDate?: string
  cost: string
  summary: string
  issues: number
  priority: "low" | "medium" | "high"
}

const searchResults: SearchResult[] = [
  {
    id: "LL1",
    type: "Local Land Charges",
    status: "complete",
    provider: "Buckinghamshire Council",
    orderDate: "20 Jan 2025",
    completedDate: "22 Jan 2025",
    cost: "£15.00",
    summary: "No adverse charges found",
    issues: 0,
    priority: "low",
  },
  {
    id: "CON29",
    type: "Local Authority Search",
    status: "complete",
    provider: "Buckinghamshire Council",
    orderDate: "20 Jan 2025",
    completedDate: "25 Jan 2025",
    cost: "£95.00",
    summary: "Standard responses received",
    issues: 1,
    priority: "medium",
  },
  {
    id: "CON29O",
    type: "Optional Enquiries",
    status: "complete",
    provider: "Buckinghamshire Council",
    orderDate: "20 Jan 2025",
    completedDate: "25 Jan 2025",
    cost: "£45.00",
    summary: "No significant issues",
    issues: 0,
    priority: "low",
  },
  {
    id: "WATER",
    type: "Water & Drainage",
    status: "complete",
    provider: "Thames Water",
    orderDate: "20 Jan 2025",
    completedDate: "23 Jan 2025",
    cost: "£42.50",
    summary: "Mains water and drainage connected",
    issues: 0,
    priority: "low",
  },
  {
    id: "ENV",
    type: "Environmental Search",
    status: "complete",
    provider: "Landmark Information",
    orderDate: "20 Jan 2025",
    completedDate: "24 Jan 2025",
    cost: "£85.00",
    summary: "Low environmental risk",
    issues: 2,
    priority: "medium",
  },
  {
    id: "FLOOD",
    type: "Flood Risk",
    status: "complete",
    provider: "Environment Agency",
    orderDate: "20 Jan 2025",
    completedDate: "21 Jan 2025",
    cost: "£25.00",
    summary: "Low flood risk area",
    issues: 0,
    priority: "low",
  },
  {
    id: "MINING",
    type: "Mining Search",
    status: "pending",
    provider: "Coal Authority",
    orderDate: "20 Jan 2025",
    cost: "£35.00",
    summary: "Awaiting response",
    issues: 0,
    priority: "low",
  },
  {
    id: "CHANCEL",
    type: "Chancel Repair",
    status: "complete",
    provider: "Chancel Repair Solutions",
    orderDate: "20 Jan 2025",
    completedDate: "22 Jan 2025",
    cost: "£18.00",
    summary: "No liability identified",
    issues: 0,
    priority: "low",
  },
]

const searchSummary = {
  total: searchResults.length,
  complete: searchResults.filter((s) => s.status === "complete").length,
  pending: searchResults.filter((s) => s.status === "pending").length,
  inProgress: searchResults.filter((s) => s.status === "in-progress").length,
  totalCost: searchResults.reduce((sum, search) => sum + Number.parseFloat(search.cost.replace("£", "")), 0),
  totalIssues: searchResults.reduce((sum, search) => sum + search.issues, 0),
}

const keyFindings = [
  {
    category: "Planning",
    icon: Building,
    finding: "No current planning applications affecting the property",
    impact: "Positive",
    source: "Local Authority Search",
  },
  {
    category: "Environmental",
    icon: TreePine,
    finding: "Former industrial use identified 200m from property",
    impact: "Monitor",
    source: "Environmental Search",
  },
  {
    category: "Utilities",
    icon: Zap,
    finding: "All main services connected and available",
    impact: "Positive",
    source: "Water & Drainage Search",
  },
  {
    category: "Transport",
    icon: Car,
    finding: "Proposed road widening scheme within 500m",
    impact: "Monitor",
    source: "Local Authority Search",
  },
]

const riskAssessment = {
  overall: "Low",
  factors: [
    { category: "Environmental", risk: "Low", details: "No contamination issues identified" },
    { category: "Planning", risk: "Low", details: "No adverse planning history" },
    { category: "Infrastructure", risk: "Medium", details: "Road works may cause temporary disruption" },
    { category: "Legal", risk: "Low", details: "No legal restrictions identified" },
  ],
}

export default function SearchesPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complete</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="default">Medium</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const completionPercentage = Math.round((searchSummary.complete / searchSummary.total) * 100)

  return (
    <div className="flex flex-1 flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property Searches</h1>
          <p className="text-muted-foreground">7 Blake Street, Buckinghamshire</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {searchSummary.complete} of {searchSummary.total} Complete
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <Progress value={completionPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {searchSummary.complete} of {searchSummary.total} searches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <PoundSterling className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{searchSummary.totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Across {searchSummary.total} searches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{searchSummary.totalIssues}</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{riskAssessment.overall}</div>
            <p className="text-xs text-muted-foreground">Overall assessment</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="results">Search Results</TabsTrigger>
          <TabsTrigger value="findings">Key Findings</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Search Progress</CardTitle>
                <CardDescription>Status of all property searches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResults.slice(0, 6).map((search) => (
                    <div key={search.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(search.status)}
                        <div>
                          <p className="font-medium text-sm">{search.type}</p>
                          <p className="text-xs text-muted-foreground">{search.provider}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(search.status)}
                        <p className="text-xs text-muted-foreground mt-1">{search.cost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest search updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Environmental Search completed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Local Authority Search completed</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mining Search ordered</p>
                      <p className="text-xs text-muted-foreground">8 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Water & Drainage Search completed</p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>Detailed view of all property searches</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Search Type</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((search) => (
                    <TableRow key={search.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{search.type}</p>
                          <p className="text-sm text-muted-foreground">{search.id}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{search.provider}</TableCell>
                      <TableCell>{getStatusBadge(search.status)}</TableCell>
                      <TableCell className="text-sm">{search.orderDate}</TableCell>
                      <TableCell className="text-sm font-medium">{search.cost}</TableCell>
                      <TableCell>
                        {search.issues > 0 ? (
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            {search.issues}
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>{getPriorityBadge(search.priority)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              View Summary
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {keyFindings.map((finding, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <finding.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{finding.category}</CardTitle>
                      <CardDescription>{finding.source}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{finding.finding}</p>
                  <Badge
                    variant={finding.impact === "Positive" ? "default" : "outline"}
                    className={
                      finding.impact === "Positive"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "text-orange-600 border-orange-200"
                    }
                  >
                    {finding.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Detailed risk analysis by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAssessment.factors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <p className="font-medium">{factor.category}</p>
                        <p className="text-sm text-muted-foreground">{factor.details}</p>
                      </div>
                      <Badge
                        variant={
                          factor.risk === "Low" ? "default" : factor.risk === "Medium" ? "outline" : "destructive"
                        }
                        className={
                          factor.risk === "Low"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : factor.risk === "Medium"
                              ? "text-orange-600 border-orange-200"
                              : ""
                        }
                      >
                        {factor.risk}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Risk</CardTitle>
                <CardDescription>Summary assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{riskAssessment.overall}</div>
                  <p className="text-sm text-muted-foreground mb-4">Risk Level</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Environmental</span>
                      <span className="text-green-600">Low</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Planning</span>
                      <span className="text-green-600">Low</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Infrastructure</span>
                      <span className="text-orange-600">Medium</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Legal</span>
                      <span className="text-green-600">Low</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
