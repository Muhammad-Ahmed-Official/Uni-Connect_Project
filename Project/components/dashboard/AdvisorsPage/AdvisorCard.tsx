import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, MessageSquare, Star } from "lucide-react";
import { Advisor } from "@/types/advisor";

interface AdvisorCardProps {
    advisor: Advisor;
    onContact: (advisor: Advisor) => void;
}

export default function AdvisorCard({ advisor, onContact }: AdvisorCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={advisor.image || "/placeholder.svg"} alt={advisor.name} />
                        <AvatarFallback>
                            {advisor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">{advisor.name}</CardTitle>
                                <CardDescription className="text-sm">{advisor.title}</CardDescription>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{advisor.rating}</span>
                            </div>
                        </div>
                        <Badge variant="secondary" className="mt-2">
                            {advisor.department}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{advisor.bio}</p>
                <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{advisor.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{advisor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{advisor.office}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{advisor.availability}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                        {advisor.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Response time: {advisor.responseTime}</span>
                    <Button
                        size="sm"
                        onClick={() => onContact(advisor)}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}