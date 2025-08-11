"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  User,
  LogOut,
  Clock,
  Filter,
} from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Users, label: "Departments", href: "/departments", active: true },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: MessageSquare, label: "Advisors", href: "/advisors" },
  { icon: FileText, label: "Past Papers", href: "/past-papers" },
  { icon: BookOpen, label: "Docs", href: "/docs" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const departments = [
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
                  placeholder="Search departments..."
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
                  <DropdownMenuItem>New post in Computer Science</DropdownMenuItem>
                  <DropdownMenuItem>Reply to your Engineering question</DropdownMenuItem>
                  <DropdownMenuItem>Business forum trending discussion</DropdownMenuItem>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Department Forums</h1>
              <p className="text-gray-600">Connect with students in your department and across the university</p>
            </div>

            {/* Filters and Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Sort by: {sortBy === "members" ? "Members" : sortBy === "activity" ? "Activity" : "Name"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("members")}>Most Members</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("activity")}>Most Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("name")}>Alphabetical</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-sm text-gray-500">{sortedDepartments.length} departments found</div>
            </div>

            {/* Department Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDepartments.map((department) => (
                <Link key={department.id} href={`/departments/${department.id}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-lg ${department.color} flex items-center justify-center text-2xl`}
                        >
                          {department.icon}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {department.activeDiscussions} active
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-semibold">{department.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-2">
                        {department.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {department.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {department.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{department.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{department.memberCount.toLocaleString()} members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{department.recentActivity}</span>
                          </div>
                        </div>

                        {/* Activity Indicator */}
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min((department.activeDiscussions / 35) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">Activity</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {sortedDepartments.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
