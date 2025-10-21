"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DepartmentHeader, DepartmentHeaderSkeleton } from "@/components/dashboard/DepartmentsPage/DepartmentHeader"
import { ActionsBar, ActionsBarSkeleton } from "@/components/dashboard/DepartmentsPage/ActionsBar"
import { PostCard, PostCardSkeleton } from "@/components/dashboard/DepartmentsPage/PostCard"
import { EmptyState } from "@/components/dashboard/DepartmentsPage/EmptyState"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"

export interface Author {
  name: string
  avatar: string
  department: string
  // year: string
}

export interface ForumPost {
  id: number
  title: string
  content: string
  author: Author
  timestamp: string
  likes: number
  replies: number
  tags: string[]
  isPinned: boolean
  isLiked: boolean
}

export interface Department {
  departmentName: string
  departmentBio: string
  followers_count: number
  deaprtmentchairmanEmail: string
  departmentChairman: string
  departmentTags: string[]
  established: string
}

// Mock data - replace with actual API calls
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

const mockForumPosts: ForumPost[] = [
  {
    id: 1,
    title: "Help with Data Structures Assignment - Binary Trees",
    content:
      "I'm struggling with implementing a balanced binary search tree for my assignment. The insertion method seems to work fine, but I'm having issues with the deletion logic. Has anyone worked on similar problems?",
    author: {
      name: "Alex Johnson",
      avatar: "/student-avatar.png",
      department: "Computer Science",
      // year: "3rd Year",
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
      // year: "4th Year",
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
      // year: "2nd Year",
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
      // year: "4th Year",
    },
    timestamp: "1 day ago",
    likes: 18,
    replies: 12,
    tags: ["Web Development", "Project", "React", "Node.js"],
    isPinned: false,
    isLiked: true,
  },

]

export default function DepartmentForumPage() {
  const params = useParams()
  const departmentId = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [department, setDepartment] = useState<Department | null>(null)
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const { toast } = useToast();
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get("/api/Departments/get-department", {
          params: { departmentId },
        })
        setDepartment(res.data.data.department || null)
        setPosts(mockForumPosts)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load department data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [departmentId])

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

  const handleCreatePost = (title: string, content: string, tags: string) => {
    const newPost = {
      title,
      content,
      author: {
        name: user?.firstName + " " + user?.lastName,
        avatar: user?.profilePic,
        department: department?.departmentName || "",
      },
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    }

    console.log("New Post Created:", newPost);
    // setPosts([newPost, ...posts])
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

  if (!department && !isLoading) {
    return <div className="p-6 text-center">Department not found</div>
  }

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Department Header */}
      {isLoading ? (
        <DepartmentHeaderSkeleton />
      ) : department ? (
        <DepartmentHeader department={department} postCount={sortedPosts.length} />
      ) : null}

      {/* Actions Bar */}
      {isLoading ? (
        <ActionsBarSkeleton />
      ) : department ? (
        <ActionsBar
          departmentName={department.departmentName}
          postCount={sortedPosts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onCreatePost={handleCreatePost}
        />
      ) : null}

      {/* Forum Posts */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      ) : sortedPosts.length > 0 ? (
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} onLike={handleLikePost} />
          ))}
        </div>
      ) : department ? (
        <EmptyState departmentName={department.departmentName} onCreatePost={handleCreatePost} />
      ) : null}
    </div>
  )
}