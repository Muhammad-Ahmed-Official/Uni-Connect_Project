import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Eye, MoreHorizontal, Shield, Trash2, UserCheck, Users, UserX } from 'lucide-react'
import React, { useState } from 'react'
import ViewUserDialog from './ViewUserDialog'
import { useToast } from '@/hooks/use-toast'
import Pagination from './Pagination'
import EditUserDialog from './EditUserDialog'



const roleColors: Record<string, string> = {
    student: "bg-blue-100 text-blue-700",
    advisor: "bg-green-100 text-green-700",
    admin: "bg-purple-100 text-purple-700",
}

const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
    inactive: "bg-gray-100 text-gray-700",
}

export const getRoleIcon = (role: string) => {
    switch (role) {
        case "student":
            return <Users className="h-4 w-4" />
        case "advisor":
            return <UserCheck className="h-4 w-4" />
        case "admin":
            return <Shield className="h-4 w-4" />
        default:
            return <Users className="h-4 w-4" />
    }
}

const UsersTable = ({ usersData }: { usersData: User[] }) => {
    const [searchTerm] = useState("")
    const [roleFilter] = useState("all")
    const [statusFilter] = useState("all")
    const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
    const [users, setUsers] = useState(usersData)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const { toast } = useToast()

    const usersPerPage = 10

    // Filter users based on search and filters
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.department.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === "all" || user.role === roleFilter
        const matchesStatus = statusFilter === "all" || user.status === statusFilter
        return matchesSearch && matchesRole && matchesStatus
    })

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
    const startIndex = (currentPage - 1) * usersPerPage
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

    const handleSuspendUser = (userId: number) => {
        setUsers(
            users.map((user) =>
                user.id === userId ? { ...user, status: user.status === "suspended" ? "active" : "suspended" } : user,
            ),
        )
        toast({
            title: "User Status Updated",
            description: "User status has been successfully updated.",
        })
    }

    const handleDeleteUser = (userId: number) => {
        setUsers(users.filter((user) => user.id !== userId))
        toast({
            title: "User Deleted",
            description: "User has been successfully deleted from the system.",
            variant: "destructive",
        })
    }

    const handleEditUser = (user: User) => {
        setSelectedUser(user)
        setIsEditDialogOpen(true)
    }

    const handleViewUser = (user: User) => {
        setSelectedUser(user)
        setIsViewDialogOpen(true)
    }

    return (
        <div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`${roleColors[user.role]} border-0`}>
                                        {getRoleIcon(user.role)}
                                        <span className="ml-1 capitalize">{user.role}</span>
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-600">{user.department}</TableCell>
                                <TableCell>
                                    <Badge className={`${statusColors[user.status]} border-0`}>
                                        {user.status === "active" ? "●" : user.status === "suspended" ? "⏸" : "○"}
                                        <span className="ml-1 capitalize">{user.status}</span>
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-600">{user.lastActive}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu
                                        open={isDropdownOpen === user.id}
                                        onOpenChange={(open) => setIsDropdownOpen(open ? user.id : null)}
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
                                                    handleEditUser(user);
                                                    setIsDropdownOpen(null);
                                                }}
                                            >
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit User
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    handleSuspendUser(user.id);
                                                    setIsDropdownOpen(null);
                                                }}
                                            >
                                                <UserX className="mr-2 h-4 w-4" />
                                                {user.status === "suspended" ? "Activate" : "Suspend"} User
                                            </DropdownMenuItem>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem
                                                        onSelect={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete User
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the user account and remove
                                                            all associated data.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                handleDeleteUser(user.id);
                                                                setIsDropdownOpen(null);
                                                            }}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <Pagination filteredUsers={filteredUsers} currentPage={currentPage} setCurrentPage={setCurrentPage} usersPerPage={usersPerPage} totalPages={totalPages} startIndex={startIndex} />

            {/* View User Dialog */}
            <ViewUserDialog isViewDialogOpen={isViewDialogOpen} setIsViewDialogOpen={setIsViewDialogOpen} selectedUser={selectedUser} roleColors={roleColors} statusColors={statusColors} />

            {/* Edit User Dialog */}
            <EditUserDialog isEditDialogOpen={isEditDialogOpen} setIsEditDialogOpen={setIsEditDialogOpen} selectedUser={selectedUser} />
        </div>
    )
}

export default UsersTable