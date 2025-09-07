"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar,
  UserCheck,
  TrendingUp,
  Eye,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const mockEscalations = [
  {
    id: 1,
    title: "Course Registration Issue",
    description: "Unable to register for required courses due to system error",
    student: "John Smith",
    studentId: "ST001",
    category: "Academic",
    priority: "High",
    status: "pending",
    assignedAdvisor: null,
    submittedDate: "2024-03-10T10:30:00",
    responseTime: null,
    attachments: ["screenshot.png", "error_log.txt"],
    department: "Computer Science",
  },
  {
    id: 2,
    title: "Financial Aid Delay",
    description: "Financial aid disbursement has been delayed for over 2 weeks",
    student: "Sarah Johnson",
    studentId: "ST002",
    category: "Financial",
    priority: "High",
    status: "in-progress",
    assignedAdvisor: "Dr. Wilson",
    submittedDate: "2024-03-08T14:15:00",
    responseTime: "2 hours",
    attachments: ["aid_documents.pdf"],
    department: "Financial Aid",
  },
  {
    id: 3,
    title: "Dormitory Maintenance Request",
    description: "Heating system not working in dormitory room 204B",
    student: "Mike Davis",
    studentId: "ST003",
    category: "Housing",
    priority: "Medium",
    status: "resolved",
    assignedAdvisor: "Ms. Brown",
    submittedDate: "2024-03-05T09:20:00",
    responseTime: "1 hour",
    attachments: [],
    department: "Housing Services",
  },
  {
    id: 4,
    title: "Grade Appeal Request",
    description: "Requesting review of final grade for MATH 301",
    student: "Emily Chen",
    studentId: "ST004",
    category: "Academic",
    priority: "Medium",
    status: "in-progress",
    assignedAdvisor: "Prof. Anderson",
    submittedDate: "2024-03-07T16:45:00",
    responseTime: "4 hours",
    attachments: ["assignment_copy.pdf", "grade_report.pdf"],
    department: "Mathematics",
  },
]

const mockAdvisors = [
  { id: 1, name: "Dr. Wilson", department: "Financial Aid", activeEscalations: 3 },
  { id: 2, name: "Ms. Brown", department: "Housing Services", activeEscalations: 1 },
  { id: 3, name: "Prof. Anderson", department: "Mathematics", activeEscalations: 2 },
  { id: 4, name: "Dr. Smith", department: "Computer Science", activeEscalations: 0 },
]

