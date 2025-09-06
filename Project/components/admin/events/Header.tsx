import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import FileInput from '@/components/ui/FileInput'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { Plus } from 'lucide-react'
import React from 'react'

interface HeaderProps {
    isCreateDialogOpen: boolean
    setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ isCreateDialogOpen, setIsCreateDialogOpen }: HeaderProps) => {
    const handleFileUpload = (files: File[]) => {
        console.log('Files uploaded:', files);
        // Handle the upload logic here
    };

    return (
        <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
                <p className="text-gray-600">Manage university events, approvals, and analytics</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Event
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Create New Event</DialogTitle>
                        <DialogDescription>Add a new event to the university calendar</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Event Title</Label>
                                <Input id="title" placeholder="Enter event title" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="university-wide">University-wide</SelectItem>
                                        <SelectItem value="department">Department</SelectItem>
                                        <SelectItem value="club">Club</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Enter event description" rows={3} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input id="time" type="time" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="capacity">Capacity</Label>
                                <Input id="capacity" type="number" placeholder="Max attendees" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="Enter event location" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Image">Image</Label>
                            <FileInput onUpload={handleFileUpload} />
                            {/* <Input id="location" placeholder="Enter event location" /> */}
                        </div>
                    </div>
                    <DialogFooter >
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setIsCreateDialogOpen(false)
                                toast({
                                    title: "Event Created",
                                    description: "New event has been created and is pending approval.",
                                })
                            }}
                        >
                            Create Event
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Header