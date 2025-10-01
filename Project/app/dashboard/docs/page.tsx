"use client";

import { useState } from "react";
import Header from "@/components/dashboard/common/Header";
import SearchFilters from "@/components/dashboard/DocsPage/SearchFilters";
import DocumentsTabs from "@/components/dashboard/DocsPage/DocumentsTabs";
import ResultsHeader from "@/components/dashboard/DocsPage/ResultsHeader";
import DocumentsList from "@/components/dashboard/DocsPage/DocumentsList";
import { Document } from "@/types/document";

const documents: Document[] = [
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
];

const categories = [
  "All Categories",
  "Academic Policies",
  "Financial",
  "Safety & Security",
  "Research",
  "International",
  "Technology",
];

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("all");

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All Categories" || doc.category === selectedCategory;
    const matchesTab = activeTab === "all" || (activeTab === "new" && doc.isNew);

    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleDownload = (docId: number, title: string) => {
    console.log(`Downloading document: ${title}`);
    // In a real app, this would trigger the actual download
    // You could also track download analytics here
  };

  const handlePreview = (docId: number, title: string) => {
    console.log(`Previewing document: ${title}`);
    // In a real app, this would open a document preview modal
  };

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header
        title="Government & Policy Documents"
        description="Access official university policies, guidelines, and government documents"
      />

      {/* Search and Filters */}
      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Tabs */}
      <DocumentsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Results Header */}
      <ResultsHeader
        filteredCount={filteredDocs.length}
        totalCount={documents.length}
        documents={documents}
      />

      {/* Documents List */}
      <DocumentsList
        documents={filteredDocs}
        onPreview={handlePreview}
        onDownload={handleDownload}
      />
    </div>
  );
}