import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DepartmentFormValues } from '@/app/admin/departments/page'
import { apiClient } from '@/lib/api-client'
import { toast } from 'sonner'

interface AddDepartmentDialogProps {
    isAddDialogOpen: boolean
    setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    editForm: DepartmentFormValues
    setEditForm: React.Dispatch<React.SetStateAction<DepartmentFormValues>>
    handleSaveDepartment: () => void
}

const AddDepartmentDialog = ({ isAddDialogOpen, setIsAddDialogOpen, editForm, setEditForm, handleSaveDepartment }: AddDepartmentDialogProps) => {
    // const addDeprt = async () => {
    //     try {
    //         await apiClient.createDepartment();
    //     } catch (error) {
    //         toast.error("Failed to create department")
    //     }
    // }
    return (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Department</DialogTitle>
                    <DialogDescription>Create a new department with complete information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    {/* <div className="grid grid-cols-2 gap-4"> */}
                        <div>
                            <Label className='mb-2' htmlFor="new-name">Department Name</Label>
                            <Input
                                id="new-name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                placeholder="e.g., Computer Science"
                            />
                        </div>
                        {/* <div>
                            <Label className='mb-2' htmlFor="new-code">Department Code</Label>
                            <Input
                                id="new-code"
                                value={editForm.code}
                                onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                                placeholder="e.g., CS"
                            />
                        </div> */}
                    {/* </div> */}
                    <div>
                        <Label className='mb-2' htmlFor="new-description">Description</Label>
                        <Textarea
                            id="new-description"
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            placeholder="Brief description of the department"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className='mb-2' htmlFor="new-head">Department Chairman</Label>
                            <Input
                                id="new-head"
                                value={editForm.head}
                                onChange={(e) => setEditForm({ ...editForm, head: e.target.value })}
                                placeholder="e.g., Dr. John Smith"
                            />
                        </div>
                        <div>
                            <Label className='mb-2' htmlFor="new-email">Chairman Email</Label>
                            <Input
                                id="new-email"
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                placeholder="Dr. John Smith.edu"
                            />
                        </div>
                        {/* <div>
                            <Label className='mb-2' htmlFor="new-building">Building</Label>
                            <Input
                                id="new-building"
                                value={editForm.building}
                                onChange={(e) => setEditForm({ ...editForm, building: e.target.value })}
                                placeholder="e.g., Science Hall"
                            />
                        </div> */}
                    </div>
                    {/* <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className='mb-2' htmlFor="new-phone">Phone</Label>
                            <Input
                                id="new-phone"
                                value={editForm.phone}
                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div>
                            <Label className='mb-2' htmlFor="new-email">Email</Label>
                            <Input
                                id="new-email"
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                placeholder="department@university.edu"
                            />
                        </div>
                    </div> */}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button className='cursor-pointer' onClick={handleSaveDepartment}>Create Department</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddDepartmentDialog