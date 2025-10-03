"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Bell, BookOpen, Calendar, FileText, GraduationCap, Home, LogOut, Menu, MessageSquare, Search, Settings, User, Users } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React, { Suspense, useState } from 'react'

const sidebarItems = [
    { icon: Home, label: "Home", href: "/dashboard", active: true },
    { icon: Users, label: "Departments", href: "/dashboard/departments" },
    { icon: Calendar, label: "Events", href: "/dashboard/events" },
    { icon: MessageSquare, label: "Advisors", href: "/dashboard/advisors" },
    { icon: FileText, label: "Past Papers", href: "/dashboard/past-papers" },
    { icon: BookOpen, label: "Docs", href: "/dashboard/docs" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
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

const Userlayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname();
    const session = useSession();
    const role = session?.data?.user?.role;

    if (!session) redirect("/login");
    if (role === "admin") redirect("/admin");

    const handleLogout = () => {
        signOut()
    }

    const Sidebar = () => {
        return (
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center border-b px-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Uni-Connect</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className='flex-1 space-y-1 px-4 py-6'>
                    {sidebarItems.map((item) => {
                        const isActive = item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname === item.href || pathname.startsWith(item.href + "/")
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon
                                    className={`mr-3 h-5 w-5 ${isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"}`}
                                />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Admin Info */}
                <div className="border-t p-4">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                            <p className="text-xs text-gray-500 truncate">admin@university.edu</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Suspense fallback={null}>
            <div className="h-screen flex bg-gray-50">
                {/* Desktop Sidebar */}
                <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
                    <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto">
                        <Sidebar />
                    </div>
                </div>

                {/* Mobile Sidebar */}
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <SheetContent side="left" className="p-0 w-64">
                        <Sidebar />
                    </SheetContent>
                </Sheet>

                {/* Main Content */}
                <div className='lg:pl-64 flex flex-col flex-1 min-h-0 w-full'>
                    {/* Top Navigation */}
                    <header className="fixed left-0 right-0 lg:left-64 top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="default"
                                    className="lg:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 h-full cursor-pointer"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                        </Sheet>

                        <div className="px-4 flex justify-between items-center w-full">
                            {/* Search Bar */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Search departments, events, papers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full"
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Notifications */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="relative">
                                            <Bell className="h-5 w-5" />
                                            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
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

                    {/* Page Content */}
                    <main className="flex-1 relative focus:outline-none pt-16">{children}</main>
                </div>
            </div>
        </Suspense>
    )
}

export default Userlayout