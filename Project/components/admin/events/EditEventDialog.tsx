import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { EventFormValues } from './EventTable'

interface EditEventDialogProps {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    editForm: EventFormValues
    setEditForm: React.Dispatch<React.SetStateAction<EventFormValues>>
    handleSaveEvent: () => void
}

const EditEventDialog = ({ isEditDialogOpen, setIsEditDialogOpen, editForm, setEditForm, handleSaveEvent }: EditEventDialogProps) => {
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
                        <div className="space-y-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Select
                                value={editForm.category}
                                onValueChange={(value) => setEditForm({ ...editForm, category: value })}
                            >
                                <SelectTrigger className='w-full'>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="University-wide">University-wide</SelectItem>
                                    <SelectItem value="Department">Department</SelectItem>
                                    <SelectItem value="Club">Club</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                            id="edit-description"
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-date">Date</Label>
                            <Input
                                id="edit-date"
                                type="date"
                                value={editForm.date}
                                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-time">Time</Label>
                            <Input
                                id="edit-time"
                                type="time"
                                value={editForm.time}
                                onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-capacity">Capacity</Label>
                            <Input
                                id="edit-capacity"
                                type="number"
                                value={editForm.capacity}
                                onChange={(e) => setEditForm({ ...editForm, capacity: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-location">Location</Label>
                        <Input
                            id="edit-location"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveEvent}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditEventDialog