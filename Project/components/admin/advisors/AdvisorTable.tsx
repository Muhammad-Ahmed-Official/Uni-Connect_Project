"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Building2, Eye, MoreHorizontal, Trash2, UserX } from "lucide-react"
import { Advisor, renderStars, statusColors } from "@/app/admin/advisors/page"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import ViewAdvisorDialog from "./ViewAdvisorDialog"
import AssignDepartmentDialog from "./AssignDepartmentDialog"

const AdvisorTable = (
    { advisorsData, filteredAdvisors, departments }:
        { advisorsData: Advisor[], filteredAdvisors: Advisor[], departments: string[] }
) => {
    const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null)
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [currentPage] = useState(1)
    const [advisors, setAdvisors] = useState(advisorsData)
    const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
    const { toast } = useToast()

    const advisorsPerPage = 10

    // Pagination
    const startIndex = (currentPage - 1) * advisorsPerPage;
    const paginatedAdvisors = filteredAdvisors.slice(startIndex, startIndex + advisorsPerPage)


    const getPerformanceColor = (resolved: number, total: number) => {
        const percentage = (resolved / total) * 100
        if (percentage >= 90) return "text-green-600"
        if (percentage >= 80) return "text-yellow-600"
        return "text-red-600"
    }

    const handleSuspendAdvisor = (advisorId: number) => {
        setAdvisors(
            advisors.map((advisor) =>
                advisor.id === advisorId
                    ? { ...advisor, status: advisor.status === "suspended" ? "active" : "suspended" }
                    : advisor,
            ),
        )
        toast({
            title: "Advisor Status Updated",
            description: "Advisor status has been successfully updated.",
        })
    }

    const handleRemoveAdvisor = (advisorId: number) => {
        setAdvisors(advisors.filter((advisor) => advisor.id !== advisorId))
        toast({
            title: "Advisor Removed",
            description: "Advisor has been successfully removed from the system.",
            variant: "destructive",
        })
    }

    const handleAssignDepartment = (advisor: Advisor) => {
        setSelectedAdvisor(advisor)
        setIsAssignDialogOpen(true)
    }

    const handleViewAdvisor = (advisor: Advisor) => {
        setSelectedAdvisor(advisor)
        setIsViewDialogOpen(true)
    }

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Advisor</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Escalations</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedAdvisors.map((advisor) => (
                        <TableRow key={advisor.id}>
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={advisor.avatar || "/placeholder-user.png"} />
                                        <AvatarFallback>
                                            {advisor.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-gray-900">{advisor.name}</div>
                                        <div className="text-sm text-gray-500">{advisor.specialization}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    <Building2 className="h-3 w-3 mr-1" />
                                    {advisor.department}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-1">
                                    <div className="flex">{renderStars(advisor.rating)}</div>
                                    <span className="text-sm text-gray-600 ml-2">{advisor.rating}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm">
                                    <div
                                        className={`font-medium ${getPerformanceColor(
                                            advisor.resolvedEscalations,
                                            advisor.totalEscalations,
                                        )}`}
                                    >
                                        {advisor.resolvedEscalations}/{advisor.totalEscalations}
                                    </div>
                                    <div className="text-gray-500">
                                        {Math.round((advisor.resolvedEscalations / advisor.totalEscalations) * 100)}% resolved
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {advisor.avgResponseTime}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge className={`${statusColors[advisor.status]} border-0`}>
                                    {advisor.status === "active" ? "●" : advisor.status === "suspended" ? "⏸" : "○"}
                                    <span className="ml-1 capitalize">{advisor.status}</span>
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu
                                    open={isDropdownOpen === advisor.id}
                                    onOpenChange={(open) => setIsDropdownOpen(open ? advisor.id : null)}
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
                                                handleViewAdvisor(advisor);
                                                setIsDropdownOpen(null);
                                            }}
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                handleAssignDepartment(advisor);
                                                setIsDropdownOpen(null);
                                            }}
                                        >
                                            <Building2 className="mr-2 h-4 w-4" />
                                            Assign Department
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => {
                                                handleSuspendAdvisor(advisor.id);
                                                setIsDropdownOpen(null);
                                            }}
                                        >
                                            <UserX className="mr-2 h-4 w-4" />
                                            {advisor.status === "suspended" ? "Activate" : "Suspend"} Advisor
                                        </DropdownMenuItem>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem
                                                    onSelect={(e) => {
                                                        e.preventDefault();
                                                        setIsDropdownOpen(null);
                                                    }}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Remove Advisor
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently remove the advisor and reassign
                                                        their escalations to other advisors.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleRemoveAdvisor(advisor.id)}
                                                        className="bg-red-600 hover:bg-red-700"
                                                    >
                                                        Remove
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

            {/* View Advisor Dialog */}
            <ViewAdvisorDialog isViewDialogOpen={isViewDialogOpen} setIsViewDialogOpen={setIsViewDialogOpen} selectedAdvisor={selectedAdvisor} setSelectedAdvisor={setSelectedAdvisor} />

            {/* Assign Department Dialog */}
            <AssignDepartmentDialog isAssignDialogOpen={isAssignDialogOpen} setIsAssignDialogOpen={setIsAssignDialogOpen} selectedAdvisor={selectedAdvisor} departments={departments} />
        </div>
    )
}

export default AdvisorTable