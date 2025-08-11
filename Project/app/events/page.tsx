"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  BookOpen,
  Settings,
  Search,
  Bell,
  Menu,
  GraduationCap,
  User,
  LogOut,
  MapPin,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  CalendarDays,
  List,
} from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Users, label: "Departments", href: "/departments" },
  { icon: Calendar, label: "Events", href: "/events", active: true },
  { icon: MessageSquare, label: "Advisors", href: "/advisors" },
  { icon: FileText, label: "Past Papers", href: "/past-papers" },
  { icon: BookOpen, label: "Docs", href: "/docs" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const events = [
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
]

const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

function Sidebar({ className }: { className?: string }) {
  return (
    <div className={`pb-12 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Uni-Connect</span>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  item.active ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CalendarView({ events, onEventClick }: { events: any[]; onEventClick: (event: any) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter((event) => event.date === dateStr)
  }

  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction
    let newYear = currentYear

    if (newMonth > 11) {
      newMonth = 0
      newYear++
    } else if (newMonth < 0) {
      newMonth = 11
      newYear--
    }

    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div key={index} className="bg-white min-h-[100px] p-2">
            {day && (
              <>
                <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                <div className="space-y-1">
                  {getEventsForDay(day).map((event) => (
                    <button
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className="w-full text-left p-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                    >
                      <div className="truncate font-medium">{event.title}</div>
                      <div className="truncate text-blue-600">{event.time}</div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function EventCard({ event, onRSVP }: { event: any; onRSVP: (eventId: number) => void }) {
  const eventDate = new Date(event.date + "T" + event.time)
  const isUpcoming = eventDate > new Date()

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant={
                event.category === "University" ? "default" : event.category === "Department" ? "secondary" : "outline"
              }
            >
              {event.category}
            </Badge>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>
                {event.attendees}/{event.maxAttendees}
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-lg text-gray-900 mb-2">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>
                {event.time} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">by {event.organizer}</span>
            {isUpcoming && (
              <Button
                size="sm"
                variant={event.isRSVPed ? "outline" : "default"}
                onClick={() => onRSVP(event.id)}
                className={event.isRSVPed ? "text-green-600 border-green-600" : ""}
              >
                {event.isRSVPed ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    RSVP'd
                  </>
                ) : (
                  "RSVP"
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [eventList, setEventList] = useState(events)
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list")

  const filteredEvents = eventList.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "All" || event.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const upcomingEvents = filteredEvents.filter((event) => {
    const eventDate = new Date(event.date + "T" + event.time)
    return eventDate > new Date()
  })

  const handleRSVP = (eventId: number) => {
    setEventList(
      eventList.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            isRSVPed: !event.isRSVPed,
            attendees: event.isRSVPed ? event.attendees - 1 : event.attendees + 1,
          }
        }
        return event
      }),
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar className="w-full" />
                </SheetContent>
              </Sheet>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>New event: Tech Talk tomorrow</DropdownMenuItem>
                  <DropdownMenuItem>Reminder: Career Fair in 2 days</DropdownMenuItem>
                  <DropdownMenuItem>Event update: Location changed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/student-avatar.png" alt="Profile" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Sarah Chen</p>
                      <p className="text-xs leading-none text-muted-foreground">sarah.chen@university.edu</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">University Events</h1>
              <p className="text-gray-600">Discover and join events happening across campus</p>
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      {categoryFilter === "All" ? "All Categories" : categoryFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setCategoryFilter("All")}>All Categories</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryFilter("University")}>University-wide</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryFilter("Department")}>Department</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryFilter("Club")}>Club Events</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="text-sm text-gray-500">{upcomingEvents.length} upcoming events</div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={viewMode === "calendar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
              </div>
            </div>

            {/* Content */}
            {viewMode === "calendar" ? (
              <CalendarView events={filteredEvents} onEventClick={setSelectedEvent} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer">
                          <EventCard event={event} onRSVP={handleRSVP} />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{event.title}</DialogTitle>
                          <DialogDescription>Organized by {event.organizer}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <p className="text-gray-700 leading-relaxed">{event.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>
                                  {new Date(event.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span>
                                  {event.time} - {event.endTime}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span>
                                  {event.attendees}/{event.maxAttendees} attending
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline">Share Event</Button>
                            <Button
                              onClick={() => handleRSVP(event.id)}
                              className={event.isRSVPed ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                              {event.isRSVPed ? (
                                <>
                                  <Check className="h-4 w-4 mr-2" />
                                  RSVP'd
                                </>
                              ) : (
                                "RSVP Now"
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {upcomingEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Event Detail Modal for Calendar View */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
              <DialogDescription>Organized by {selectedEvent.organizer}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={selectedEvent.image || "/placeholder.svg"}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      {selectedEvent.time} - {selectedEvent.endTime}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>
                      {selectedEvent.attendees}/{selectedEvent.maxAttendees} attending
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Share Event</Button>
                <Button
                  onClick={() => handleRSVP(selectedEvent.id)}
                  className={selectedEvent.isRSVPed ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {selectedEvent.isRSVPed ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      RSVP'd
                    </>
                  ) : (
                    "RSVP Now"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
