import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, User } from "lucide-react";
import { Profile } from "@/types/settings";

interface ProfileTabProps {
    profile: Profile;
    onProfileChange: (profile: Profile) => void;
    onSave: () => void;
    onProfilePictureUpload: () => void;
}

export default function ProfileTab({
    profile,
    onProfileChange,
    onSave,
    onProfilePictureUpload
}: ProfileTabProps) {
    return (
        <div className="space-y-6">
            {/* Profile Picture */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Picture
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="/student-avatar.png" alt="Profile" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <Button onClick={onProfilePictureUpload} className="mb-2">
                                <Camera className="h-4 w-4 mr-2" />
                                Upload New Picture
                            </Button>
                            <p className="text-sm text-gray-600">JPG, PNG or GIF. Max size 5MB.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={profile.firstName}
                                onChange={(e) => onProfileChange({ ...profile, firstName: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                value={profile.lastName}
                                onChange={(e) => onProfileChange({ ...profile, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => onProfileChange({ ...profile, email: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={profile.phone}
                                onChange={(e) => onProfileChange({ ...profile, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="studentId">Student ID</Label>
                            <Input id="studentId" value={profile.studentId} disabled />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="department">Department</Label>
                            <Select
                                value={profile.department}
                                onValueChange={(value) => onProfileChange({ ...profile, department: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                    <SelectItem value="Business">Business</SelectItem>
                                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                                    <SelectItem value="Physics">Physics</SelectItem>
                                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="year">Academic Year</Label>
                            <Select
                                value={profile.year}
                                onValueChange={(value) => onProfileChange({ ...profile, year: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1st Year">1st Year</SelectItem>
                                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                                    <SelectItem value="4th Year">4th Year</SelectItem>
                                    <SelectItem value="Graduate">Graduate</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => onProfileChange({ ...profile, location: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            value={profile.bio}
                            onChange={(e) => onProfileChange({ ...profile, bio: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <Button onClick={onSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Profile
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}