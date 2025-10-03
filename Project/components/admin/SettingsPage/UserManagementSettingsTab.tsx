import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Users } from "lucide-react";
import SettingsCard from "@/components/shared/SettingsCard";
import SettingsSwitch from "@/components/shared/SettingsSwitch";
import { UserSettings } from "@/types/settings";

interface UserManagementSettingsTabProps {
    settings: UserSettings;
    onSettingsChange: (settings: UserSettings) => void;
    onSave: () => void;
}

export default function UserManagementSettingsTab({
    settings,
    onSettingsChange,
    onSave,
}: UserManagementSettingsTabProps) {
    const updateSetting = (key: keyof UserSettings, value: any) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    return (
        <SettingsCard
            title="User Management Configuration"
            icon={<Users className="h-5 w-5" />}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="defaultUserRole">Default User Role</Label>
                        <Select
                            value={settings.defaultUserRole}
                            onValueChange={(value) => updateSetting('defaultUserRole', value)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="advisor">Advisor</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="maxDepartmentsPerUser">Max Departments Per User</Label>
                        <Input
                            id="maxDepartmentsPerUser"
                            type="number"
                            value={settings.maxDepartmentsPerUser}
                            onChange={(e) => updateSetting('maxDepartmentsPerUser', e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <SettingsSwitch
                        id="autoApproveRegistrations"
                        label="Auto-Approve Registrations"
                        description="Automatically approve new user registrations"
                        checked={settings.autoApproveRegistrations}
                        onCheckedChange={(checked) => updateSetting('autoApproveRegistrations', checked)}
                    />
                    <SettingsSwitch
                        id="allowProfilePictures"
                        label="Allow Profile Pictures"
                        description="Allow users to upload profile pictures"
                        checked={settings.allowProfilePictures}
                        onCheckedChange={(checked) => updateSetting('allowProfilePictures', checked)}
                    />
                    <SettingsSwitch
                        id="allowDirectMessages"
                        label="Allow Direct Messages"
                        description="Allow users to send direct messages"
                        checked={settings.allowDirectMessages}
                        onCheckedChange={(checked) => updateSetting('allowDirectMessages', checked)}
                    />
                    <SettingsSwitch
                        id="moderateForumPosts"
                        label="Moderate Forum Posts"
                        description="Require admin approval for forum posts"
                        checked={settings.moderateForumPosts}
                        onCheckedChange={(checked) => updateSetting('moderateForumPosts', checked)}
                    />
                </div>

                <Button onClick={onSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save User Settings
                </Button>
            </div>
        </SettingsCard>
    );
}