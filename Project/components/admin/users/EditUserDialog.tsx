import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface EditUserDialogProps {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedUser: any
}

const EditUserDialog = ({ isEditDialogOpen, setIsEditDialogOpen, selectedUser }: EditUserDialogProps) => {
    const { toast } = useToast()

    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>Update user information and settings</DialogDescription>
                </DialogHeader>
                {selectedUser && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue={selectedUser.name} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue={selectedUser.email} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <Select defaultValue={selectedUser.role}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="advisor">Advisor</SelectItem>
                                        <SelectItem value="admin">Administrator</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="department">Department</Label>
                                <Select defaultValue={selectedUser.department}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                                        <SelectItem value="Engineering">Engineering</SelectItem>
                                        <SelectItem value="Business Administration">Business Administration</SelectItem>
                                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                                        <SelectItem value="Psychology">Psychology</SelectItem>
                                        <SelectItem value="Biology">Biology</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="status">Account Status</Label>
                            <Select defaultValue={selectedUser.status}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setIsEditDialogOpen(false)
                            toast({
                                title: "User Updated",
                                description: "User information has been successfully updated.",
                            })
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditUserDialog