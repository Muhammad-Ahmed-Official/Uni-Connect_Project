import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DepartmentFormValues } from "@/app/admin/departments/page"

interface EditDeparmentDialogProps {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: (open: boolean) => void
    editForm: DepartmentFormValues
    setEditForm: React.Dispatch<React.SetStateAction<DepartmentFormValues>>
    handleSaveDepartment: () => void
}

const EditDeparmentDialog = ({ isEditDialogOpen, setIsEditDialogOpen, editForm, setEditForm, handleSaveDepartment }: EditDeparmentDialogProps) => {
    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Department</DialogTitle>
                    <DialogDescription>Update department information and settings</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2" htmlFor="name">Department Name</Label>
                            <Input
                                id="name"
                                value={editForm.departmentName}
                                onChange={(e) => setEditForm({ ...editForm, departmentName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="mb-2" htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={editForm.departmentBio}
                            onChange={(e) => setEditForm({ ...editForm, departmentBio: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2" htmlFor="head">Department Head</Label>
                            <Input
                                id="head"
                                value={editForm.departmentChairman}
                                onChange={(e) => setEditForm({ ...editForm, departmentChairman: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2" htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={editForm.deaprtmentchairmanEmail}
                                onChange={(e) => setEditForm({ ...editForm, deaprtmentchairmanEmail: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button className="cursor-pointer" onClick={handleSaveDepartment}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditDeparmentDialog