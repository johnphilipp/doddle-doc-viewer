"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  PoundSterling,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Search,
  ScrollText,
  HelpCircle,
  Clock,
  TrendingUp,
  Users,
  FileText,
  ArrowRight,
  Bell,
  Star,
} from "lucide-react";
import Link from "next/link";

const recentActivity = [
  {
    action: "Search results received",
    time: "2 hours ago",
    type: "update",
    icon: Search,
  },
  {
    action: "Client message received",
    time: "4 hours ago",
    type: "message",
    icon: MessageSquare,
  },
  {
    action: "Title report updated",
    time: "6 hours ago",
    type: "document",
    icon: ScrollText,
  },
  {
    action: "New enquiry raised",
    time: "1 day ago",
    type: "enquiry",
    icon: HelpCircle,
  },
];

const upcomingTasks = [
  {
    task: "Review search results",
    priority: "high",
    due: "Today",
    case: "7 Blake Street",
  },
  {
    task: "Client meeting scheduled",
    priority: "medium",
    due: "Tomorrow",
    case: "15 Oak Avenue",
  },
  {
    task: "Contract review deadline",
    priority: "high",
    due: "3 Feb 2025",
    case: "22 Maple Close",
  },
  {
    task: "Exchange completion",
    priority: "medium",
    due: "5 Feb 2025",
    case: "7 Blake Street",
  },
];

const activeCases = [
  {
    id: 1,
    address: "7 Blake Street",
    area: "Buckinghamshire",
    client: "Sarah Johnson",
    progress: 75,
    status: "Searches Complete",
    priority: "high",
    value: "£485,000",
    nextAction: "Contract Review",
    daysToExchange: 12,
  },
  {
    id: 2,
    address: "15 Oak Avenue",
    area: "Surrey",
    client: "Michael Chen",
    progress: 45,
    status: "Searches Ordered",
    priority: "medium",
    value: "£620,000",
    nextAction: "Await Search Results",
    daysToExchange: 28,
  },
  {
    id: 3,
    address: "22 Maple Close",
    area: "Kent",
    client: "Emma Williams",
    progress: 90,
    status: "Ready for Exchange",
    priority: "high",
    value: "£395,000",
    nextAction: "Schedule Exchange",
    daysToExchange: 3,
  },
];

const quickStats = {
  totalCases: 12,
  activeCases: 8,
  completedThisMonth: 4,
  totalValue: "£2.4M",
  averageCompletion: 42,
  pendingTasks: 15,
};

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your cases today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button asChild>
            <Link href="/overview">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.activeCases}</div>
            <p className="text-xs text-muted-foreground">
              of {quickStats.totalCases} total cases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Value
            </CardTitle>
            <PoundSterling className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.totalValue}</div>
            <p className="text-xs text-muted-foreground">Across active cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed This Month
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quickStats.completedThisMonth}
            </div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">3 high priority</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Cases */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Cases</CardTitle>
                <CardDescription>
                  Your current conveyancing matters
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/cases">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCases.map((case_) => (
                  <Card
                    key={case_.id}
                    className="p-4 hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{case_.address}</h3>
                          <Badge
                            variant={
                              case_.priority === "high"
                                ? "destructive"
                                : "default"
                            }
                            className="text-xs"
                          >
                            {case_.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {case_.area}
                        </p>
                        <p className="text-sm font-medium">
                          Client: {case_.client}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{case_.value}</p>
                        <p className="text-xs text-muted-foreground">
                          {case_.daysToExchange} days to exchange
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{case_.progress}%</span>
                      </div>
                      <Progress value={case_.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Status: {case_.status}
                        </span>
                        <span className="font-medium">
                          Next: {case_.nextAction}
                        </span>
                      </div>
                    </div>
                  </Card>
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
                <Button
                  asChild
                  variant="outline"
                  className="h-auto p-4 flex flex-col gap-2 bg-transparent"
                >
                  <Link href="/messages">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm">Messages</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto p-4 flex flex-col gap-2 bg-transparent"
                >
                  <Link href="/enquiries">
                    <HelpCircle className="h-5 w-5" />
                    <span className="text-sm">Enquiries</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto p-4 flex flex-col gap-2 bg-transparent"
                >
                  <Link href="/searches">
                    <Search className="h-5 w-5" />
                    <span className="text-sm">Searches</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto p-4 flex flex-col gap-2 bg-transparent"
                >
                  <Link href="/title-report">
                    <ScrollText className="h-5 w-5" />
                    <span className="text-sm">Title Report</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Your priority items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-3 rounded-lg border"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-xs text-muted-foreground">
                        {task.case}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {task.due}
                      </p>
                    </div>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : "default"
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

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <activity.icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>This Month</CardTitle>
              <CardDescription>Performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Completion Rate</span>
                  </div>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Avg. Completion</span>
                  </div>
                  <span className="font-semibold">38 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Client Satisfaction</span>
                  </div>
                  <span className="font-semibold">4.8/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Documents Processed</span>
                  </div>
                  <span className="font-semibold">127</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
