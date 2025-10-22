import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {  Shield, UserCheck, Users} from 'lucide-react'
import React, { useState } from 'react'
import ViewUserDialog from './ViewUserDialog'
import { useToast } from '@/hooks/use-toast'
import Pagination from './Pagination'
import EditUserDialog from './EditUserDialog'
import DeleteUserDialog from './DeleteUserDialog'
import UserTableRow from './UserTableRow'

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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<User | null>(null)
    const { toast } = useToast()

    const usersPerPage = 10

    // Filter users based on search and filters
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.department?.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <UserTableRow
                                key={user.id}
                                user={user}
                                isDropdownOpen={isDropdownOpen}
                                roleColors={roleColors}
                                statusColors={statusColors}
                                setIsDropdownOpen={setIsDropdownOpen}
                                handleViewUser={handleViewUser}
                                handleEditUser={handleEditUser}
                                // handleSuspendUser={handleSuspendUser}
                                setUserToDelete={setUserToDelete}
                                setDeleteDialogOpen={setDeleteDialogOpen}
                            />
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

            {/* Delete Dialog */}
            <DeleteUserDialog isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}
                onConfirm={() => {
                    if (userToDelete) {
                        handleDeleteUser(userToDelete.id)
                    }
                    setDeleteDialogOpen(false)
                }}
            />
        </div>
    )
}

export default UsersTable