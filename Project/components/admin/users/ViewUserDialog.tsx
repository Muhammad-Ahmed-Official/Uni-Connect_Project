import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import React from 'react'
import { getRoleIcon } from './UsersTable'

interface ViewUserDialogProps {
    isViewDialogOpen: boolean
    setIsViewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedUser: User | null
    roleColors: { [key: string]: string }
    statusColors: { [key: string]: string }
}

const ViewUserDialog = ({ isViewDialogOpen, setIsViewDialogOpen, selectedUser, roleColors, statusColors }: ViewUserDialogProps) => {
    return (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} >
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>Complete information about the selected user</DialogDescription>
                </DialogHeader>
                {selectedUser && (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-lg">
                                    {selectedUser.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                                <p className="text-gray-600">{selectedUser.email}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Badge className={`${roleColors[selectedUser.role]} border-0`}>
                                        {getRoleIcon(selectedUser.role)}
                                        <span className="ml-1 capitalize">{selectedUser.role}</span>
                                    </Badge>
                                    <Badge className={`${statusColors[selectedUser.status]} border-0`}>
                                        <span className="capitalize">{selectedUser.status}</span>
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Department</Label>
                                <p className="mt-1">{selectedUser.department}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Join Date</Label>
                                <p className="mt-1">{selectedUser.joinDate}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Last Active</Label>
                                <p className="mt-1">{selectedUser.lastActive}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">User ID</Label>
                                <p className="mt-1">#{selectedUser.id}</p>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog >
    )
}

export default ViewUserDialog