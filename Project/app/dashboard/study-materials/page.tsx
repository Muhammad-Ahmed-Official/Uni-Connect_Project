"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/dashboard/common/Header";
import SearchFilters from "@/components/dashboard/PastPapersPage/SearchFilters";
import ResultsHeader from "@/components/dashboard/PastPapersPage/ResultsHeader";
import PapersGrid from "@/components/dashboard/PastPapersPage/PapersGrid";
import { PastPaper } from "@/types/past-paper";
import UploadDocumentModal from "@/components/dashboard/PastPapersPage/uploadDocumentModal";
import axios from "axios";
import PaperCardSkeleton from "@/components/dashboard/PastPapersPage/PaperCardSkeleton";
import ResultsHeaderSkeleton from "@/components/dashboard/PastPapersPage/ResultsHeaderSkeleton";

export default function PastPapersPage() {
  const [isUploadModalDocumentOpen, setIsUploadModalDocumentOpen] = useState(false);
  const [documents, setDocuments] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedExamType, setSelectedExamType] = useState("All Types");

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/documents/get-all-documents');
      setDocuments(response.data.data || []);

      const deptSet = new Set<string>((response.data.data?.map((doc: PastPaper) =>
        doc.department_id.departmentName
      ) || []) as string[]);
      setDepartments(["All Departments", ...Array.from(deptSet)]);

    } catch (error) {
      console.error("Error fetching documents:", error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const filteredPapers = documents.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (paper.teacher_name && paper.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDepartment = selectedDepartment === "All Departments" ||
      paper.department_id.departmentName === selectedDepartment;

    const matchesExamType = selectedExamType === "All Types" ||
      paper.exam_type === selectedExamType;

    return matchesSearch && matchesDepartment && matchesExamType;
  });

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Header
          title="Study Materials Repository"
          description="Access past papers, assignments, and study materials"
        />
        <UploadDocumentModal
          isOpen={isUploadModalDocumentOpen}
          onOpenChange={setIsUploadModalDocumentOpen}
          fetchDocuments={fetchDocuments}
        />
      </div>

      {/* Search and Filters */}
      {
        loading ? (
          <ResultsHeaderSkeleton />
        ) : (
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            selectedExamType={selectedExamType}
            onExamTypeChange={setSelectedExamType}
            departments={departments}
            examTypes={["All Types", "final", "midterms", "quiz"]}
            loading={loading}
          />
        )
      }

      {/* Results Header */}
      {
        loading ? (
          <ResultsHeaderSkeleton />
        ) : (
          <ResultsHeader
            filteredCount={filteredPapers.length}
            totalCount={documents.length}
            papers={filteredPapers}
          />
        )
      }

      {/* Papers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <PaperCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <PapersGrid
          papers={filteredPapers}
        />
      )}
    </div>
  );
}