"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Building2,
  Users,
  UserCheck,
  MessageSquare,
  Calendar,
  MoreHorizontal,
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

// Mock department data
const mockDepartments = [
  {
    id: 1,
    name: "Computer Science",
    code: "CS",
    description: "Department of Computer Science and Information Technology",
    head: "Dr. Sarah Johnson",
    headAvatar: "/advisor-4.png",
    totalStudents: 450,
    totalAdvisors: 8,
    activeEscalations: 12,
    totalEvents: 15,
    established: "1985",
    building: "Tech Building A",
    phone: "+1 (555) 123-4567",
    email: "cs@university.edu",
    advisors: [
      { name: "Dr. Sarah Johnson", avatar: "/advisor-4.png", specialization: "Software Engineering" },
      { name: "Dr. Michael Chen", avatar: "/advisor-1.png", specialization: "AI & Machine Learning" },
      { name: "Prof. Lisa Wang", avatar: "/advisor-2.png", specialization: "Cybersecurity" },
    ],
  },
  {
    id: 2,
    name: "Engineering",
    code: "ENG",
    description: "Department of Mechanical and Electrical Engineering",
    head: "Dr. Michael Smith",
    headAvatar: "/advisor-1.png",
    totalStudents: 380,
    totalAdvisors: 6,
    activeEscalations: 8,
    totalEvents: 12,
    established: "1978",
    building: "Engineering Complex",
    phone: "+1 (555) 234-5678",
    email: "engineering@university.edu",
    advisors: [
      { name: "Dr. Michael Smith", avatar: "/advisor-1.png", specialization: "Mechanical Engineering" },
      { name: "Dr. Robert Wilson", avatar: "/advisor-3.png", specialization: "Electrical Engineering" },
    ],
  },
  {
    id: 3,
    name: "Business Administration",
    code: "BUS",
    description: "School of Business Administration and Management",
    head: "Dr. Robert Chen",
    headAvatar: "/advisor-5.png",
    totalStudents: 320,
    totalAdvisors: 5,
    activeEscalations: 6,
    totalEvents: 18,
    established: "1990",
    building: "Business Center",
    phone: "+1 (555) 345-6789",
    email: "business@university.edu",
    advisors: [
      { name: "Dr. Robert Chen", avatar: "/advisor-5.png", specialization: "Finance" },
      { name: "Prof. Maria Garcia", avatar: "/advisor-6.png", specialization: "Marketing" },
    ],
  },
  {
    id: 4,
    name: "Mathematics",
    code: "MATH",
    description: "Department of Mathematics and Statistics",
    head: "Prof. David Wilson",
    headAvatar: "/advisor-3.png",
    totalStudents: 180,
    totalAdvisors: 4,
    activeEscalations: 3,
    totalEvents: 8,
    established: "1975",
    building: "Science Hall",
    phone: "+1 (555) 456-7890",
    email: "math@university.edu",
    advisors: [
      { name: "Prof. David Wilson", avatar: "/advisor-3.png", specialization: "Applied Mathematics" },
      { name: "Dr. Jennifer Lee", avatar: "/advisor-2.png", specialization: "Statistics" },
    ],
  },
  {
    id: 5,
    name: "Psychology",
    code: "PSY",
    description: "Department of Psychology and Behavioral Sciences",
    head: "Dr. Emily Rodriguez",
    headAvatar: "/advisor-6.png",
    totalStudents: 250,
    totalAdvisors: 3,
    activeEscalations: 5,
    totalEvents: 10,
    established: "1988",
    building: "Social Sciences Building",
    phone: "+1 (555) 567-8901",
    email: "psychology@university.edu",
    advisors: [
      { name: "Dr. Emily Rodriguez", avatar: "/advisor-6.png", specialization: "Clinical Psychology" },
      { name: "Dr. James Thompson", avatar: "/advisor-1.png", specialization: "Cognitive Psychology" },
    ],
  },
  {
    id: 6,
    name: "Biology",
    code: "BIO",
    description: "Department of Biology and Life Sciences",
    head: "Dr. Lisa Anderson",
    headAvatar: "/advisor-2.png",
    totalStudents: 290,
    totalAdvisors: 5,
    activeEscalations: 7,
    totalEvents: 14,
    established: "1982",
    building: "Life Sciences Center",
    phone: "+1 (555) 678-9012",
    email: "biology@university.edu",
    advisors: [
      { name: "Dr. Lisa Anderson", avatar: "/advisor-2.png", specialization: "Molecular Biology" },
      { name: "Dr. Kevin Brown", avatar: "/advisor-3.png", specialization: "Ecology" },
    ],
  },
]

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState(mockDepartments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    code: "",
    description: "",
    head: "",
    building: "",
    phone: "",
    email: "",
  })
  const { toast } = useToast()

  // Filter departments based on search
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDepartment = (department) => {
    setSelectedDepartment(department)
    setIsViewDialogOpen(true)
  }

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department)
    setEditForm({
      name: department.name,
      code: department.code,
      description: department.description,
      head: department.head,
      building: department.building,
      phone: department.phone,
      email: department.email,
    })
    setIsEditDialogOpen(true)
  }

  const handleAddDepartment = () => {
    setEditForm({
      name: "",
      code: "",
      description: "",
      head: "",
      building: "",
      phone: "",
      email: "",
    })
    setIsAddDialogOpen(true)
  }

  const handleSaveDepartment = () => {
    if (selectedDepartment) {
      // Edit existing department
      setDepartments(
        departments.map((dept) =>
          dept.id === selectedDepartment.id
            ? {
                ...dept,
                name: editForm.name,
                code: editForm.code,
                description: editForm.description,
                head: editForm.head,
                building: editForm.building,
                phone: editForm.phone,
                email: editForm.email,
              }
            : dept,
        ),
      )
      setIsEditDialogOpen(false)
      toast({
        title: "Department Updated",
        description: "Department information has been successfully updated.",
      })
    } else {
      // Add new department
      const newDepartment = {
        id: Math.max(...departments.map((d) => d.id)) + 1,
        ...editForm,
        headAvatar: "/placeholder.svg",
        totalStudents: 0,
        totalAdvisors: 0,
        activeEscalations: 0,
        totalEvents: 0,
        established: new Date().getFullYear().toString(),
        advisors: [],
      }
      setDepartments([...departments, newDepartment])
      setIsAddDialogOpen(false)
      toast({
        title: "Department Added",
        description: "New department has been successfully created.",
      })
    }
  }

  const handleDeleteDepartment = (departmentId) => {
    setDepartments(departments.filter((dept) => dept.id !== departmentId))
    toast({
      title: "Department Deleted",
      description: "Department has been successfully removed from the system.",
      variant: "destructive",
    })
  }

  const totalStats = {
    totalStudents: departments.reduce((sum, dept) => sum + dept.totalStudents, 0),
    totalAdvisors: departments.reduce((sum, dept) => sum + dept.totalAdvisors, 0),
    totalEscalations: departments.reduce((sum, dept) => sum + dept.activeEscalations, 0),
    totalEvents: departments.reduce((sum, dept) => sum + dept.totalEvents, 0),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Department Management</h1>
          <p className="text-gray-600 mt-1">Manage university departments, assignments, and activity statistics.</p>
        </div>
        <Button onClick={handleAddDepartment} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Advisors</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalAdvisors}</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Escalations</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalEscalations}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Department Grid */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Department Directory</CardTitle>
          <CardDescription>Manage all university departments and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search departments by name, code, or head..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((department) => (
              <Card key={department.id} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{department.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {department.code}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDepartment(department)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditDepartment(department)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Department
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Department
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the department and reassign
                                all students and advisors.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteDepartment(department.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={department.headAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {department.head
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{department.head}</p>
                      <p className="text-xs text-gray-500">Department Head</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{department.totalStudents}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{department.totalAdvisors}</div>
                      <div className="text-xs text-gray-600">Advisors</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {department.activeEscalations} escalations
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {department.totalEvents} events
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => handleViewDepartment(department)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Department Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Department Details</DialogTitle>
            <DialogDescription>Complete information and statistics for the department</DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{selectedDepartment.name}</h3>
                  <p className="text-gray-600">{selectedDepartment.description}</p>
                  <Badge variant="outline" className="mt-2">
                    {selectedDepartment.code}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedDepartment.totalStudents}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-green-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedDepartment.totalAdvisors}</div>
                    <div className="text-sm text-gray-600">Advisors</div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-orange-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{selectedDepartment.activeEscalations}</div>
                    <div className="text-sm text-gray-600">Active Cases</div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedDepartment.totalEvents}</div>
                    <div className="text-sm text-gray-600">Events</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Department Information</Label>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Established:</span>
                      <p className="text-sm">{selectedDepartment.established}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Building:</span>
                      <p className="text-sm">{selectedDepartment.building}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <p className="text-sm">{selectedDepartment.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="text-sm">{selectedDepartment.email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Department Head</Label>
                  <div className="mt-2 flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedDepartment.headAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedDepartment.head
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedDepartment.head}</p>
                      <p className="text-sm text-gray-500">Department Head</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Assigned Advisors</Label>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedDepartment.advisors.map((advisor, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={advisor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {advisor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{advisor.name}</p>
                        <p className="text-xs text-gray-500">{advisor.specialization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Department Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>Update department information and settings</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Department Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="code">Department Code</Label>
                <Input
                  id="code"
                  value={editForm.code}
                  onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="head">Department Head</Label>
                <Input
                  id="head"
                  value={editForm.head}
                  onChange={(e) => setEditForm({ ...editForm, head: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="building">Building</Label>
                <Input
                  id="building"
                  value={editForm.building}
                  onChange={(e) => setEditForm({ ...editForm, building: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDepartment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Department Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Department</DialogTitle>
            <DialogDescription>Create a new department with complete information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-name">Department Name</Label>
                <Input
                  id="new-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div>
                <Label htmlFor="new-code">Department Code</Label>
                <Input
                  id="new-code"
                  value={editForm.code}
                  onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                  placeholder="e.g., CS"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Brief description of the department"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-head">Department Head</Label>
                <Input
                  id="new-head"
                  value={editForm.head}
                  onChange={(e) => setEditForm({ ...editForm, head: e.target.value })}
                  placeholder="e.g., Dr. John Smith"
                />
              </div>
              <div>
                <Label htmlFor="new-building">Building</Label>
                <Input
                  id="new-building"
                  value={editForm.building}
                  onChange={(e) => setEditForm({ ...editForm, building: e.target.value })}
                  placeholder="e.g., Science Hall"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-phone">Phone</Label>
                <Input
                  id="new-phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="new-email">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="department@university.edu"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDepartment}>Create Department</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