export default function AdminEscalationsPage() {
  const [escalations, setEscalations] = useState(mockEscalations)
  const [selectedEscalation, setSelectedEscalation] = useState(null)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredEscalations = escalations.filter((escalation) => {
    const matchesSearch =
      escalation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escalation.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escalation.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || escalation.status === statusFilter
    const matchesPriority = priorityFilter === "all" || escalation.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || escalation.category === categoryFilter
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const handleAssignEscalation = (escalationId, advisorName) => {
    setEscalations((escalations) =>
      escalations.map((escalation) =>
        escalation.id === escalationId
          ? { ...escalation, assignedAdvisor: advisorName, status: "in-progress" }
          : escalation,
      ),
    )
    setIsAssignDialogOpen(false)
    toast({
      title: "Escalation Assigned",
      description: `Escalation has been assigned to ${advisorName}.`,
    })
  }

  const handleStatusChange = (escalationId, newStatus) => {
    setEscalations((escalations) =>
      escalations.map((escalation) =>
        escalation.id === escalationId ? { ...escalation, status: newStatus } : escalation,
      ),
    )
    toast({
      title: "Status Updated",
      description: `Escalation status has been updated to ${newStatus}.`,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "Medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
      case "Low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getCategoryBadge = (category) => {
    const colors = {
      Academic: "bg-blue-100 text-blue-800",
      Financial: "bg-green-100 text-green-800",
      Housing: "bg-purple-100 text-purple-800",
      Technical: "bg-orange-100 text-orange-800",
      Other: "bg-gray-100 text-gray-800",
    }
    return <Badge className={colors[category] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const totalEscalations = escalations.length
  const pendingEscalations = escalations.filter((e) => e.status === "pending").length
  const inProgressEscalations = escalations.filter((e) => e.status === "in-progress").length
  const resolvedEscalations = escalations.filter((e) => e.status === "resolved").length
  const avgResponseTime = "2.5 hours"

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Escalation Monitoring</h1>
          <p className="text-gray-600">Monitor and manage student escalations and advisor assignments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Escalations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEscalations}</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingEscalations}</div>
            <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressEscalations}</div>
            <p className="text-xs text-muted-foreground">Being handled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedEscalations}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Escalation Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search escalations, students, or IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Housing">Housing</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Escalations List */}
      <div className="grid gap-4">
        {filteredEscalations.map((escalation) => (
          <Card key={escalation.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{escalation.title}</h3>
                    {getStatusBadge(escalation.status)}
                    {getPriorityBadge(escalation.priority)}
                    {getCategoryBadge(escalation.category)}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{escalation.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {escalation.student} ({escalation.studentId})
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(escalation.submittedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <UserCheck className="w-4 h-4 mr-2" />
                      {escalation.assignedAdvisor || "Unassigned"}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {escalation.responseTime || "No response yet"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Department: {escalation.department}</span>
                    {escalation.attachments.length > 0 && (
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {escalation.attachments.length} attachment(s)
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedEscalation(escalation)
                      setIsViewDialogOpen(true)
                    }}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                  {escalation.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setSelectedEscalation(escalation)
                        setIsAssignDialogOpen(true)
                      }}
                    >
                      <UserCheck className="w-3 h-3 mr-1" />
                      Assign
                    </Button>
                  )}
                  {escalation.status === "in-progress" && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(escalation.id, "resolved")}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Resolve
                    </Button>
                  )}
                  <Select value={escalation.status} onValueChange={(value) => handleStatusChange(escalation.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEscalations.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No escalations found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Assign Escalation Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Escalation</DialogTitle>
            <DialogDescription>Select an advisor to handle this escalation</DialogDescription>
          </DialogHeader>
          {selectedEscalation && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">{selectedEscalation.title}</h4>
                <p className="text-sm text-gray-600 mt-1">Student: {selectedEscalation.student}</p>
                <p className="text-sm text-gray-600">Category: {selectedEscalation.category}</p>
              </div>
              <div className="space-y-2">
                <Label>Select Advisor</Label>
                <div className="grid gap-2">
                  {mockAdvisors.map((advisor) => (
                    <Button
                      key={advisor.id}
                      variant="outline"
                      className="justify-between h-auto p-4 bg-transparent"
                      onClick={() => handleAssignEscalation(selectedEscalation.id, advisor.name)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{advisor.name}</div>
                        <div className="text-sm text-gray-500">{advisor.department}</div>
                      </div>
                      <Badge variant="secondary">{advisor.activeEscalations} active</Badge>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Escalation Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Escalation Details</DialogTitle>
          </DialogHeader>
          {selectedEscalation && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{selectedEscalation.title}</h3>
                {getStatusBadge(selectedEscalation.status)}
                {getPriorityBadge(selectedEscalation.priority)}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-gray-500">Student</Label>
                  <p>
                    {selectedEscalation.student} ({selectedEscalation.studentId})
                  </p>
                </div>
                <div>
                  <Label className="text-gray-500">Department</Label>
                  <p>{selectedEscalation.department}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Submitted</Label>
                  <p>{new Date(selectedEscalation.submittedDate).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Assigned Advisor</Label>
                  <p>{selectedEscalation.assignedAdvisor || "Unassigned"}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-500">Description</Label>
                <p className="mt-1">{selectedEscalation.description}</p>
              </div>
              {selectedEscalation.attachments.length > 0 && (
                <div>
                  <Label className="text-gray-500">Attachments</Label>
                  <div className="mt-1 space-y-1">
                    {selectedEscalation.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center text-sm text-blue-600">
                        <FileText className="w-4 h-4 mr-2" />
                        {attachment}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
