import { Advisor, renderStars, statusColors } from '@/app/admin/advisors/page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from "@/components/ui/label"
import { Building2 } from 'lucide-react'
import React from 'react'

const ViewAdvisorDialog = ({ isViewDialogOpen, setIsViewDialogOpen, selectedAdvisor, setSelectedAdvisor }: { isViewDialogOpen: boolean, setIsViewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>, selectedAdvisor: Advisor | null, setSelectedAdvisor: React.Dispatch<React.SetStateAction<Advisor | null>> }) => {
    return (
        <Dialog
            open={isViewDialogOpen}
            onOpenChange={(open) => {
                setIsViewDialogOpen(open);
                if (!open) {
                    setSelectedAdvisor(null);
                }
            }}
        >
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Advisor Profile</DialogTitle>
                    <DialogDescription>Complete information and performance metrics</DialogDescription>
                </DialogHeader>
                {selectedAdvisor && (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={selectedAdvisor?.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xl">
                                    {selectedAdvisor.name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-2xl font-semibold">{selectedAdvisor.name}</h3>
                                <p className="text-gray-600">{selectedAdvisor.email}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Badge className="bg-blue-100 text-blue-700 border-0">
                                        <Building2 className="h-3 w-3 mr-1" />
                                        {selectedAdvisor.department}
                                    </Badge>
                                    <Badge className={`${statusColors[selectedAdvisor.status]} border-0`}>
                                        <span className="capitalize">{selectedAdvisor.status}</span>
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="border-0 bg-blue-50">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{selectedAdvisor.rating}</div>
                                    <div className="text-sm text-gray-600">Rating</div>
                                    <div className="flex justify-center mt-1">{renderStars(selectedAdvisor.rating)}</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 bg-green-50">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">{selectedAdvisor.totalEscalations}</div>
                                    <div className="text-sm text-gray-600">Total Cases</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 bg-purple-50">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {Math.round((selectedAdvisor.resolvedEscalations / selectedAdvisor.totalEscalations) * 100)}%
                                    </div>
                                    <div className="text-sm text-gray-600">Resolution Rate</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 bg-orange-50">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-orange-600">{selectedAdvisor.avgResponseTime}</div>
                                    <div className="text-sm text-gray-600">Avg Response</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Contact Information</Label>
                                <div className="mt-2 space-y-2">
                                    <div>
                                        <span className="text-sm text-gray-500">Email:</span>
                                        <p className="text-sm">{selectedAdvisor.email}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Phone:</span>
                                        <p className="text-sm">{selectedAdvisor.phone}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Office Hours:</span>
                                        <p className="text-sm">{selectedAdvisor.officeHours}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Academic Information</Label>
                                <div className="mt-2 space-y-2">
                                    <div>
                                        <span className="text-sm text-gray-500">Specialization:</span>
                                        <p className="text-sm">{selectedAdvisor.specialization}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Join Date:</span>
                                        <p className="text-sm">{selectedAdvisor.joinDate}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Advisor ID:</span>
                                        <p className="text-sm">#{selectedAdvisor.id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ViewAdvisorDialog