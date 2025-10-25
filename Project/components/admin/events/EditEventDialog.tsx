import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EventFormValues } from './EventTable'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader } from 'lucide-react'
import { useState } from 'react'

interface EditEventDialogProps {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    editForm: EventFormValues
    setEditForm: React.Dispatch<React.SetStateAction<EventFormValues>>
    handleSaveEvent: () => void
    loading: boolean
}


const EditEventDialog = ({ isEditDialogOpen, setIsEditDialogOpen, editForm, setEditForm, handleSaveEvent, loading }: EditEventDialogProps) => {
    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogDescription>Update event details and settings</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">Event Title</Label>
                            <Input id="edit-title"
                                value={editForm.title}
                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label className='mb-2' htmlFor="new-name">Department Name</Label>
                            <Select
                                value={editForm?.departmentName}
                                onValueChange={(value) =>
                                    setEditForm({ ...editForm, departmentName: value })
                                }>
                                <SelectTrigger
                                    id="department-select"
                                    className="w-full cursor-pointer border-gray-300 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all"
                                >
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>

                                <SelectContent className="rounded-lg shadow-lg border border-gray-200">
                                    <SelectItem value="Computer Science" className="cursor-pointer hover:bg-blue-100 transition-colors">Computer Science
                                    </SelectItem>
                                    <SelectItem
                                        value="Political Science"
                                        className="cursor-pointer hover:bg-blue-100 transition-colors">
                                        Political Science
                                    </SelectItem>
                                    <SelectItem
                                        value="Mass Communication"
                                        className="cursor-pointer hover:bg-blue-100 transition-colors">
                                        Mass Communication
                                    </SelectItem>
                                    <SelectItem
                                        value="LAW"
                                        className="cursor-pointer hover:bg-blue-100 transition-colors">
                                        Law
                                    </SelectItem>
                                    <SelectItem
                                        value="Pharmacy"
                                        className="cursor-pointer hover:bg-blue-100 transition-colors">
                                        Pharmacy
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                            id="edit-description"
                            value={editForm?.content}
                            onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <Label htmlFor="edit-start_date">Date</Label>
                            <Input
                                id="edit-start_date"
                                type="date"
                                value={editForm?.eventDetails?.start_date ? editForm?.eventDetails?.start_date.split("T")[0] : ""}
                                onChange={(e) => setEditForm({ ...editForm, eventDetails: { ...editForm.eventDetails, start_date: e.target.value } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-start_date">Time</Label>
                            <Input
                                id="edit-start_date"
                                type="date"
                                value={editForm?.eventDetails.end_date ? editForm?.eventDetails?.end_date.split("T")[0] : ""}
                                onChange={(e) => setEditForm({ ...editForm, eventDetails: { ...editForm?.eventDetails, end_date: e.target.value } })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-location">Location</Label>
                        <Input
                            id="edit-location"
                            value={editForm?.eventDetails?.location}
                            onChange={(e) => setEditForm({ ...editForm, eventDetails: { ...editForm?.eventDetails, location: e.target.value } })}
                        />
                    </div>
                    {/* <div className="space-y-2">
                        <Label htmlFor="edit-tags">Tags</Label>
                        <Input
                            id="edit-tags"
                            value={editPostTags}
                            onChange={(e) => setEditPostTags(e.target.value)}
                        />
                    </div> */}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveEvent}
                    >
                        {loading ? <span className='flex items-center gap-2'><Loader className='animate-spin' /> updating...</span> : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditEventDialog