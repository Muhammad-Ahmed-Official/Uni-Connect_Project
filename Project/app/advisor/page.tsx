"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  MessageSquareMore, 
  FileText, 
  Calendar, 
  CheckCircle, 
  Clock,
  Plus,
  Eye,
  Reply
} from "lucide-react"

export default function AdvisorDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Advisor Dashboard</h2>
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
            <CardTitle className="text-sm font-medium">My Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              Computer Science Dept.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Escalations</CardTitle>
            <MessageSquareMore className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              2 high priority
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Pending</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              This week
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
              Student escalations requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "ESC-001",
                  title: "Grade Appeal - Data Structures Course",
                  student: "Ahmed Hassan",
                  studentId: "CS-2021-001",
                  priority: "High",
                  time: "2 hours ago",
                  status: "New"
                },
                {
                  id: "ESC-002", 
                  title: "Lab Access Issue - Software Engineering",
                  student: "Sara Khan",
                  studentId: "CS-2020-045",
                  priority: "Medium",
                  time: "5 hours ago",
                  status: "In Progress"
                },
                {
                  id: "ESC-003",
                  title: "Project Extension Request",
                  student: "Ali Ahmed",
                  studentId: "CS-2021-078",
                  priority: "Low",
                  time: "1 day ago",
                  status: "New"
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
                      <Badge variant="outline">
                        {escalation.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {escalation.student} ({escalation.studentId}) • {escalation.time}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Reply className="h-4 w-4" />
                    </Button>
                  </div>
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
              Common advisor tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <MessageSquareMore className="mr-2 h-4 w-4" />
              View All Escalations
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Review Documents
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Create Department Event
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Message Students
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Resolved escalation",
                  details: "Grade dispute for Ahmed Hassan",
                  time: "2 hours ago",
                  icon: CheckCircle,
                  iconColor: "text-green-500"
                },
                {
                  action: "Approved document",
                  details: "Transcript request for Sara Khan",
                  time: "4 hours ago",
                  icon: FileText,
                  iconColor: "text-blue-500"
                },
                {
                  action: "Created event",
                  details: "CS Department Workshop",
                  time: "1 day ago",
                  icon: Calendar,
                  iconColor: "text-purple-500"
                },
                {
                  action: "Responded to escalation",
                  details: "Lab access issue for Ali Ahmed",
                  time: "2 days ago",
                  icon: MessageSquareMore,
                  iconColor: "text-orange-500"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <activity.icon className={`h-5 w-5 mt-0.5 ${activity.iconColor}`} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
            <CardDescription>
              Department student statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Active Students</p>
                  <p className="text-xs text-muted-foreground">Currently enrolled</p>
                </div>
                <div className="text-2xl font-bold">127</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Escalations This Month</p>
                  <p className="text-xs text-muted-foreground">Total resolved: 15</p>
                </div>
                <div className="text-2xl font-bold">18</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Documents Reviewed</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <div className="text-2xl font-bold">8</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Events Created</p>
                  <p className="text-xs text-muted-foreground">This semester</p>
                </div>
                <div className="text-2xl font-bold">4</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
