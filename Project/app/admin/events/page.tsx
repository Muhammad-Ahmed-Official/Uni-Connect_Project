"use client"

import { useEffect, useState } from "react"
import Header from "@/components/admin/events/Header"
import StatsCards from "@/components/admin/events/StatsCards"
import FiltersAndSearches from "@/components/admin/events/FiltersAndSearches"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import { object } from "zod"

export interface EventFormValues {
  title: string,
  content: string,
  image: any,
  departmentName: string,
  eventDetails: {
    location: string,
    start_date: string,
    end_date: string,
  }
}


export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [eventStats, setEventStats] = useState({
    totalEvents: 0,
    totalLikes: 0,
    totalComments: 0,
  });
  const [editEvent, setEditEvent] = useState<EventFormValues>({
    title: "",
    content: "",
    image: "",
    departmentName: "",
    eventDetails: {
      location: "",
      start_date: "",
      end_date: "",
    }
  })

  const handleSaveEvent = async () => {
    const { title, content, departmentName, eventDetails } = editEvent;
    if (
      !title.trim() ||
      !content.trim() ||
      !departmentName.trim() ||
      !eventDetails.location.trim() ||
      !eventDetails.start_date.trim() ||
      !eventDetails.end_date.trim()
    ) {
      toast("All fields are required.");
      return;
    };

    setLoading(true);
    try {
      const newEvent:any =  await apiClient.createEvent(editEvent);
      setEvents((prev) => [...prev, newEvent?.data]);
      setEditEvent({
        title: "",
        content: "",
        image: "",
        departmentName: "",
        eventDetails: {
          location: "",
          start_date: "",
          end_date: "",
        }
      });

      setEventStats((prev) => ({
        ...prev, 
        totalEvents: prev?.totalEvents + 1,
      }));
      toast("Event cretaed succesfully")
    } catch (error) {
      toast("Something went wrong");
    }finally{
      setIsCreateDialogOpen(false);
      setLoading(false);
    }
  };

  const getDepartmentsStats = async() => {
    const respones:any = await apiClient.eventStats();
    setEventStats(respones?.data);
  }

  const getEvents = async() => {
    setLoading2(true);
    const response:any = await apiClient.getEvents();
    setEvents(response?.data);
    setLoading2(false);
  }

  useEffect(() => {
    getEvents();
    getDepartmentsStats();
  }, [])

  const filteredEvents: AdminEvent[] = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
      // event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    // const matchesStatus = statusFilter === "all" || event.status === statusFilter
    // const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
    return matchesSearch
  })


  const approvedEvents = events.filter((e) => e.status === "approved").length
  const pendingEvents = events.filter((e) => e.status === "pending").length

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} editEvent={editEvent} setEditEvent={setEditEvent}  handleSaveEvent={handleSaveEvent} loading={loading} />

      {/* Stats Cards */}
      <StatsCards eventStats={eventStats} approvedEvents={approvedEvents} pendingEvents={pendingEvents} />

      {/* Filters and Search */}
      <FiltersAndSearches loading2={loading2} filteredEvents={filteredEvents} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} setEvents={setEvents} events={events} />
    </div>
  )
}