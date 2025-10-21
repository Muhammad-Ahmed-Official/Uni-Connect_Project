import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pin, Clock, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { ForumPost } from "@/app/dashboard/departments/[id]/page"

interface PostCardProps {
    post: ForumPost
    onLike: (postId: number) => void
}

export const PostCard = ({ post, onLike }: PostCardProps) => {
    return (
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
                                    onClick={() => onLike(post.id)}
                                    className={`flex items-center space-x-1 ${post.isLiked ? "text-red-600" : "text-gray-500"}`}
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
    )
}

export const PostCardSkeleton = () => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse" />
                        </div>
                        <div className="flex gap-2">
                            <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                            <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
                                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
                            </div>
                            <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}