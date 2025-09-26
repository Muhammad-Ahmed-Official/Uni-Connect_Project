"use client"

import { useState } from "react"
import Header from "@/components/dashboard/common/Header"
import Filters from "@/components/dashboard/common/Filters"
import DepartmentCards from "@/components/dashboard/DepartmentsPage/DepartmentCards"

type Department = {
  id: string
  name: string
  description: string
  memberCount: number
  activeDiscussions: number
  recentActivity: string
  color: string
  icon: string
  tags: string[]
}

const departments: Department[] = [
  {
    id: "computer-science",
    name: "Computer Science",
    description: "Programming, algorithms, software engineering, and AI discussions",
    memberCount: 1247,
    activeDiscussions: 23,
    recentActivity: "2 minutes ago",
    color: "bg-blue-100 text-blue-700",
    icon: "💻",
    tags: ["Programming", "AI", "Web Dev", "Data Science"],
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Mechanical, electrical, civil, and chemical engineering topics",
    memberCount: 892,
    activeDiscussions: 18,
    recentActivity: "15 minutes ago",
    color: "bg-orange-100 text-orange-700",
    icon: "⚙️",
    tags: ["Mechanical", "Electrical", "Civil", "Chemical"],
  },
  {
    id: "business",
    name: "Business Administration",
    description: "Management, finance, marketing, and entrepreneurship discussions",
    memberCount: 756,
    activeDiscussions: 31,
    recentActivity: "5 minutes ago",
    color: "bg-green-100 text-green-700",
    icon: "📊",
    tags: ["Finance", "Marketing", "Management", "Strategy"],
  },
  {
    id: "medicine",
    name: "Medicine",
    description: "Medical studies, research, clinical practice, and health sciences",
    memberCount: 634,
    activeDiscussions: 12,
    recentActivity: "1 hour ago",
    color: "bg-red-100 text-red-700",
    icon: "🏥",
    tags: ["Clinical", "Research", "Anatomy", "Pharmacology"],
  },
  {
    id: "law",
    name: "Law",
    description: "Legal studies, case discussions, and jurisprudence",
    memberCount: 423,
    activeDiscussions: 8,
    recentActivity: "30 minutes ago",
    color: "bg-purple-100 text-purple-700",
    icon: "⚖️",
    tags: ["Constitutional", "Criminal", "Corporate", "International"],
  },
  {
    id: "arts",
    name: "Arts & Humanities",
    description: "Literature, history, philosophy, and cultural studies",
    memberCount: 567,
    activeDiscussions: 15,
    recentActivity: "45 minutes ago",
    color: "bg-pink-100 text-pink-700",
    icon: "🎨",
    tags: ["Literature", "History", "Philosophy", "Culture"],
  },
  {
    id: "sciences",
    name: "Natural Sciences",
    description: "Physics, chemistry, biology, and mathematics discussions",
    memberCount: 789,
    activeDiscussions: 20,
    recentActivity: "10 minutes ago",
    color: "bg-teal-100 text-teal-700",
    icon: "🔬",
    tags: ["Physics", "Chemistry", "Biology", "Mathematics"],
  },
  {
    id: "social-sciences",
    name: "Social Sciences",
    description: "Psychology, sociology, anthropology, and political science",
    memberCount: 445,
    activeDiscussions: 14,
    recentActivity: "20 minutes ago",
    color: "bg-indigo-100 text-indigo-700",
    icon: "🧠",
    tags: ["Psychology", "Sociology", "Politics", "Anthropology"],
  },
]
export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("members")

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    switch (sortBy) {
      case "members":
        return b.memberCount - a.memberCount
      case "activity":
        return b.activeDiscussions - a.activeDiscussions
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header title="Departments" description="Connect with students in your department and across the university" />

      {/* Filters and Sort */}
      <Filters
        options={["members", "activity", "name"]}
        currentFilter={sortBy}
        setCurrentFilter={setSortBy}
        label="Sort by"
        count={sortedDepartments.length}
        countLabel="departments found"
      />

      {/* Department Cards Grid */}
      <DepartmentCards departmentsData={sortedDepartments} />
    </div>
  )
}
