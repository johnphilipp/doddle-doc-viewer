"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Home,
  Phone,
  Mail,
  MapPin,
  PoundSterling,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Search,
  ScrollText,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

const caseData = {
  property: {
    address: "7 Blake Street",
    area: "Buckinghamshire",
    price: "£485,000",
    type: "Freehold",
    bedrooms: 3,
    bathrooms: 2,
  },
  client: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+44 7700 900123",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
  },
  progress: {
    current: 75,
    stage: "Searches Complete",
    stages: [
      { name: "Initial Instructions", completed: true, date: "15 Jan 2025" },
      { name: "Draft Contract", completed: true, date: "18 Jan 2025" },
      { name: "Searches Ordered", completed: true, date: "20 Jan 2025" },
      { name: "Searches Complete", completed: true, date: "28 Jan 2025" },
      { name: "Contract Review", completed: false, date: "Expected: 3 Feb 2025" },
      { name: "Exchange", completed: false, date: "Expected: 10 Feb 2025" },
      { name: "Completion", completed: false, date: "Expected: 17 Feb 2025" },
    ],
  },
  keyDates: [
    { label: "Target Exchange", date: "10 Feb 2025", status: "upcoming" },
    { label: "Target Completion", date: "17 Feb 2025", status: "upcoming" },
    { label: "Mortgage Offer Expires", date: "15 Mar 2025", status: "warning" },
  ],
  recentActivity: [
    { action: "Search results received", time: "2 hours ago", type: "update" },
    { action: "Client message received", time: "4 hours ago", type: "message" },
    { action: "Survey report uploaded", time: "1 day ago", type: "document" },
    { action: "Enquiries raised with seller", time: "2 days ago", type: "enquiry" },
  ],
  tasks: [
    { task: "Review search results", priority: "high", due: "Today" },
    { task: "Prepare contract pack", priority: "medium", due: "Tomorrow" },
    { task: "Chase mortgage lender", priority: "low", due: "3 Feb 2025" },
  ],
  documents: [
    { name: "Search Report", status: "complete", lastUpdated: "Today" },
    { name: "Draft Contract", status: "in-progress", lastUpdated: "2 days ago" },
    { name: "Survey Report", status: "complete", lastUpdated: "1 day ago" },
    { name: "Mortgage Offer", status: "pending", lastUpdated: "1 week ago" },
  ],
}

export default function OverviewPage() {
  return (
    <div className="flex flex-1 flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Overview</h1>
          <p className="text-muted-foreground">
            {caseData.property.address}, {caseData.property.area}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
          <Badge variant="outline">{caseData.progress.stage}</Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Property Value</CardTitle>
            <PoundSterling className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseData.property.price}</div>
            <p className="text-xs text-muted-foreground">{caseData.property.type}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseData.progress.current}%</div>
            <Progress value={caseData.progress.current} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days to Exchange</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Target: 10 Feb 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseData.tasks.length}</div>
            <p className="text-xs text-muted-foreground">1 high priority</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Case Progress</CardTitle>
              <CardDescription>Track the progress of your conveyancing case</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseData.progress.stages.map((stage, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        stage.completed
                          ? "bg-green-500 border-green-500"
                          : index === 4
                            ? "bg-blue-500 border-blue-500"
                            : "border-muted-foreground"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-medium ${stage.completed ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {stage.name}
                        </span>
                        <span className="text-sm text-muted-foreground">{stage.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                  <Link href="/messages">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm">Messages</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                  <Link href="/enquiries">
                    <HelpCircle className="h-5 w-5" />
                    <span className="text-sm">Enquiries</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                  <Link href="/searches">
                    <Search className="h-5 w-5" />
                    <span className="text-sm">Searches</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                  <Link href="/title-report">
                    <ScrollText className="h-5 w-5" />
                    <span className="text-sm">Title Report</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "update"
                          ? "bg-blue-500"
                          : activity.type === "message"
                            ? "bg-green-500"
                            : activity.type === "document"
                              ? "bg-purple-500"
                              : "bg-orange-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={caseData.client.avatar || "/placeholder.svg"} alt={caseData.client.name} />
                  <AvatarFallback>
                    {caseData.client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{caseData.client.name}</p>
                  <p className="text-sm text-muted-foreground">Buyer</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{caseData.client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{caseData.client.phone}</span>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                <Link href="/messages">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{caseData.property.address}</p>
                    <p className="text-sm text-muted-foreground">{caseData.property.area}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {caseData.property.bedrooms} bed, {caseData.property.bathrooms} bath
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PoundSterling className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {caseData.property.price} {caseData.property.type}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Dates */}
          <Card>
            <CardHeader>
              <CardTitle>Key Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseData.keyDates.map((date, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{date.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{date.date}</span>
                      {date.status === "warning" && <AlertCircle className="h-4 w-4 text-orange-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseData.tasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                    </div>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
