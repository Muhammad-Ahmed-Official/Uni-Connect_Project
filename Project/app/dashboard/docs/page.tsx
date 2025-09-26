"use client"

import { useState } from "react"
import { Search, Download, FileText, Calendar, Tag, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/dashboard/common/Header"

const documents = [
  {
    id: 1,
    title: "Student Academic Policies 2024",
    category: "Academic Policies",
    description: "Comprehensive guide to academic regulations, grading policies, and student conduct expectations.",
    uploadDate: "2024-01-15",
    fileSize: "3.2 MB",
    downloads: 1250,
    tags: ["Academic", "Policies", "Students"],
    isNew: true,
  },
  {
    id: 2,
    title: "Financial Aid Guidelines",
    category: "Financial",
    description: "Complete information about scholarships, grants, loans, and financial assistance programs.",
    uploadDate: "2023-12-10",
    fileSize: "2.8 MB",
    downloads: 890,
    tags: ["Financial Aid", "Scholarships", "Guidelines"],
    isNew: false,
  },
  {
    id: 3,
    title: "Campus Safety Protocols",
    category: "Safety & Security",
    description: "Emergency procedures, safety guidelines, and campus security contact information.",
    uploadDate: "2024-01-20",
    fileSize: "1.9 MB",
    downloads: 567,
    tags: ["Safety", "Emergency", "Security"],
    isNew: true,
  },
  {
    id: 4,
    title: "Research Ethics Guidelines",
    category: "Research",
    description: "Ethical standards and procedures for conducting research at the university.",
    uploadDate: "2023-11-30",
    fileSize: "2.1 MB",
    downloads: 423,
    tags: ["Research", "Ethics", "Guidelines"],
    isNew: false,
  },
  {
    id: 5,
    title: "International Student Handbook",
    category: "International",
    description:
      "Essential information for international students including visa requirements and cultural integration.",
    uploadDate: "2024-01-05",
    fileSize: "4.5 MB",
    downloads: 678,
    tags: ["International", "Students", "Visa"],
    isNew: true,
  },
  {
    id: 6,
    title: "IT Services & Support",
    category: "Technology",
    description: "Guide to university IT services, software access, and technical support resources.",
    uploadDate: "2023-12-15",
    fileSize: "2.3 MB",
    downloads: 789,
    tags: ["IT", "Technology", "Support"],
    isNew: false,
  },
]

const categories = [
  "All Categories",
  "Academic Policies",
  "Financial",
  "Safety & Security",
  "Research",
  "International",
  "Technology",
]

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [activeTab, setActiveTab] = useState("all")

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All Categories" || doc.category === selectedCategory
    const matchesTab = activeTab === "all" || (activeTab === "new" && doc.isNew)

    return matchesSearch && matchesCategory && matchesTab
  })

  const handleDownload = (docId: number, title: string) => {
    console.log(`Downloading document: ${title}`)
  }

  const handlePreview = (docId: number, title: string) => {
    console.log(`Previewing document: ${title}`)
  }

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header title="Government & Policy Documents" description="Access official university policies, guidelines, and government documents" />

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents, policies, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="new">New Documents</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredDocs.length} of {documents.length} documents
        </p>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Total Downloads: {documents.reduce((sum, doc) => sum + doc.downloads, 0)}
          </span>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{doc.title}</h3>
                    {doc.isNew && <Badge className="bg-green-100 text-green-800">New</Badge>}
                  </div>

                  <p className="text-gray-600 mb-3">{doc.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </div>
                    <span>{doc.fileSize}</span>
                    <span>{doc.downloads} downloads</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{doc.category}</Badge>
                    {doc.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handlePreview(doc.id, doc.title)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => handleDownload(doc.id, doc.title)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or category filter</p>
        </div>
      )}
    </div>
  )
}
