"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Calendar, 
  FileText, 
  MessageSquareMore, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Eye
} from "lucide-react"

export default function UniversityDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">University Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +4 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Escalations</CardTitle>
            <MessageSquareMore className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              -2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Advisors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +12 this semester
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Escalations */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Escalations</CardTitle>
            <CardDescription>
              Latest escalations requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "ESC-001",
                  title: "Academic Issue - Grade Dispute",
                  department: "Computer Science",
                  priority: "High",
                  student: "Ahmed Khan",
                  time: "2 hours ago"
                },
                {
                  id: "ESC-002", 
                  title: "Facility Issue - Lab Equipment",
                  department: "Engineering",
                  priority: "Medium",
                  student: "Sara Ali",
                  time: "4 hours ago"
                },
                {
                  id: "ESC-003",
                  title: "Administrative Issue - Fee Payment",
                  department: "Business",
                  priority: "Low",
                  student: "Hassan Ahmed",
                  time: "1 day ago"
                }
              ].map((escalation) => (
                <div key={escalation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{escalation.title}</p>
                      <Badge variant={
                        escalation.priority === "High" ? "destructive" :
                        escalation.priority === "Medium" ? "default" : "secondary"
                      }>
                        {escalation.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {escalation.department} • {escalation.student} • {escalation.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Create University Event
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Post Announcement
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add New Advisor
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquareMore className="mr-2 h-4 w-4" />
              Send Notification
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
          <CardDescription>
            Key metrics across all departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Computer Science", students: 3245, advisors: 45, escalations: 3 },
              { name: "Engineering", students: 2890, advisors: 38, escalations: 2 },
              { name: "Business Administration", students: 2156, advisors: 32, escalations: 1 },
              { name: "Medicine", students: 1876, advisors: 28, escalations: 2 }
            ].map((dept) => (
              <div key={dept.name} className="p-4 border rounded-lg space-y-2">
                <h4 className="font-medium">{dept.name}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span>{dept.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Advisors:</span>
                    <span>{dept.advisors}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Escalations:</span>
                    <div className="flex items-center space-x-1">
                      <span>{dept.escalations}</span>
                      {dept.escalations > 2 && (
                        <AlertTriangle className="h-3 w-3 text-orange-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
