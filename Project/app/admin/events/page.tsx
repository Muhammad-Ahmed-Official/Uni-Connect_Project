"use client"

import { useState } from "react"
import Header from "@/components/admin/events/Header"
import StatsCards from "@/components/admin/events/StatsCards"
import FiltersAndSearches from "@/components/admin/events/FiltersAndSearches"

const mockEvents: AdminEvent[] = [
  {
    id: 1,
    title: "Tech Innovation Conference 2024",
    description: "Annual technology conference featuring industry leaders and cutting-edge innovations.",
    date: "2024-03-15",
    time: "09:00",
    location: "Main Auditorium",
    category: "University-wide",
    status: "approved",
    rsvps: 245,
    capacity: 300,
    organizer: "Computer Science Department",
    image: "/tech-conference.png",
  },
  {
    id: 2,
    title: "Career Fair Spring 2024",
    description: "Connect with top employers and explore career opportunities across various industries.",
    date: "2024-03-20",
    time: "10:00",
    location: "Student Center",
    category: "University-wide",
    status: "pending",
    rsvps: 189,
    capacity: 500,
    organizer: "Career Services",
    image: "/career-fair.png",
  },
  {
    id: 3,
    title: "Engineering Design Competition",
    description: "Showcase your engineering skills in this annual design competition.",
    date: "2024-03-25",
    time: "14:00",
    location: "Engineering Building",
    category: "Department",
    status: "approved",
    rsvps: 67,
    capacity: 100,
    organizer: "Engineering Department",
    image: "/engineering-competition.png",
  },
  {
    id: 4,
    title: "Study Abroad Information Session",
    description: "Learn about international study opportunities and application processes.",
    date: "2024-03-30",
    time: "16:00",
    location: "Room 205",
    category: "Department",
    status: "rejected",
    rsvps: 34,
    capacity: 50,
    organizer: "International Office",
    image: "/study-abroad-students.png",
  },
]

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>(mockEvents)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredEvents: AdminEvent[] = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const totalEvents = events.length
  const approvedEvents = events.filter((e) => e.status === "approved").length
  const pendingEvents = events.filter((e) => e.status === "pending").length
  const totalRSVPs = events.reduce((sum, event) => sum + event.rsvps, 0)

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} />

      {/* Stats Cards */}
      <StatsCards totalEvents={totalEvents} approvedEvents={approvedEvents} pendingEvents={pendingEvents} totalRSVPs={totalRSVPs} />

      {/* Filters and Search */}
      <FiltersAndSearches filteredEvents={filteredEvents} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} setEvents={setEvents} events={events} />
    </div>
  )
}
