"use client";

import { useState } from "react";
import Header from "@/components/dashboard/common/Header";
import EventsHeader from "@/components/dashboard/EventsPage/EventsHeader";
import EventsContent from "@/components/dashboard/EventsPage/EventsContent";
import EventDialog from "@/components/dashboard/EventsPage/EventDialog";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  organizer: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  isRSVPed: boolean;
  tags: string[];
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Tech Talk: AI in Healthcare",
    description:
      "Join us for an insightful discussion on how artificial intelligence is revolutionizing healthcare. Our guest speaker, Dr. Sarah Johnson from Stanford Medical Center, will share her research on AI-powered diagnostic tools and their impact on patient care.",
    date: "2024-01-15",
    time: "15:00",
    endTime: "17:00",
    location: "Main Auditorium, Building A",
    organizer: "Computer Science Department",
    category: "Department",
    attendees: 156,
    maxAttendees: 200,
    isRSVPed: false,
    tags: ["AI", "Healthcare", "Tech Talk"],
    image: "/tech-conference.png",
  },
  {
    id: 2,
    title: "University Career Fair 2024",
    description:
      "Meet with top employers from various industries including tech, finance, healthcare, and more. Bring your resume and dress professionally. This is a great opportunity to network and explore internship and full-time opportunities.",
    date: "2024-01-18",
    time: "10:00",
    endTime: "16:00",
    location: "Student Center, Main Hall",
    organizer: "Career Services",
    category: "University",
    attendees: 892,
    maxAttendees: 1000,
    isRSVPed: true,
    tags: ["Career", "Networking", "Jobs"],
    image: "/career-fair.png",
  },
  {
    id: 3,
    title: "Engineering Design Competition",
    description:
      "Annual engineering design competition where teams compete to solve real-world engineering challenges. Open to all engineering students. Prizes include cash awards and internship opportunities with sponsor companies.",
    date: "2024-01-20",
    time: "09:00",
    endTime: "18:00",
    location: "Engineering Building, Lab Complex",
    organizer: "Engineering Student Society",
    category: "Club",
    attendees: 67,
    maxAttendees: 100,
    isRSVPed: false,
    tags: ["Engineering", "Competition", "Design"],
    image: "/engineering-competition.png",
  },
  {
    id: 4,
    title: "Study Abroad Information Session",
    description:
      "Learn about study abroad opportunities available for next semester. Representatives from partner universities will be present to answer questions about programs, applications, and scholarships.",
    date: "2024-01-22",
    time: "14:00",
    endTime: "15:30",
    location: "International Office, Room 205",
    organizer: "International Programs",
    category: "University",
    attendees: 43,
    maxAttendees: 80,
    isRSVPed: true,
    tags: ["Study Abroad", "International", "Information"],
    image: "/study-abroad-students.png",
  },
  {
    id: 5,
    title: "Business Plan Competition Finals",
    description:
      "Watch the final presentations of our annual business plan competition. Student entrepreneurs will pitch their innovative business ideas to a panel of industry experts and investors.",
    date: "2024-01-25",
    time: "13:00",
    endTime: "17:00",
    location: "Business School Auditorium",
    organizer: "Entrepreneurship Club",
    category: "Club",
    attendees: 234,
    maxAttendees: 300,
    isRSVPed: false,
    tags: ["Business", "Entrepreneurship", "Competition"],
    image: "/business-presentation.png",
  },
  {
    id: 6,
    title: "Mental Health Awareness Workshop",
    description:
      "A comprehensive workshop on mental health awareness, stress management, and available campus resources. Led by licensed counselors from the Student Wellness Center.",
    date: "2024-01-28",
    time: "11:00",
    endTime: "13:00",
    location: "Student Wellness Center",
    organizer: "Student Health Services",
    category: "University",
    attendees: 89,
    maxAttendees: 150,
    isRSVPed: true,
    tags: ["Mental Health", "Wellness", "Workshop"],
    image: "/wellness-workshop.png",
  },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventList, setEventList] = useState<Event[]>(events);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");

  const filteredEvents = eventList.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = filteredEvents.filter((event) => {
    const eventDate = new Date(event.date + "T" + event.time);
    return eventDate > new Date();
  });

  const handleRSVP = (eventId: number) => {
    setEventList(
      eventList.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            isRSVPed: !event.isRSVPed,
            attendees: event.isRSVPed ? event.attendees - 1 : event.attendees + 1,
          };
        }
        return event;
      }),
    );
  };

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
        eventsCount={upcomingEvents.length}
      />

      {/* Content */}
      <EventsContent
        viewMode={viewMode}
        events={upcomingEvents}
        onEventClick={setSelectedEvent}
        onRSVP={handleRSVP}
      />

      {/* Event Detail Modal for Calendar View */}
      <EventDialog
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
        onRSVP={handleRSVP}
      />
    </div>
  );
}