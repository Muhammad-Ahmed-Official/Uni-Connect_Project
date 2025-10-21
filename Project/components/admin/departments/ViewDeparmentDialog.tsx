import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Building2 } from 'lucide-react'
import React from 'react'

interface ViewDeparmentDialogProps {
    isViewDialogOpen: boolean
    setIsViewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedDepartment: AdminDepartment | null
}

const ViewDeparmentDialog = ({ isViewDialogOpen, setIsViewDialogOpen, selectedDepartment }: ViewDeparmentDialogProps) => {
    return (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Department Details</DialogTitle>
                    <DialogDescription>Complete information and statistics for the department</DialogDescription>
                </DialogHeader>
                {selectedDepartment && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-8 w-8 text-blue-600" />
                        </div>

                        {/* Text Section */}
                        <div className="max-w-2xl">
                            <h3 className="text-2xl font-semibold text-gray-800">
                            {selectedDepartment?.departmentName}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                            {selectedDepartment?.departmentBio
                                ? selectedDepartment.departmentBio
                                : "No bio information available for this department."}
                            </p>
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-0 bg-blue-50">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{selectedDepartment?.totalStudents ? selectedDepartment?.totalStudents : 0}</div>
                                    <div className="text-sm text-gray-600">Students</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 bg-green-50">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">{selectedDepartment?.totalAdvisors ? selectedDepartment?.totalAdvisors : 0}</div>
                                    <div className="text-sm text-gray-600">Advisors</div>
                                </CardContent>
                            </Card>
                            {/* <Card className="border-0 bg-orange-50">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-orange-600">{selectedDepartment?.activeEscalations}</div>
                                    <div className="text-sm text-gray-600">Active Cases</div>
                                </CardContent>
                            </Card> */}
                            <Card className="border-0 bg-purple-50">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-purple-600">{selectedDepartment?.totalEvents ? selectedDepartment?.totalEvents : 0}</div>
                                    <div className="text-sm text-gray-600">Events</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Department Information</Label>
                                <div className="mt-2 space-y-2">
                                    <div>
                                        <span className="text-sm text-gray-500">Established:</span>
                                        <p className="text-sm">{selectedDepartment?.established ? selectedDepartment?.established : 0}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Email:</span>
                                        <p className="text-sm">{selectedDepartment?.deaprtmentchairmanEmail ? selectedDepartment?.deaprtmentchairmanEmail : "Email not exist"}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Department Head</Label>
                                <div className="mt-2 flex items-center space-x-3">
                                    <Avatar className="h-12 w-12">
                                        {/* <AvatarImage src={"/placeholder.svg"} /> */}
                                        <AvatarFallback>
                                            {selectedDepartment.departmentChairman
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{selectedDepartment.departmentChairman}</p>
                                        <p className="text-sm text-gray-500">Department Head</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <Label className="text-sm font-medium text-gray-600">Assigned Advisors</Label>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedDepartment.advisors.map((advisor, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={advisor.avatar || "/placeholder.svg"} />
                                            <AvatarFallback>
                                                {advisor.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{advisor.name}</p>
                                            <p className="text-xs text-gray-500">{advisor.specialization}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
export default ViewDeparmentDialog