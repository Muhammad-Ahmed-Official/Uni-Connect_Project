import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DepartmentFormValues } from '@/app/admin/departments/page'
import { Loader } from 'lucide-react'

interface AddDepartmentDialogProps {
    isAddDialogOpen: boolean
    setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    editForm: DepartmentFormValues
    setEditForm: React.Dispatch<React.SetStateAction<DepartmentFormValues>>
    handleSaveDepartment: () => void
    loading: boolean,
}

const AddDepartmentDialog = ({ isAddDialogOpen, setIsAddDialogOpen, editForm, setEditForm, handleSaveDepartment, loading}: AddDepartmentDialogProps) => {
    return (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Department</DialogTitle>
                    <DialogDescription>Create a new department with complete information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className='mb-2' htmlFor="new-name">Department Name</Label>
                            <Input
                                id="new-name"
                                value={editForm.departmentName}
                                onChange={(e) => setEditForm({ ...editForm, departmentName: e.target.value })}
                                placeholder="e.g., Computer Science"
                            />
                        </div>
                        <div>
                            <Label className='mb-2' htmlFor="new-name">Established Year</Label>
                            <Input
                                id="new-name"
                                type='number'
                                value={editForm.established}
                                onChange={(e) => setEditForm({ ...editForm, established: e.target.value })}
                                placeholder="e.g., 1991"
                            />
                        </div>
                     </div>
                    <div>
                        <Label className='mb-2' htmlFor="new-description">Description</Label>
                        <Textarea
                            id="new-description"
                            value={editForm.departmentBio}
                            onChange={(e) => setEditForm({ ...editForm, departmentBio: e.target.value })}
                            placeholder="Brief description of the department"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className='mb-2' htmlFor="new-head">Department Chairman</Label>
                            <Input
                                id="new-head"
                                value={editForm.departmentChairman}
                                onChange={(e) => setEditForm({ ...editForm, departmentChairman: e.target.value })}
                                placeholder="e.g., Dr. John Smith"
                            />
                        </div>
                        <div>
                            <Label className='mb-2' htmlFor="new-email">Chairman Email</Label>
                            <Input
                                id="new-email"
                                type="email"
                                value={editForm.deaprtmentchairmanEmail}
                                onChange={(e) => setEditForm({ ...editForm, deaprtmentchairmanEmail: e.target.value })}
                                placeholder="Dr. John Smith.edu"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button className='cursor-pointer' onClick={handleSaveDepartment}>{loading ? <span> <Loader className='animate-spin' /> Processing </span> : "Create Department"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddDepartmentDialog