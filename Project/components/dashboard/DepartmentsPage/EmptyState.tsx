import { MessageSquare, Plus } from "lucide-react"
import { CreatePostDialog } from "./CreatePostDialog"

interface EmptyStateProps {
    departmentName: string
    onCreatePost: (title: string, content: string, tags: string) => void
}

export const EmptyState = ({ departmentName, onCreatePost }: EmptyStateProps) => {
    return (
        <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-500 mb-4">Be the first to start a discussion in this department!</p>
            <CreatePostDialog departmentName={departmentName} onCreatePost={onCreatePost} />
        </div>
    )
}