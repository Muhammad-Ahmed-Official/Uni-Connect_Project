"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
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
  Plus,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  ArrowLeft,
  Pin,
  Clock,
  Filter,
  Send,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Users, label: "Departments", href: "/departments", active: true },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: MessageSquare, label: "Advisors", href: "/advisors" },
  { icon: FileText, label: "Past Papers", href: "/past-papers" },
  { icon: BookOpen, label: "Docs", href: "/docs" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const departmentData = {
  "computer-science": {
    name: "Computer Science",
    description: "Programming, algorithms, software engineering, and AI discussions",
    memberCount: 1247,
    color: "bg-blue-100 text-blue-700",
    icon: "💻",
  },
  engineering: {
    name: "Engineering",
    description: "Mechanical, electrical, civil, and chemical engineering topics",
    memberCount: 892,
    color: "bg-orange-100 text-orange-700",
    icon: "⚙️",
  },
  business: {
    name: "Business Administration",
    description: "Management, finance, marketing, and entrepreneurship discussions",
    memberCount: 756,
    color: "bg-green-100 text-green-700",
    icon: "📊",
  },
}

const forumPosts = [
  {
    id: 1,
    title: "Help with Data Structures Assignment - Binary Trees",
    content:
      "I'm struggling with implementing a balanced binary search tree for my assignment. The insertion method seems to work fine, but I'm having issues with the deletion logic. Has anyone worked on similar problems?",
    author: {
      name: "Alex Johnson",
      avatar: "/student-avatar.png",
      department: "Computer Science",
      year: "3rd Year",
    },
    timestamp: "2 hours ago",
    likes: 12,
    replies: 8,
    tags: ["Data Structures", "Assignment", "Binary Trees"],
    isPinned: false,
    isLiked: false,
  },
  {
    id: 2,
    title: "Study Group for Machine Learning Course",
    content:
      "Looking to form a study group for the ML course this semester. We can meet weekly to discuss concepts, work through problem sets, and prepare for exams together. Anyone interested?",
    author: {
      name: "Maria Garcia",
      avatar: "/student-avatar.png",
      department: "Computer Science",
      year: "4th Year",
    },
    timestamp: "4 hours ago",
    likes: 24,
    replies: 15,
    tags: ["Study Group", "Machine Learning", "Collaboration"],
    isPinned: true,
    isLiked: true,
  },
  {
    id: 3,
    title: "Internship Opportunities at Tech Companies",
    content:
      "I wanted to share some internship opportunities I found at various tech companies. Google, Microsoft, and several startups are currently accepting applications. Happy to share more details if anyone is interested!",
    author: {
      name: "David Kim",
      avatar: "/student-avatar.png",
      department: "Computer Science",
      year: "2nd Year",
    },
    timestamp: "6 hours ago",
    likes: 31,
    replies: 22,
    tags: ["Internships", "Career", "Tech Companies"],
    isPinned: false,
    isLiked: false,
  },
  {
    id: 4,
    title: "Web Development Project Partners Needed",
    content:
      "Working on a full-stack web application for my capstone project. Looking for 2-3 partners who are interested in React, Node.js, and database design. This could be a great portfolio piece!",
    author: {
      name: "Sarah Chen",
      avatar: "/student-avatar.png",
      department: "Computer Science",
      year: "4th Year",
    },
    timestamp: "1 day ago",
    likes: 18,
    replies: 12,
    tags: ["Web Development", "Project", "React", "Node.js"],
    isPinned: false,
    isLiked: true,
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

export default function DepartmentForumPage() {
  const params = useParams()
  const departmentId = params.id as string
  const department = departmentData[departmentId as keyof typeof departmentData]

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostTags, setNewPostTags] = useState("")
  const [posts, setPosts] = useState(forumPosts)

  if (!department) {
    return <div>Department not found</div>
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    switch (sortBy) {
      case "recent":
        return b.id - a.id
      case "popular":
        return b.likes - a.likes
      case "replies":
        return b.replies - a.replies
      default:
        return 0
    }
  })

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
      content: newPostContent,
      author: {
        name: "Sarah Chen",
        avatar: "/student-avatar.png",
        department: department.name,
        year: "3rd Year",
      },
      timestamp: "Just now",
      likes: 0,
      replies: 0,
      tags: newPostTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isPinned: false,
      isLiked: false,
    }

    setPosts([newPost, ...posts])
    setNewPostTitle("")
    setNewPostContent("")
    setNewPostTags("")
  }

  const handleLikePost = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Department Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 rounded-xl ${department.color} flex items-center justify-center text-3xl`}>
            {department.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{department.name}</h1>
            <p className="text-gray-600">{department.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{department.memberCount.toLocaleString()} members</span>
              </span>
              <span className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{sortedPosts.length} discussions</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Share your thoughts, ask questions, or start a discussion with the {department.name} community.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Enter post title..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Write your post content..."
                    rows={6}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    placeholder="e.g., Programming, Assignment, Help"
                    value={newPostTags}
                    onChange={(e) => setNewPostTags(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Sort: {sortBy === "recent" ? "Recent" : sortBy === "popular" ? "Popular" : "Most Replies"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("recent")}>Most Recent</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("popular")}>Most Popular</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("replies")}>Most Replies</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-sm text-gray-500">{sortedPosts.length} posts found</div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {post.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                    <h3 className="font-semibold text-lg text-gray-900">{post.title}</h3>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <span className="font-medium">{post.author.name}</span>
                    <span>•</span>
                    <span>{post.author.year}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.timestamp}</span>
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center space-x-1 ${post.isLiked ? "text-red-600" : "text-gray-500"
                          }`}
                      >
                        <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                        <span>{post.likes}</span>
                      </Button>

                      <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.replies}</span>
                      </Button>

                      <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Save Post</DropdownMenuItem>
                        <DropdownMenuItem>Report</DropdownMenuItem>
                        <DropdownMenuItem>Hide</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4">Be the first to start a discussion in this department!</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      )}
    </div>
  )
}
