"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  MessageSquareMore,
  FileText,
  Calendar,
  Users,
  BarChart3,
  MessageCircle,
  Search,
  Menu,
  LogOut,
  User,
  Settings,
  Bell,
  GraduationCap,
} from "lucide-react"
import { Suspense } from "react"
import { signOut } from "next-auth/react"

const navigation = [
  { name: "Dashboard", href: "/advisor", icon: LayoutDashboard },
  { name: "Escalation Handling", href: "/advisor/escalations", icon: MessageSquareMore },
  { name: "Document Management", href: "/advisor/documents", icon: FileText },
  { name: "Event Management", href: "/advisor/events", icon: Calendar },
  { name: "Student Management", href: "/advisor/students", icon: Users },
  { name: "Reports", href: "/advisor/reports", icon: BarChart3 },
  { name: "Communication", href: "/advisor/communication", icon: MessageCircle },
]

export default function AdvisorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    signOut()
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Advisor Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? "bg-green-100 text-green-700" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive 
                    ? "text-green-700" 
                    : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Advisor Info */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Dr. Ahmed Khan</p>
            <p className="text-xs text-gray-500 truncate">Computer Science Dept.</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={null}>
      <div className="h-screen flex bg-gray-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="lg:pl-64 flex flex-col flex-1 min-h-0 w-full">
          {/* Top Header */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="default"
                  className="lg:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 h-full cursor-pointer"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
            </Sheet>

            <div className="flex-1 px-4 flex justify-between items-center">
              {/* Search */}
              <div className="flex-1 flex">
                <div className="w-full flex md:ml-0">
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <Search className="h-5 w-5" />
                    </div>
                    <input
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search students, escalations, documents..."
                      type="search"
                    />
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="ml-4 flex items-center md:ml-6 space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative cursor-pointer">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    3
                  </Badge>
                </Button>

                {/* Profile dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Dr. Ahmed Khan</p>
                        <p className="text-xs leading-none text-muted-foreground">advisor@university.edu</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 relative focus:outline-none">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}
