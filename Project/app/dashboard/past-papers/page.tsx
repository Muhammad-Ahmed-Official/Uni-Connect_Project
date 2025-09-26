"use client"

import { useState } from "react"
import { Search, Filter, Download, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/dashboard/common/Header"

const pastPapers = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    subject: "Computer Science",
    year: "2023",
    semester: "Fall",
    examType: "Final",
    professor: "Dr. Smith",
    downloads: 245,
    uploadDate: "2023-12-15",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    title: "Calculus II",
    subject: "Mathematics",
    year: "2023",
    semester: "Spring",
    examType: "Midterm",
    professor: "Prof. Johnson",
    downloads: 189,
    uploadDate: "2023-05-20",
    fileSize: "1.8 MB",
  },
  {
    id: 3,
    title: "Organic Chemistry",
    subject: "Chemistry",
    year: "2022",
    semester: "Fall",
    examType: "Final",
    professor: "Dr. Williams",
    downloads: 156,
    uploadDate: "2022-12-10",
    fileSize: "3.1 MB",
  },
  {
    id: 4,
    title: "Microeconomics",
    subject: "Economics",
    year: "2023",
    semester: "Spring",
    examType: "Quiz",
    professor: "Prof. Brown",
    downloads: 98,
    uploadDate: "2023-04-15",
    fileSize: "1.2 MB",
  },
  {
    id: 5,
    title: "Physics Mechanics",
    subject: "Physics",
    year: "2023",
    semester: "Fall",
    examType: "Final",
    professor: "Dr. Davis",
    downloads: 203,
    uploadDate: "2023-12-08",
    fileSize: "2.7 MB",
  },
  {
    id: 6,
    title: "Database Systems",
    subject: "Computer Science",
    year: "2022",
    semester: "Spring",
    examType: "Midterm",
    professor: "Prof. Wilson",
    downloads: 167,
    uploadDate: "2022-04-22",
    fileSize: "2.1 MB",
  },
]

const subjects = ["All Subjects", "Computer Science", "Mathematics", "Chemistry", "Economics", "Physics"]
const years = ["All Years", "2023", "2022", "2021", "2020"]
const semesters = ["All Semesters", "Fall", "Spring", "Summer"]
const examTypes = ["All Types", "Final", "Midterm", "Quiz", "Assignment"]

export default function PastPapersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All Subjects")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedSemester, setSelectedSemester] = useState("All Semesters")
  const [selectedExamType, setSelectedExamType] = useState("All Types")

  const filteredPapers = pastPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.professor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "All Subjects" || paper.subject === selectedSubject
    const matchesYear = selectedYear === "All Years" || paper.year === selectedYear
    const matchesSemester = selectedSemester === "All Semesters" || paper.semester === selectedSemester
    const matchesExamType = selectedExamType === "All Types" || paper.examType === selectedExamType

    return matchesSearch && matchesSubject && matchesYear && matchesSemester && matchesExamType
  })

  const handleDownload = (paperId: number, title: string) => {
    // Simulate download
    console.log(`Downloading paper: ${title}`)
    // In a real app, this would trigger the actual download
  }

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header title="Past Papers Repository" description="Access previous exam papers, assignments, and study materials" />

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search papers or professors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedExamType} onValueChange={setSelectedExamType}>
              <SelectTrigger>
                <SelectValue placeholder="Exam Type" />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredPapers.length} of {pastPapers.length} papers
        </p>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Total Downloads: {pastPapers.reduce((sum, paper) => sum + paper.downloads, 0)}
          </span>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPapers.map((paper) => (
          <Card key={paper.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{paper.title}</CardTitle>
                  <p className="text-sm text-gray-600 mb-2">{paper.professor}</p>
                </div>
                <Badge variant="secondary">{paper.subject}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {paper.year} {paper.semester}
                  </div>
                  <Badge variant="outline">{paper.examType}</Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{paper.fileSize}</span>
                  <span>{paper.downloads} downloads</span>
                </div>

                <Button onClick={() => handleDownload(paper.id, paper.title)} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Paper
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPapers.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}
