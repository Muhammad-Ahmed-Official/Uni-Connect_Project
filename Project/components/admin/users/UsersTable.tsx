import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {  Shield, UserCheck, Users} from 'lucide-react'
import React, { useState } from 'react'
import ViewUserDialog from './ViewUserDialog'
import { useToast } from '@/hooks/use-toast'
import Pagination from './Pagination'
import EditUserDialog from './EditUserDialog'
import DeleteUserDialog from './DeleteUserDialog'
import UserTableRow from './UserTableRow'
import { apiClient } from '@/lib/api-client'
import TableSkeleton from './Skelton'

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

const UsersTable = ({ usersData, setUsers, loading2 }: any) => {
    const [searchTerm] = useState("")
    const [roleFilter] = useState("all")
    const [statusFilter] = useState("all")
    const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
    // const [users, setUsers] = useState(usersData)
    // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<User | null>(null)
    const { toast } = useToast()

    const usersPerPage = 10

    // Filter users based on search and filters
    const filteredUsers = usersData.filter((user:any) => {
        const matchesSearch =
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.departmentName?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === "all" || user.role === roleFilter
        const matchesStatus = statusFilter === "all" || user.status === statusFilter
        return matchesSearch && matchesRole && matchesStatus
    })

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
    const startIndex = (currentPage - 1) * usersPerPage
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

    // const handleSuspendUser = (userId: string) => {
    //     setUsers(
    //         users.map((user) =>
    //             user._id === userId ? { ...user, status: user.status === "suspended" ? "active" : "suspended" } : user,
    //         ),
    //     )
    //     toast({
    //         title: "User Status Updated",
    //         description: "User status has been successfully updated.",
    //     })
    // }

    const handleDeleteUser = async(userId: string) => {
        try {
            await apiClient.deleteUser(userId)
            toast({
                title: "User Deleted",
                description: "User has been successfully deleted from the system.",
            })
            setUsers(usersData.filter((user:any) => user?._id !== userId))
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            })
        }
    }

    // const handleEditUser = (user: User) => {
    //     setSelectedUser(user)
    //     setIsEditDialogOpen(true)
    // }

    const handleViewUser = async(user: User) => {
      try {
        console.log(user);
        // await apiClient.getUser()
          setSelectedUser(user)
          setIsViewDialogOpen(true)
      } catch (error) {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          })  
      }
    }

    if(loading2){
      return <TableSkeleton />
    }

    return (
        <div className="w-full space-y-6">
        <div className="border rounded-lg shadow-sm overflow-hidden">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-left px-6 py-3 font-semibold text-gray-700">
                  User
                </TableHead>
                <TableHead className="text-left px-6 py-3 font-semibold text-gray-700">
                  Role
                </TableHead>
                <TableHead className="text-left px-6 py-3 font-semibold text-gray-700">
                  Department
                </TableHead>
                <TableHead className="text-right px-6 py-3 font-semibold text-gray-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData?.map((user:any) => (
                <UserTableRow
                  key={user?._id}
                  user={user}
                  isDropdownOpen={isDropdownOpen}
                  roleColors={roleColors}
                  statusColors={statusColors}
                  setIsDropdownOpen={setIsDropdownOpen}
                  handleViewUser={handleViewUser}
                  setUserToDelete={setUserToDelete}
                  setDeleteDialogOpen={setDeleteDialogOpen}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center">
          <Pagination
            filteredUsers={filteredUsers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            usersPerPage={usersPerPage}
            totalPages={totalPages}
            startIndex={startIndex}
          />
        </div>

        <ViewUserDialog
          isViewDialogOpen={isViewDialogOpen}
          setIsViewDialogOpen={setIsViewDialogOpen}
          selectedUser={selectedUser}
          roleColors={roleColors}
          statusColors={statusColors}
        />


        <DeleteUserDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={() => {
            if (userToDelete) handleDeleteUser(userToDelete._id)
              setDeleteDialogOpen(false)
          }}
        />
      </div>
    )
}

{/* <EditUserDialog
  isEditDialogOpen={isEditDialogOpen}
  setIsEditDialogOpen={setIsEditDialogOpen}
  selectedUser={selectedUser}
/> */}
export default UsersTable