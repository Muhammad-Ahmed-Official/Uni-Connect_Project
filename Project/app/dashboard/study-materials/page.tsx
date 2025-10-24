"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/dashboard/common/Header";
import SearchFilters from "@/components/dashboard/PastPapersPage/SearchFilters";
import ResultsHeader from "@/components/dashboard/PastPapersPage/ResultsHeader";
import PapersGrid from "@/components/dashboard/PastPapersPage/PapersGrid";
import { PastPaper } from "@/types/past-paper";
import UploadDocumentModal from "@/components/dashboard/PastPapersPage/uploadDocumentModal";

const pastPapers: PastPaper[] = [
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
];

const subjects = ["All Subjects", "Computer Science", "Mathematics", "Chemistry", "Economics", "Physics"];
const years = ["All Years", "2023", "2022", "2021", "2020"];
const semesters = ["All Semesters", "Fall", "Spring", "Summer"];
const examTypes = ["All Types", "Final", "Midterm", "Quiz", "Assignment"];

export default function PastPapersPage() {
  const [isUploadModalDocumentOpen, setIsUploadModalDocumentOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedSemester, setSelectedSemester] = useState("All Semesters");
  const [selectedExamType, setSelectedExamType] = useState("All Types");

  const filteredPapers = pastPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.professor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject = selectedSubject === "All Subjects" || paper.subject === selectedSubject;
    const matchesYear = selectedYear === "All Years" || paper.year === selectedYear;
    const matchesSemester = selectedSemester === "All Semesters" || paper.semester === selectedSemester;
    const matchesExamType = selectedExamType === "All Types" || paper.examType === selectedExamType;

    return matchesSearch && matchesSubject && matchesYear && matchesSemester && matchesExamType;
  });

  const handleDownload = (paperId: number, title: string) => {
    // Simulate download
    console.log(`Downloading paper: ${title}`);
  };

  // Document actions 
  const handleUploadDocument = () => {
    setIsUploadModalDocumentOpen(false);
    toast({
      title: "Document Uploaded",
      description: "Document has been uploaded and is pending approval.",
    });
  };

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Header
          title="Study Materials Repository"
          description="Access previous assignments, and study materials"
        />
        <UploadDocumentModal
          isOpen={isUploadModalDocumentOpen}
          onOpenChange={setIsUploadModalDocumentOpen}
          onUpload={handleUploadDocument}
        />
      </div>

      {/* Search and Filters */}
      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedSemester={selectedSemester}
        onSemesterChange={setSelectedSemester}
        selectedExamType={selectedExamType}
        onExamTypeChange={setSelectedExamType}
        subjects={subjects}
        years={years}
        semesters={semesters}
        examTypes={examTypes}
      />

      {/* Results Header */}
      <ResultsHeader
        filteredCount={filteredPapers.length}
        totalCount={pastPapers.length}
        papers={pastPapers}
      />

      {/* Papers Grid */}
      <PapersGrid
        papers={filteredPapers}
        onDownload={handleDownload}
      />
    </div>
  );
}