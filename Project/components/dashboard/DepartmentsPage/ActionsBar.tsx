import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"
import { CreatePostDialog } from "./CreatePostDialog"

interface ActionsBarProps {
    departmentName: string
    postCount: number
    sortBy: string
    onSortChange: (sort: string) => void
    onCreatePost: (title: string, content: string, tags: string) => void
    searchQuery: string
    onSearchChange: (query: string) => void
}

export const ActionsBar = ({ departmentName, postCount, sortBy, onSortChange, onCreatePost, searchQuery,  }: ActionsBarProps) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
                <CreatePostDialog departmentName={departmentName} onCreatePost={onCreatePost} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Sort: {sortBy === "recent" ? "Recent" : sortBy === "popular" ? "Popular" : "Most Replies"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onSortChange("recent")}>Most Recent</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSortChange("popular")}>Most Popular</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSortChange("replies")}>Most Replies</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="text-sm text-gray-500">{postCount} posts found</div>
        </div>
    )
}

export const ActionsBarSkeleton = () => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
                <div className="h-9 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="h-9 bg-gray-200 rounded w-40 animate-pulse" />
            </div>
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
    )
}