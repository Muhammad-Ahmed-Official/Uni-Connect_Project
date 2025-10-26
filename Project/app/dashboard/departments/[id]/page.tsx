"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import { DepartmentHeader, DepartmentHeaderSkeleton } from "@/components/dashboard/DepartmentsPage/DepartmentHeader"
import { ActionsBar, ActionsBarSkeleton } from "@/components/dashboard/DepartmentsPage/ActionsBar"
import { PostCard, PostCardSkeleton } from "@/components/dashboard/DepartmentsPage/PostCard"
import { EmptyState } from "@/components/dashboard/DepartmentsPage/EmptyState"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { ApiErrorResponse } from "@/types/ApiErrorResponse"
import { Post } from "@/types/post"

export interface Department {
  departmentName: string
  departmentBio: string
  followers_count: number
  deaprtmentchairmanEmail: string
  departmentChairman: string
  departmentTags: string[]
  established: string
}

interface FormData {
  title: string
  content: string
  tags: string[]
  user_id: string | null
  department_id: string | null
}

export default function DepartmentForumPage() {
  const params = useParams()
  const departmentId = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [department, setDepartment] = useState<Department | null>(null)
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();
  const session = useSession();
  const user = session.data?.user;

  // useCallback se fetchData ko wrap karein
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await axios.get("/api/posts/read/get-dept-post", {
        params: { departmentId },
      });
      setDepartment(res.data.data.department || null)
      setPosts(res.data.data.posts || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load department data. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [departmentId, toast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
        return Number(b.createdAt) - Number(a.createdAt)
      case "popular":
        return b.likes_count - a.likes_count
      case "replies":
        return b.comment_count - a.comment_count
      default:
        return 0
    }
  })

  const handleCreatePost = async (title: string, content: string, tags: string) => {
    const newPost: FormData = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      user_id: user?.id ?? null,
      department_id: departmentId,
    }

    try {
      const res = await axios.post("/api/posts/create", newPost);
      toast({
        title: "Success",
        description: res.data.message || "Post created successfully",
        variant: "success",
      })

      fetchData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as ApiErrorResponse;
        toast({
          title: 'Registration failed',
          description: serverError?.message || "Failed to create post. Please try again later.",
          variant: 'destructive'
        })
      }
    }
  }

  const handleLikePost = async (postId: string) => {
    try {
      // Optimistic update
      setPosts(prev => prev.map(post =>
        post._id === postId
          ? {
            ...post,
            likes_count: post.likes_count + 1,
            // Add actual like logic here
          }
          : post
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like post",
        variant: "destructive",
      })
    }
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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
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
            <PostCard key={post._id} post={post} onLike={() => handleLikePost(post._id)} />
          ))}
        </div>
      ) : department ? (
        <EmptyState departmentName={department.departmentName} onCreatePost={handleCreatePost} />
      ) : null}
    </div>
  )
}