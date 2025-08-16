"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  UserCheck,
  Calendar,
  MessageSquareMore,
  FileText,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const stats = [
  {
    title: "Total Students",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Advisors",
    value: "156",
    change: "+3%",
    trend: "up",
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Total Events",
    value: "89",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Pending Escalations",
    value: "23",
    change: "-15%",
    trend: "down",
    icon: MessageSquareMore,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Documents Uploaded",
    value: "1,234",
    change: "+25%",
    trend: "up",
    icon: FileText,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "user_registration",
    message: "New student registered: Sarah Johnson (Computer Science)",
    time: "2 minutes ago",
    icon: Users,
    color: "text-blue-600",
  },
  {
    id: 2,
    type: "escalation",
    message: "New escalation submitted to Dr. Smith (Academic Issues)",
    time: "15 minutes ago",
    icon: MessageSquareMore,
    color: "text-orange-600",
  },
  {
    id: 3,
    type: "document",
    message: "Past paper uploaded: CS101 Final Exam 2024",
    time: "1 hour ago",
    icon: FileText,
    color: "text-teal-600",
  },
  {
    id: 4,
    type: "event",
    message: "Event created: Career Fair 2024 (Engineering Department)",
    time: "2 hours ago",
    icon: Calendar,
    color: "text-purple-600",
  },
  {
    id: 5,
    type: "escalation_resolved",
    message: "Escalation resolved: Grade Appeal - John Doe",
    time: "3 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

const quickActions = [
  {
    title: "Add New User",
    description: "Create a new student or advisor account",
    href: "/admin/users/new",
    icon: Users,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Create Event",
    description: "Schedule a new university event",
    href: "/admin/events/new",
    icon: Calendar,
    color: "bg-purple-600 hover:bg-purple-700",
  },
  {
    title: "Upload Document",
    description: "Add new past papers or policy documents",
    href: "/admin/documents/upload",
    icon: FileText,
    color: "bg-teal-600 hover:bg-teal-700",
  },
  {
    title: "Review Escalations",
    description: "Monitor and assign pending escalations",
    href: "/admin/escalations",
    icon: MessageSquareMore,
    color: "bg-orange-600 hover:bg-orange-700",
  },
]

export default function AdminDashboard() {
  const session = useSession();
  const role = session?.data?.user?.role;


  if (!session) redirect("/login");
  if (role === "user") redirect("/dashboard");

  return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your university.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-200">
              <Activity className="w-3 h-3 mr-1" />
              System Healthy
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest actions and updates across the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-lg bg-gray-100`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 border-gray-200 hover:border-gray-300 bg-transparent"
                    asChild
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg text-white ${action.color}`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{action.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{action.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Services</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">File Storage</span>
                  <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Maintenance
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
}
