"use client";

import { useEffect, useState } from "react";
import Header from "@/components/dashboard/common/Header";
import EventsHeader from "@/components/dashboard/EventsPage/EventsHeader";
import EventsContent from "@/components/dashboard/EventsPage/EventsContent";
import EventDialog from "@/components/dashboard/EventsPage/EventDialog";
import axios from "axios";

export interface Event {
  _id: number;
  title: string; 
  content: string;
  eventDetails: {
    start_date: string;
    end_date: string;
    location: string;
  }
  time?: string;
  endTime?: string;
  department_id : {
    _id: string
    departmentName: string
  }
  isRSVPed: boolean;
  tags: string[];
  image: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  createdAt: string;
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");
  const [fetchingEvents, setFetchingEvents] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setFetchingEvents(true);
        const response = await axios.get("/api/event/read");
        setEventList(response.data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setFetchingEvents(false);
      }
    }

    fetchEvents();
  }, [])

  const filteredEvents = eventList.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.department_id.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === "All" || event.department_id.departmentName === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header
        title="Upcoming Events"
        description="Discover and join events happening across campus"
      />

      {/* Filters and View Toggle */}
      <EventsHeader
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        eventsCount={filteredEvents.length}
      />

      {/* Content */}
      <EventsContent
        viewMode={viewMode}
        events={filteredEvents}
        onEventClick={setSelectedEvent}
        loading={fetchingEvents}
      />

      {/* Event Detail Modal for Calendar View */}
      <EventDialog
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      />
    </div>
  );
}