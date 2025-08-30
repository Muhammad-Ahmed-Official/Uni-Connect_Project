import { Advisor } from '@/app/admin/advisors/page'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import React from 'react'

const AssignDepartmentDialog = ({ isAssignDialogOpen, setIsAssignDialogOpen, selectedAdvisor, departments }: { isAssignDialogOpen: boolean, setIsAssignDialogOpen: React.Dispatch<React.SetStateAction<boolean>>, selectedAdvisor: Advisor | null, departments: string[] }) => {
    const { toast } = useToast()

    return (
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign Department</DialogTitle>
                    <DialogDescription>Change the department assignment for this advisor</DialogDescription>
                </DialogHeader>
                {selectedAdvisor && (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="advisor-name">Advisor</Label>
                            <Input id="advisor-name" value={selectedAdvisor.name} disabled />
                        </div>
                        <div>
                            <Label htmlFor="current-department">Current Department</Label>
                            <Input id="current-department" value={selectedAdvisor.department} disabled />
                        </div>
                        <div>
                            <Label htmlFor="new-department">New Department</Label>
                            <Select defaultValue={selectedAdvisor.department}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setIsAssignDialogOpen(false)
                            toast({
                                title: "Department Assigned",
                                description: "Advisor has been successfully assigned to the new department.",
                            })
                        }}
                    >
                        Assign Department
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AssignDepartmentDialog