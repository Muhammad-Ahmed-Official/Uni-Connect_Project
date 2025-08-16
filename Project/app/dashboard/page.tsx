"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard", active: true },
  { icon: Users, label: "Departments", href: "/departments" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: MessageSquare, label: "Advisors", href: "/advisors" },
  { icon: FileText, label: "Past Papers", href: "/past-papers" },
  { icon: BookOpen, label: "Docs", href: "/docs" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const quickLinks = [
  {
    title: "Department Forums",
    description: "Connect with students in your department",
    icon: Users,
    href: "/departments",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Upcoming Events",
    description: "View and RSVP to university events",
    icon: Calendar,
    href: "/events",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Ask an Advisor",
    description: "Get guidance from academic advisors",
    icon: MessageSquare,
    href: "/advisors",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Past Papers",
    description: "Access previous exam papers",
    icon: FileText,
    href: "/past-papers",
    color: "bg-orange-100 text-orange-600",
  },
]

const recentActivity = [
  {
    type: "forum",
    title: "New post in Computer Science",
    description: "Help needed with Data Structures assignment",
    time: "2 hours ago",
    unread: true,
  },
  {
    type: "event",
    title: "Tech Talk: AI in Healthcare",
    description: "Tomorrow at 3:00 PM in Main Auditorium",
    time: "5 hours ago",
    unread: true,
  },
  {
    type: "advisor",
    title: "Response from Dr. Smith",
    description: "Your course selection query has been answered",
    time: "1 day ago",
    unread: false,
  },
  {
    type: "paper",
    title: "New past papers uploaded",
    description: "Database Systems - Fall 2023 papers available",
    time: "2 days ago",
    unread: false,
  },
]

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
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${item.active ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const session = useSession();
  const role = session?.data?.user?.role;

  if (!session) redirect("/login");
  if (role === "admin") redirect("/admin");
  
  const handleLogout = () => {
    signOut()
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
                  placeholder="Search departments, events, papers..."
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
                  <div className="max-h-64 overflow-y-auto">
                    {recentActivity.slice(0, 3).map((activity, index) => (
                      <DropdownMenuItem key={index} className="flex flex-col items-start p-3">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-sm">{activity.title}</span>
                          {activity.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{activity.description}</span>
                        <span className="text-xs text-gray-400 mt-1">{activity.time}</span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center text-blue-600">View all notifications</DropdownMenuItem>
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
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah! 👋</h1>
              <p className="text-gray-600">Here's what's happening in your university community today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+3 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Materials</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Papers available</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Advisor Responses</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Pending replies</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Links */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Jump to the most important features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quickLinks.map((link, index) => (
                        <Link key={index} href={link.href}>
                          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className={`w-10 h-10 rounded-lg ${link.color} flex items-center justify-center`}>
                              <link.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{link.title}</h3>
                              <p className="text-sm text-gray-500">{link.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {activity.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                            {!activity.unread && <div className="w-2 h-2 bg-gray-300 rounded-full mt-2" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                            <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-blue-600">
                      View all activity
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Featured Section */}
            <div className="mt-8">
              <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Join the Study Group Challenge!</h3>
                      <p className="text-blue-100 mb-4">
                        Form study groups with students from different departments and earn points for collaboration.
                      </p>
                      <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <Star className="w-12 h-12 text-yellow-300" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
