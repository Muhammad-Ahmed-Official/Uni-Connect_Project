"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Star,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/admin/advisors/Header"
import StatsCards from "../../../components/admin/advisors/StatsCards"
import FiltersAndSearches from "@/components/admin/advisors/FiltersAndSearches"
import AssignDepartmentDialog from "@/components/admin/advisors/AssignDepartmentDialog"

export interface Advisor {
  id: number
  name: string
  email: string
  department: string
  specialization: string
  status: string
  rating: number
  totalEscalations: number
  resolvedEscalations: number
  avgResponseTime: string
  joinDate: string
  avatar: string
  officeHours: string
  phone: string
}

// Mock advisor data
const mockAdvisors: Advisor[] = [
  {
    id: 1,
    name: "Dr. Michael Smith",
    email: "m.smith@university.edu",
    department: "Engineering",
    specialization: "Mechanical Engineering",
    status: "active",
    rating: 4.8,
    totalEscalations: 45,
    resolvedEscalations: 42,
    avgResponseTime: "2.3 hours",
    joinDate: "2020-08-20",
    avatar: "/placeholder-user.jpg",
    officeHours: "Mon-Wed 2-4 PM",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Dr. Lisa Anderson",
    email: "l.anderson@university.edu",
    department: "Biology",
    specialization: "Molecular Biology",
    status: "active",
    rating: 4.9,
    totalEscalations: 38,
    resolvedEscalations: 37,
    avgResponseTime: "1.8 hours",
    joinDate: "2021-03-15",
    avatar: "/placeholder-user.jpg",
    officeHours: "Tue-Thu 10-12 PM",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Prof. David Wilson",
    email: "d.wilson@university.edu",
    department: "Mathematics",
    specialization: "Applied Mathematics",
    status: "active",
    rating: 4.7,
    totalEscalations: 52,
    resolvedEscalations: 48,
    avgResponseTime: "3.1 hours",
    joinDate: "2019-01-10",
    avatar: "/placeholder-user.jpg",
    officeHours: "Mon-Fri 1-3 PM",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 4,
    name: "Dr. Sarah Johnson",
    email: "s.johnson@university.edu",
    department: "Computer Science",
    specialization: "Software Engineering",
    status: "active",
    rating: 4.6,
    totalEscalations: 67,
    resolvedEscalations: 63,
    avgResponseTime: "2.7 hours",
    joinDate: "2022-09-01",
    avatar: "/placeholder-user.jpg",
    officeHours: "Wed-Fri 3-5 PM",
    phone: "+1 (555) 456-7890",
  },
  {
    id: 5,
    name: "Dr. Robert Chen",
    email: "r.chen@university.edu",
    department: "Business Administration",
    specialization: "Finance",
    status: "suspended",
    rating: 4.2,
    totalEscalations: 23,
    resolvedEscalations: 20,
    avgResponseTime: "4.2 hours",
    joinDate: "2023-02-14",
    avatar: "/placeholder-user.jpg",
    officeHours: "Mon-Wed 11-1 PM",
    phone: "+1 (555) 567-8901",
  },
  {
    id: 6,
    name: "Dr. Emily Rodriguez",
    email: "e.rodriguez@university.edu",
    department: "Psychology",
    specialization: "Clinical Psychology",
    status: "active",
    rating: 4.9,
    totalEscalations: 41,
    resolvedEscalations: 40,
    avgResponseTime: "1.5 hours",
    joinDate: "2021-08-30",
    avatar: "/placeholder-user.jpg",
    officeHours: "Tue-Thu 9-11 AM",
    phone: "+1 (555) 678-9012",
  },
]

const departments = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Mathematics",
  "Psychology",
  "Biology",
  "Physics",
  "Chemistry",
  "English Literature",
  "History",
]

export const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-700",
  inactive: "bg-gray-100 text-gray-700",
}

export function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
    />
  ))
}

export default function AdvisorManagement() {
  const [advisors] = useState<Advisor[]>(mockAdvisors)

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header />

      {/* Stats Cards */}
      <StatsCards advisors={advisors} />

      {/* Filters and Search */}
      <FiltersAndSearches advisors={advisors} departments={departments} />
    </div>
  )
}
