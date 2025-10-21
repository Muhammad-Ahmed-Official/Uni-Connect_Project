import { EventFormValues } from '@/app/admin/events/page'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import FileInput from '@/components/ui/FileInput'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { Loader, Loader2, Plus } from 'lucide-react'
import React from 'react'

interface HeaderProps {
    isCreateDialogOpen: boolean
    setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    editEvent: EventFormValues,
    setEditEvent: React.Dispatch<React.SetStateAction<EventFormValues>>
    handleSaveEvent: () => void
    loading: boolean,
}

const Header = ({ isCreateDialogOpen, setIsCreateDialogOpen, editEvent, setEditEvent, handleSaveEvent, loading }: HeaderProps) => {
    const handleFileUpload = (files: File | null) => {
        // if(files){
        //     setEditEvent({...editEvent, image: files})
        // }
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
                        <div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Event Title</Label>
                                <Input id="title" value={editEvent?.title} required onChange={(e) => setEditEvent({...editEvent, title: e?.target.value})} placeholder="Enter event title" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={editEvent?.content} required onChange={(e) => setEditEvent({...editEvent, content: e?.target.value})} placeholder="Enter event description" rows={3} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startdate">Start Date</Label>
                                <Input id="startdate" value={editEvent?.eventDetails?.start_date} required  type="date" 
                                    onChange={(e) => setEditEvent({...editEvent, eventDetails: {...editEvent?.eventDetails, start_date: e.target.value}})} 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="enddate">End Date</Label>
                                <Input id="enddate" value={editEvent?.eventDetails?.end_date} required type="date" 
                                    onChange={(e) => setEditEvent({...editEvent, eventDetails: {...editEvent?.eventDetails, end_date: e.target.value}})}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" value={editEvent?.eventDetails?.location} required
                            onChange={(e) => setEditEvent({...editEvent, eventDetails: { ...editEvent.eventDetails, location: e.target.value }})} 
                            placeholder="Enter event location" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Image">Image</Label>
                            <FileInput onFileSelect={handleFileUpload} />
                        </div>
                    </div>
                    <DialogFooter >
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEvent}>
                            {loading? <span className='flex items-center gap-2'> <Loader className='animate-spin' /> Creating ... </span>  : "Create Event"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Header