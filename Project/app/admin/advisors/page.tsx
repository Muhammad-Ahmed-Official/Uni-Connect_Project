"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  Eye,
  UserX,
  Trash2,
  UserCheck,
  Star,
  MessageSquare,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Building2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

// Mock advisor data
const mockAdvisors = [
  {
    id: 1,
    name: "Dr. Michael Smith",
    email: "m.smith@university.edu",
    department: "Engineering",
    specialization: "Mechanical Engineering",
    status: "active",
    rating: 4.8,
    totalEscalations: 45,
    resolvedEscalations: 42,
    avgResponseTime: "2.3 hours",
    joinDate: "2020-08-20",
    avatar: "/advisor-1.png",
    officeHours: "Mon-Wed 2-4 PM",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Dr. Lisa Anderson",
    email: "l.anderson@university.edu",
    department: "Biology",
    specialization: "Molecular Biology",
    status: "active",
    rating: 4.9,
    totalEscalations: 38,
    resolvedEscalations: 37,
    avgResponseTime: "1.8 hours",
    joinDate: "2021-03-15",
    avatar: "/advisor-2.png",
    officeHours: "Tue-Thu 10-12 PM",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Prof. David Wilson",
    email: "d.wilson@university.edu",
    department: "Mathematics",
    specialization: "Applied Mathematics",
    status: "active",
    rating: 4.7,
    totalEscalations: 52,
    resolvedEscalations: 48,
    avgResponseTime: "3.1 hours",
    joinDate: "2019-01-10",
    avatar: "/advisor-3.png",
    officeHours: "Mon-Fri 1-3 PM",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 4,
    name: "Dr. Sarah Johnson",
    email: "s.johnson@university.edu",
    department: "Computer Science",
    specialization: "Software Engineering",
    status: "active",
    rating: 4.6,
    totalEscalations: 67,
    resolvedEscalations: 63,
    avgResponseTime: "2.7 hours",
    joinDate: "2022-09-01",
    avatar: "/advisor-4.png",
    officeHours: "Wed-Fri 3-5 PM",
    phone: "+1 (555) 456-7890",
  },
  {
    id: 5,
    name: "Dr. Robert Chen",
    email: "r.chen@university.edu",
    department: "Business Administration",
    specialization: "Finance",
    status: "suspended",
    rating: 4.2,
    totalEscalations: 23,
    resolvedEscalations: 20,
    avgResponseTime: "4.2 hours",
    joinDate: "2023-02-14",
    avatar: "/advisor-5.png",
    officeHours: "Mon-Wed 11-1 PM",
    phone: "+1 (555) 567-8901",
  },
  {
    id: 6,
    name: "Dr. Emily Rodriguez",
    email: "e.rodriguez@university.edu",
    department: "Psychology",
    specialization: "Clinical Psychology",
    status: "active",
    rating: 4.9,
    totalEscalations: 41,
    resolvedEscalations: 40,
    avgResponseTime: "1.5 hours",
    joinDate: "2021-08-30",
    avatar: "/advisor-6.png",
    officeHours: "Tue-Thu 9-11 AM",
    phone: "+1 (555) 678-9012",
  },
]

const departments = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Mathematics",
  "Psychology",
  "Biology",
  "Physics",
  "Chemistry",
  "English Literature",
  "History",
]

const statusColors = {
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-700",
  inactive: "bg-gray-100 text-gray-700",
}

