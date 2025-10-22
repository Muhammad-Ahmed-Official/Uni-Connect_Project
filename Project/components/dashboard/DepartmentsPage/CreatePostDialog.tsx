import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Send } from "lucide-react"
import { postSchema } from "@/schemas/post.schema"
import { useToast } from "@/hooks/use-toast"

interface CreatePostDialogProps {
    departmentName: string
    onCreatePost: (title: string, content: string, tags: string) => void
}

export const CreatePostDialog = ({ departmentName, onCreatePost }: CreatePostDialogProps) => {
    const [newPostTitle, setNewPostTitle] = useState("")
    const [newPostContent, setNewPostContent] = useState("")
    const [newPostTags, setNewPostTags] = useState("")
    const [open, setOpen] = useState(false)
    const { toast } = useToast();

    const handleCreatePost = async () => {
        const result = await postSchema.safeParseAsync({ title: newPostTitle, content: newPostContent, tags: newPostTags.split(",").map((tag) => tag.trim()).filter(Boolean) });
        if (!result.success) {
            const error = result.error.format();
            const firstError = Object.values(error).find((err: any) => err?._errors?.length);
            const errorMessage = firstError && Array.isArray((firstError as any)._errors)
                ? (firstError as any)._errors[0]
                : "Invalid request data";

            toast({
                title: "Error",
                description: errorMessage as string,
                variant: "destructive",
            });
        } else {
            onCreatePost(newPostTitle, newPostContent, newPostTags)
            setNewPostTitle("")
            setNewPostContent("")
            setNewPostTags("")
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>
                        Share your thoughts, ask questions, or start a discussion with the {departmentName} community.
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
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4 mr-2" />
                            Post
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}