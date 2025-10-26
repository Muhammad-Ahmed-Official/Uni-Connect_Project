"use client"

import { useEffect, useState } from "react"
import Header from "@/components/dashboard/common/Header"
import Filters from "@/components/dashboard/common/Filters"
import DepartmentCards from "@/components/dashboard/DepartmentsPage/DepartmentCards"
import axios from "axios"
import { DepartmentCardSkeletonGrid } from "@/components/skeletons/DepartmentCardSkeleton"

interface Department {
  _id: string;
  departmentName: string;
  departmentCharmanEmail: string;
  followers_count: number;
  total_posts: number;
  departmentBio: string;
  departmentCharman: string;
  departmentTags: string[];
  established: string;
}

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("members");
  const [isFetchingDeparts, setIsFetchingDeparts] = useState<boolean>(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setIsFetchingDeparts(true);
        const response = await axios.get('/api/departments');
        setDepartments(response.data.data || []);
      }
      catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setIsFetchingDeparts(false);
      }
    }

    fetchDepartments()
  }, [])

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.departmentBio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.departmentTags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    switch (sortBy) {
      case "members":
        return b.followers_count - a.followers_count
      case "activity":
        return b.total_posts - a.total_posts
      case "name":
        return a.departmentName.localeCompare(b.departmentName)
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
      {
        isFetchingDeparts ? (
          <DepartmentCardSkeletonGrid />
        ) : (
          <DepartmentCards departmentsData={sortedDepartments} />
        )
      }
    </div>
  )
}
