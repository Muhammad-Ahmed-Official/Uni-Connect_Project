"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Upload,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Calendar,
  User,
  BookOpen,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const mockPastPapers = [
  {
    id: 1,
    title: "Data Structures and Algorithms - Final Exam",
    subject: "Computer Science",
    year: "2023",
    semester: "Fall",
    examType: "Final",
    uploadedBy: "Dr. Smith",
    uploadDate: "2024-01-15",
    status: "approved",
    downloads: 245,
    fileSize: "2.3 MB",
    fileType: "PDF",
  },
  {
    id: 2,
    title: "Calculus II - Midterm Exam",
    subject: "Mathematics",
    year: "2023",
    semester: "Spring",
    examType: "Midterm",
    uploadedBy: "Prof. Johnson",
    uploadDate: "2024-02-10",
    status: "pending",
    downloads: 0,
    fileSize: "1.8 MB",
    fileType: "PDF",
  },
  {
    id: 3,
    title: "Organic Chemistry - Quiz 3",
    subject: "Chemistry",
    year: "2023",
    semester: "Fall",
    examType: "Quiz",
    uploadedBy: "Dr. Wilson",
    uploadDate: "2024-01-20",
    status: "rejected",
    downloads: 0,
    fileSize: "1.2 MB",
    fileType: "PDF",
  },
]

const mockPolicyDocs = [
  {
    id: 1,
    title: "Student Code of Conduct 2024",
    category: "Academic Policies",
    uploadedBy: "Admin Office",
    uploadDate: "2024-01-01",
    status: "approved",
    downloads: 1250,
    fileSize: "5.2 MB",
    fileType: "PDF",
    lastUpdated: "2024-01-01",
  },
  {
    id: 2,
    title: "Research Ethics Guidelines",
    category: "Research Policies",
    uploadedBy: "Research Office",
    uploadDate: "2024-02-15",
    status: "pending",
    downloads: 0,
    fileSize: "3.1 MB",
    fileType: "PDF",
    lastUpdated: "2024-02-15",
  },
  {
    id: 3,
    title: "Financial Aid Procedures",
    category: "Financial Policies",
    uploadedBy: "Financial Aid Office",
    uploadDate: "2024-01-10",
    status: "approved",
    downloads: 890,
    fileSize: "2.8 MB",
    fileType: "PDF",
    lastUpdated: "2024-01-10",
  },
]

export default function AdminDocumentsPage() {
  const [pastPapers, setPastPapers] = useState(mockPastPapers)
  const [policyDocs, setPolicyDocs] = useState(mockPolicyDocs)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadType, setUploadType] = useState("past-paper")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleApproveDocument = (id, type) => {
    if (type === "past-paper") {
      setPastPapers((papers) => papers.map((paper) => (paper.id === id ? { ...paper, status: "approved" } : paper)))
    } else {
      setPolicyDocs((docs) => docs.map((doc) => (doc.id === id ? { ...doc, status: "approved" } : doc)))
    }
    toast({
      title: "Document Approved",
      description: "The document has been approved and is now available to users.",
    })
  }

  const handleRejectDocument = (id, type) => {
    if (type === "past-paper") {
      setPastPapers((papers) => papers.map((paper) => (paper.id === id ? { ...paper, status: "rejected" } : paper)))
    } else {
      setPolicyDocs((docs) => docs.map((doc) => (doc.id === id ? { ...doc, status: "rejected" } : doc)))
    }
    toast({
      title: "Document Rejected",
      description: "The document has been rejected and will not be visible to users.",
    })
  }

  const handleDeleteDocument = (id, type) => {
    if (type === "past-paper") {
      setPastPapers((papers) => papers.filter((paper) => paper.id !== id))
    } else {
      setPolicyDocs((docs) => docs.filter((doc) => doc.id !== id))
    }
    toast({
      title: "Document Deleted",
      description: "The document has been permanently deleted.",
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredPastPapers = pastPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || paper.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredPolicyDocs = policyDocs.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPastPapers = pastPapers.length
  const approvedPastPapers = pastPapers.filter((p) => p.status === "approved").length
  const totalPolicyDocs = policyDocs.length
  const approvedPolicyDocs = policyDocs.filter((d) => d.status === "approved").length
  const pendingApprovals = [...pastPapers, ...policyDocs].filter((item) => item.status === "pending").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Manage past papers, policy documents, and approvals</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Add a new document to the repository</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select value={uploadType} onValueChange={setUploadType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="past-paper">Past Paper</SelectItem>
                    <SelectItem value="policy-doc">Policy Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {uploadType === "past-paper" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Paper Title</Label>
                      <Input id="title" placeholder="Enter paper title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spring">Spring</SelectItem>
                          <SelectItem value="fall">Fall</SelectItem>
                          <SelectItem value="summer">Summer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exam-type">Exam Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="final">Final</SelectItem>
                          <SelectItem value="midterm">Midterm</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doc-title">Document Title</Label>
                      <Input id="doc-title" placeholder="Enter document title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic-policies">Academic Policies</SelectItem>
                          <SelectItem value="research-policies">Research Policies</SelectItem>
                          <SelectItem value="financial-policies">Financial Policies</SelectItem>
                          <SelectItem value="student-services">Student Services</SelectItem>
                          <SelectItem value="administrative">Administrative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input id="file" type="file" accept=".pdf,.doc,.docx" />
                <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setIsUploadDialogOpen(false)
                  toast({
                    title: "Document Uploaded",
                    description: "Document has been uploaded and is pending approval.",
                  })
                }}
              >
                Upload Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Past Papers</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPastPapers}</div>
            <p className="text-xs text-muted-foreground">{approvedPastPapers} approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Policy Docs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPolicyDocs}</div>
            <p className="text-xs text-muted-foreground">{approvedPolicyDocs} approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {[...pastPapers, ...policyDocs].reduce((sum, item) => sum + item.downloads, 0)}
            </div>
            <p className="text-xs text-muted-foreground">All documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.7 GB</div>
            <p className="text-xs text-muted-foreground">of 100 GB limit</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Document Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Document Tabs */}
      <Tabs defaultValue="past-papers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="past-papers">Past Papers</TabsTrigger>
          <TabsTrigger value="policy-docs">Policy Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="past-papers" className="space-y-4">
          <div className="grid gap-4">
            {filteredPastPapers.map((paper) => (
              <Card key={paper.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{paper.title}</h3>
                        {getStatusBadge(paper.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          {paper.subject}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {paper.year} {paper.semester}
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          {paper.examType}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {paper.uploadedBy}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Uploaded: {new Date(paper.uploadDate).toLocaleDateString()}</span>
                        <span>Downloads: {paper.downloads}</span>
                        <span>Size: {paper.fileSize}</span>
                        <span>Type: {paper.fileType}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      {paper.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveDocument(paper.id, "past-paper")}
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectDocument(paper.id, "past-paper")}
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteDocument(paper.id, "past-paper")}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="policy-docs" className="space-y-4">
          <div className="grid gap-4">
            {filteredPolicyDocs.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{doc.title}</h3>
                        {getStatusBadge(doc.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          {doc.category}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {doc.uploadedBy}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                        <span>Downloads: {doc.downloads}</span>
                        <span>Size: {doc.fileSize}</span>
                        <span>Type: {doc.fileType}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      {doc.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveDocument(doc.id, "policy-doc")}
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectDocument(doc.id, "policy-doc")}
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteDocument(doc.id, "policy-doc")}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredPastPapers.length === 0 && filteredPolicyDocs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