export default function AdvisorManagement() {
  const [advisors, setAdvisors] = useState(mockAdvisors)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAdvisor, setSelectedAdvisor] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const { toast } = useToast()

  const advisorsPerPage = 10

  // Filter advisors based on search and filters
  const filteredAdvisors = advisors.filter((advisor) => {
    const matchesSearch =
      advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advisor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || advisor.department === departmentFilter
    const matchesStatus = statusFilter === "all" || advisor.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredAdvisors.length / advisorsPerPage)
  const startIndex = (currentPage - 1) * advisorsPerPage
  const paginatedAdvisors = filteredAdvisors.slice(startIndex, startIndex + advisorsPerPage)

  const handleSuspendAdvisor = (advisorId) => {
    setAdvisors(
      advisors.map((advisor) =>
        advisor.id === advisorId
          ? { ...advisor, status: advisor.status === "suspended" ? "active" : "suspended" }
          : advisor,
      ),
    )
    toast({
      title: "Advisor Status Updated",
      description: "Advisor status has been successfully updated.",
    })
  }

  const handleRemoveAdvisor = (advisorId) => {
    setAdvisors(advisors.filter((advisor) => advisor.id !== advisorId))
    toast({
      title: "Advisor Removed",
      description: "Advisor has been successfully removed from the system.",
      variant: "destructive",
    })
  }

  const handleViewAdvisor = (advisor) => {
    setSelectedAdvisor(advisor)
    setIsViewDialogOpen(true)
  }

  const handleAssignDepartment = (advisor) => {
    setSelectedAdvisor(advisor)
    setIsAssignDialogOpen(true)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const getPerformanceColor = (resolved, total) => {
    const percentage = (resolved / total) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advisor Management</h1>
          <p className="text-gray-600 mt-1">Manage academic advisors, assignments, and performance metrics.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Advisor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Advisors</p>
                <p className="text-2xl font-bold text-gray-900">{advisors.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Advisors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {advisors.filter((a) => a.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(advisors.reduce((sum, a) => sum + a.rating, 0) / advisors.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Escalations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {advisors.reduce((sum, a) => sum + a.totalEscalations, 0)}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Advisor Directory</CardTitle>
          <CardDescription>Manage advisor assignments and monitor performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, email, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advisors Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Escalations</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAdvisors.map((advisor) => (
                  <TableRow key={advisor.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={advisor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {advisor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{advisor.name}</div>
                          <div className="text-sm text-gray-500">{advisor.specialization}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Building2 className="h-3 w-3 mr-1" />
                        {advisor.department}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <div className="flex">{renderStars(advisor.rating)}</div>
                        <span className="text-sm text-gray-600 ml-2">{advisor.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div
                          className={`font-medium ${getPerformanceColor(
                            advisor.resolvedEscalations,
                            advisor.totalEscalations,
                          )}`}
                        >
                          {advisor.resolvedEscalations}/{advisor.totalEscalations}
                        </div>
                        <div className="text-gray-500">
                          {Math.round((advisor.resolvedEscalations / advisor.totalEscalations) * 100)}% resolved
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {advisor.avgResponseTime}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[advisor.status]} border-0`}>
                        {advisor.status === "active" ? "●" : advisor.status === "suspended" ? "⏸" : "○"}
                        <span className="ml-1 capitalize">{advisor.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewAdvisor(advisor)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAssignDepartment(advisor)}>
                            <Building2 className="mr-2 h-4 w-4" />
                            Assign Department
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSuspendAdvisor(advisor.id)}>
                            <UserX className="mr-2 h-4 w-4" />
                            {advisor.status === "suspended" ? "Activate" : "Suspend"} Advisor
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Advisor
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently remove the advisor and reassign
                                  their escalations to other advisors.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemoveAdvisor(advisor.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + advisorsPerPage, filteredAdvisors.length)} of{" "}
              {filteredAdvisors.length} advisors
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Advisor Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Advisor Profile</DialogTitle>
            <DialogDescription>Complete information and performance metrics</DialogDescription>
          </DialogHeader>
          {selectedAdvisor && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedAdvisor.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xl">
                    {selectedAdvisor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-semibold">{selectedAdvisor.name}</h3>
                  <p className="text-gray-600">{selectedAdvisor.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className="bg-blue-100 text-blue-700 border-0">
                      <Building2 className="h-3 w-3 mr-1" />
                      {selectedAdvisor.department}
                    </Badge>
                    <Badge className={`${statusColors[selectedAdvisor.status]} border-0`}>
                      <span className="capitalize">{selectedAdvisor.status}</span>
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedAdvisor.rating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                    <div className="flex justify-center mt-1">{renderStars(selectedAdvisor.rating)}</div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-green-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedAdvisor.totalEscalations}</div>
                    <div className="text-sm text-gray-600">Total Cases</div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((selectedAdvisor.resolvedEscalations / selectedAdvisor.totalEscalations) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Resolution Rate</div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-orange-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{selectedAdvisor.avgResponseTime}</div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Contact Information</Label>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="text-sm">{selectedAdvisor.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <p className="text-sm">{selectedAdvisor.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Office Hours:</span>
                      <p className="text-sm">{selectedAdvisor.officeHours}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Academic Information</Label>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Specialization:</span>
                      <p className="text-sm">{selectedAdvisor.specialization}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Join Date:</span>
                      <p className="text-sm">{selectedAdvisor.joinDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Advisor ID:</span>
                      <p className="text-sm">#{selectedAdvisor.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Department Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Department</DialogTitle>
            <DialogDescription>Change the department assignment for this advisor</DialogDescription>
          </DialogHeader>
          {selectedAdvisor && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="advisor-name">Advisor</Label>
                <Input id="advisor-name" value={selectedAdvisor.name} disabled />
              </div>
              <div>
                <Label htmlFor="current-department">Current Department</Label>
                <Input id="current-department" value={selectedAdvisor.department} disabled />
              </div>
              <div>
                <Label htmlFor="new-department">New Department</Label>
                <Select defaultValue={selectedAdvisor.department}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsAssignDialogOpen(false)
                toast({
                  title: "Department Assigned",
                  description: "Advisor has been successfully assigned to the new department.",
                })
              }}
            >
              Assign Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
