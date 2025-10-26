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
import { Post } from "@/types/post"
import { format } from "timeago.js"
import { ComingSoonWrapper } from "@/components/shared/ComingSoonWrapper"

interface PostCardProps {
    post: Post
    onLike: (postId: number) => void
}

export const PostCard = ({ post, onLike }: PostCardProps) => {
    return (
        <Card key={post._id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                        {
                            post?.user_id?.profilePic ? (
                                <AvatarImage src={post.user_id?.profilePic} alt={post.user_id.firstName} />
                            ) : (
                                <AvatarImage src={"/student-avatar.png"} alt={post.user_id.firstName} />
                            )
                        }
                        <AvatarFallback>
                            {post.user_id?.firstName + " " + post.user_id?.lastName
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
                            <span className="font-medium">{post.user_id?.firstName + " " + post.user_id?.lastName}</span>
                            <span>{post.user_id?.year ?? ""}</span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{format(post.createdAt)}</span>
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
                                <ComingSoonWrapper>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        // onClick={() => onLike(post.)}
                                        // className={`flex items-center space-x-1 ${post. ? "text-red-600" : "text-gray-500"}`}
                                        className={`flex items-center space-x-1 text-gray-500`}
                                    >
                                        {/* <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} /> */}
                                        <Heart className={`h-4 w-4 fill-current`} />
                                        <span>{post.likes_count}</span>
                                    </Button>
                                </ComingSoonWrapper>
                                <ComingSoonWrapper>
                                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
                                        <MessageCircle className="h-4 w-4" />
                                        <span>{post.comment_count}</span>
                                    </Button>
                                </ComingSoonWrapper>
                                <ComingSoonWrapper>
                                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
                                        <Share2 className="h-4 w-4" />
                                        <span>Share</span>
                                    </Button>
                                </ComingSoonWrapper>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <ComingSoonWrapper>
                                            Save Post
                                        </ComingSoonWrapper>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ComingSoonWrapper>
                                            Report
                                        </ComingSoonWrapper>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ComingSoonWrapper>
                                            Hide
                                        </ComingSoonWrapper>
                                    </DropdownMenuItem>
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