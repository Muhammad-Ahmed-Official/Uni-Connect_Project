import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TableRow, TableCell } from '@/components/ui/table';
import React from 'react'
import { getRoleIcon } from './UsersTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreHorizontal, Trash2, UserX, } from 'lucide-react';

interface UserTableRowProps {
    user: User;
    roleColors: Record<string, string>
    statusColors: Record<string, string>
    isDropdownOpen: string | null
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<string | null>>;
    handleViewUser: (user: User) => void;
    handleEditUser: (user: User) => void;
    setUserToDelete: (user: User) => void
    setDeleteDialogOpen: (open: boolean) => void
}

const UserTableRow = ({ user, isDropdownOpen, roleColors, statusColors, setIsDropdownOpen, handleViewUser, handleEditUser, setUserToDelete, setDeleteDialogOpen }: UserTableRowProps) => {
    return (
        <TableRow key={user?._id}>
            <TableCell>
                <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profilePic || "/placeholder.svg"} />
                        <AvatarFallback>
                            {user?.firstName
                                .split(" ")
                                .map((n:any) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium text-gray-900">{user?.firstName}</div>
                        <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <Badge className={`${roleColors[user?.role]} border-0`}>
                    {getRoleIcon(user?.role)}
                    <span className="ml-1 capitalize">{user?.role}</span>
                </Badge>
            </TableCell>
            <TableCell className="text-gray-600">{user?.departmentName}</TableCell>
            <TableCell className="text-right">
                <DropdownMenu
                    open={isDropdownOpen === user?._id}
                    onOpenChange={(open) => setIsDropdownOpen(open ? user?._id : null)}
                >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                handleViewUser(user);
                                setIsDropdownOpen(null);
                            }}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setUserToDelete(user)
                                setDeleteDialogOpen(true)
                                setIsDropdownOpen(null)
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default UserTableRow