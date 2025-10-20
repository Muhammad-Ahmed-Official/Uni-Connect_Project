"use client"

import { useState } from "react"
import Header from "@/components/admin/events/Header"
import StatsCards from "@/components/admin/events/StatsCards"
import FiltersAndSearches from "@/components/admin/events/FiltersAndSearches"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import { object } from "zod"

const mockEvents: AdminEvent[] = [
  {
    _id: 1,
    title: "Tech Innovation Conference 2024",
    content: "Annual technology conference featuring industry leaders and cutting-edge innovations.",
    start_date: "2024-03-12",
    end_date: "2024-03-15",
    location: "Main Auditorium",
    image: "/tech-conference.png",
    status: "approved",
  },
  {
    _id: 2,
    title: "Career Fair Spring 2024",
    content: "Connect with top employers and explore career opportunities across various industries.",
    start_date: "2024-05-3",
    end_date: "2024-05-05",
    location: "Student Center",
    image: "/career-fair.png",
    status: "pending",
  },
]

export interface EventFormValues {
  title: string,
  content: string,
  image: any,
  eventDetails: {
    location: string,
    start_date: string,
    end_date: string,
  }
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>(mockEvents)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [loading, setLoading] = useState<boolean>(false);
  const [editEvent, setEditEvent] = useState<EventFormValues>({
    title: "",
    content: "",
    image: "",
    eventDetails: {
      location: "",
      start_date: "",
      end_date: "",
    }
  })

  const handleSaveEvent = async () => {
    setLoading(true);
    try {
      const response = await apiClient.createEvent(editEvent);
    } catch (error) {
      toast("Something went wrong");
    }finally{
      setIsCreateDialogOpen(false);
      setLoading(false);
    }
  }

  const filteredEvents: AdminEvent[] = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
      // event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    // const matchesStatus = statusFilter === "all" || event.status === statusFilter
    // const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
    return matchesSearch
  })

  const totalEvents = events.length
  const approvedEvents = events.filter((e) => e.status === "approved").length
  const pendingEvents = events.filter((e) => e.status === "pending").length

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} editEvent={editEvent} setEditEvent={setEditEvent}  handleSaveEvent={handleSaveEvent} loading={loading} />

      {/* Stats Cards */}
      <StatsCards totalEvents={totalEvents} approvedEvents={approvedEvents} pendingEvents={pendingEvents} />

      {/* Filters and Search */}
      <FiltersAndSearches filteredEvents={filteredEvents} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} setEvents={setEvents} events={events} />
    </div>
  )
}