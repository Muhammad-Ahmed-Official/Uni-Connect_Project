"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import PostForm from "@/components/university/PostForm"
// import { useUniversityPosts } from "@/hooks/useUniversity" to

export default function PostManagement() {
  // const { posts, createPost } = useUniversityPosts()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Post Management</h2>
        {/* <PostForm onSubmit={createPost}> */}
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        {/* </PostForm> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>University Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <DataTable
            columns={columns}
            data={posts}
            searchKey="title"
            filters={[
              { key: "status", label: "Status", options: ["Draft", "Published"] },
              { key: "category", label: "Category" }
            ]}
            todo
          /> */} 
        </CardContent>
      </Card>
    </div>
  )
}
