"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  BookOpen,
  Settings,
  Search,
  Bell,
  Menu,
  GraduationCap,
  User,
  LogOut,
  Send,
  Paperclip,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Star,
  Mail,
  Phone,
  MapPin,
  X,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Users, label: "Departments", href: "/departments" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: MessageSquare, label: "Advisors", href: "/advisors", active: true },
  { icon: FileText, label: "Past Papers", href: "/past-papers" },
  { icon: BookOpen, label: "Docs", href: "/docs" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const advisors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Academic Advisor",
    department: "Computer Science",
    specialties: ["Course Planning", "Career Guidance", "Research Opportunities"],
    email: "s.johnson@university.edu",
    phone: "(555) 123-4567",
    office: "CS Building, Room 301",
    rating: 4.8,
    responseTime: "Within 24 hours",
    availability: "Mon-Fri, 9AM-5PM",
    image: "/student-avatar.png",
    bio: "Dr. Johnson has been advising computer science students for over 10 years. She specializes in helping students navigate their academic journey and explore career opportunities in tech.",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    title: "Department Head & Advisor",
    department: "Engineering",
    specialties: ["Academic Planning", "Graduate School Prep", "Industry Connections"],
    email: "m.chen@university.edu",
    phone: "(555) 234-5678",
    office: "Engineering Building, Room 205",
    rating: 4.9,
    responseTime: "Within 48 hours",
    availability: "Tue-Thu, 10AM-4PM",
    image: "/student-avatar.png",
    bio: "Professor Chen brings 15 years of industry experience and has helped hundreds of engineering students achieve their academic and career goals.",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Student Success Advisor",
    department: "Business Administration",
    specialties: ["Academic Support", "Internship Guidance", "Study Abroad"],
    email: "e.rodriguez@university.edu",
    phone: "(555) 345-6789",
    office: "Business School, Room 150",
    rating: 4.7,
    responseTime: "Within 24 hours",
    availability: "Mon-Wed-Fri, 8AM-6PM",
    image: "/student-avatar.png",
    bio: "Dr. Rodriguez is passionate about student success and has extensive experience in international business and study abroad programs.",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Pre-Med Advisor",
    department: "Medicine",
    specialties: ["Medical School Prep", "MCAT Guidance", "Research Opportunities"],
    email: "j.wilson@university.edu",
    phone: "(555) 456-7890",
    office: "Medical Center, Room 402",
    rating: 4.9,
    responseTime: "Within 12 hours",
    availability: "Mon-Fri, 7AM-3PM",
    image: "/student-avatar.png",
    bio: "Dr. Wilson has guided over 200 students into medical school with his comprehensive approach to pre-med advising and MCAT preparation.",
  },
  {
    id: 5,
    name: "Prof. Lisa Thompson",
    title: "Academic Advisor",
    department: "Arts & Humanities",
    specialties: ["Creative Programs", "Graduate School", "Fellowship Applications"],
    email: "l.thompson@university.edu",
    phone: "(555) 567-8901",
    office: "Arts Building, Room 220",
    rating: 4.6,
    responseTime: "Within 24 hours",
    availability: "Tue-Thu, 11AM-5PM",
    image: "/student-avatar.png",
    bio: "Professor Thompson specializes in helping arts and humanities students explore creative career paths and secure competitive fellowships.",
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    title: "Research Advisor",
    department: "Natural Sciences",
    specialties: ["Research Projects", "PhD Programs", "Lab Placements"],
    email: "r.kim@university.edu",
    phone: "(555) 678-9012",
    office: "Science Building, Room 315",
    rating: 4.8,
    responseTime: "Within 36 hours",
    availability: "Mon-Wed-Fri, 9AM-4PM",
    image: "/student-avatar.png",
    bio: "Dr. Kim connects students with cutting-edge research opportunities and has helped numerous students secure positions in top PhD programs.",
  },
]

const escalations = [
  {
    id: 1,
    title: "Course Registration Issue",
    advisor: "Dr. Sarah Johnson",
    department: "Computer Science",
    status: "In Progress",
    priority: "High",
    submittedDate: "2024-01-10",
    lastUpdate: "2024-01-12",
    description: "Unable to register for required CS courses due to prerequisite conflicts.",
    attachments: ["transcript.pdf", "course_plan.docx"],
  },
  {
    id: 2,
    title: "Graduate School Application Guidance",
    advisor: "Prof. Michael Chen",
    department: "Engineering",
    status: "Resolved",
    priority: "Medium",
    submittedDate: "2024-01-05",
    lastUpdate: "2024-01-08",
    description: "Need help with graduate school applications and recommendation letters.",
    attachments: ["resume.pdf"],
  },
  {
    id: 3,
    title: "Internship Credit Transfer",
    advisor: "Dr. Emily Rodriguez",
    department: "Business Administration",
    status: "Pending",
    priority: "Low",
    submittedDate: "2024-01-13",
    lastUpdate: "2024-01-13",
    description: "Questions about transferring internship experience for academic credit.",
    attachments: [],
  },
]

function Sidebar({ className }: { className?: string }) {
  return (
    <div className={`pb-12 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Uni-Connect</span>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${item.active ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdvisorCard({ advisor, onContact }: { advisor: any; onContact: (advisor: any) => void }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={advisor.image || "/placeholder.svg"} alt={advisor.name} />
            <AvatarFallback>
              {advisor.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{advisor.name}</CardTitle>
                <CardDescription className="text-sm">{advisor.title}</CardDescription>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{advisor.rating}</span>
              </div>
            </div>
            <Badge variant="secondary" className="mt-2">
              {advisor.department}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{advisor.bio}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{advisor.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{advisor.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{advisor.office}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{advisor.availability}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {advisor.specialties.map((specialty: string) => (
              <Badge key={specialty} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Response time: {advisor.responseTime}</span>
          <Button size="sm" onClick={() => onContact(advisor)} className="bg-blue-600 hover:bg-blue-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EscalationForm({
  advisor,
  onSubmit,
  onClose,
}: { advisor: any; onSubmit: (data: any) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    category: "",
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments([...attachments, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const escalationData = {
      ...formData,
      advisor: advisor.name,
      department: advisor.department,
      attachments: attachments.map((file) => file.name),
      submittedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    }

    onSubmit(escalationData)
    toast({
      title: "Escalation Submitted",
      description: `Your request has been sent to ${advisor.name}. You'll receive a response within ${advisor.responseTime.toLowerCase()}.`,
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <Avatar className="w-12 h-12">
          <AvatarImage src={advisor.image || "/placeholder.svg"} alt={advisor.name} />
          <AvatarFallback>
            {advisor.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{advisor.name}</h3>
          <p className="text-sm text-gray-600">
            {advisor.department} • {advisor.title}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Priority Level *</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Academic Planning">Academic Planning</SelectItem>
              <SelectItem value="Course Registration">Course Registration</SelectItem>
              <SelectItem value="Career Guidance">Career Guidance</SelectItem>
              <SelectItem value="Graduate School">Graduate School</SelectItem>
              <SelectItem value="Research Opportunities">Research Opportunities</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Issue Title *</Label>
        <Input
          id="title"
          placeholder="Brief description of your issue"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Detailed Description *</Label>
        <Textarea
          id="description"
          placeholder="Please provide detailed information about your issue, including any relevant context, deadlines, or specific questions you have."
          rows={6}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Attachments</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PDF, DOC, TXT, JPG, PNG (max 10MB each)</p>
          </label>
        </div>

        {attachments.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Attached Files:</h4>
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{file.name}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          <Send className="h-4 w-4 mr-2" />
          Submit Escalation
        </Button>
      </div>
    </form>
  )
}

function EscalationStatus({ escalation }: { escalation: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "In Progress":
        return <AlertCircle className="h-4 w-4" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-blue-100 text-blue-800"
      case "Low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{escalation.title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(escalation.priority)}>{escalation.priority}</Badge>
            <Badge className={getStatusColor(escalation.status)}>
              {getStatusIcon(escalation.status)}
              <span className="ml-1">{escalation.status}</span>
            </Badge>
          </div>
        </div>
        <CardDescription>
          Advisor: {escalation.advisor} • {escalation.department}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{escalation.description}</p>

        {escalation.attachments.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments:</h4>
            <div className="flex flex-wrap gap-2">
              {escalation.attachments.map((attachment: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Paperclip className="h-3 w-3 mr-1" />
                  {attachment}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Submitted: {new Date(escalation.submittedDate).toLocaleDateString()}</span>
          <span>Last updated: {new Date(escalation.lastUpdate).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdvisorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [selectedAdvisor, setSelectedAdvisor] = useState<any>(null)
  const [showEscalationForm, setShowEscalationForm] = useState(false)
  const [userEscalations, setUserEscalations] = useState(escalations)

  const departments = ["All", ...Array.from(new Set(advisors.map((advisor) => advisor.department)))]

  const filteredAdvisors = advisors.filter((advisor) => {
    const matchesSearch =
      advisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      advisor.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDepartment = departmentFilter === "All" || advisor.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  const handleContactAdvisor = (advisor: any) => {
    setSelectedAdvisor(advisor)
    setShowEscalationForm(true)
  }

  const handleSubmitEscalation = (escalationData: any) => {
    const newEscalation = {
      id: userEscalations.length + 1,
      ...escalationData,
      lastUpdate: escalationData.submittedDate,
    }
    setUserEscalations([newEscalation, ...userEscalations])
    setShowEscalationForm(false)
    setSelectedAdvisor(null)
  }

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Advisors</h1>
        <p className="text-gray-600">Get guidance and support from experienced academic advisors</p>
      </div>

      <Tabs defaultValue="advisors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="advisors">Find Advisors</TabsTrigger>
          <TabsTrigger value="escalations">My Escalations ({userEscalations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="advisors" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {departmentFilter === "All" ? "All Departments" : departmentFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {departments.map((dept) => (
                    <DropdownMenuItem key={dept} onClick={() => setDepartmentFilter(dept)}>
                      {dept === "All" ? "All Departments" : dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="text-sm text-gray-500">{filteredAdvisors.length} advisors available</div>
          </div>

          {/* Advisors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdvisors.map((advisor) => (
              <AdvisorCard key={advisor.id} advisor={advisor} onContact={handleContactAdvisor} />
            ))}
          </div>

          {/* Empty State */}
          {filteredAdvisors.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No advisors found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="escalations" className="space-y-6">
          {/* Escalations List */}
          <div className="space-y-4">
            {userEscalations.map((escalation) => (
              <EscalationStatus key={escalation.id} escalation={escalation} />
            ))}
          </div>

          {/* Empty State */}
          {userEscalations.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No escalations yet</h3>
              <p className="text-gray-500">Contact an advisor to get started with your first escalation</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Escalation Form Dialog */}
      <Dialog open={showEscalationForm} onOpenChange={setShowEscalationForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Advisor</DialogTitle>
            <DialogDescription>
              Submit your question or concern to get personalized guidance from your advisor.
            </DialogDescription>
          </DialogHeader>
          {selectedAdvisor && (
            <EscalationForm
              advisor={selectedAdvisor}
              onSubmit={handleSubmitEscalation}
              onClose={() => setShowEscalationForm(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
