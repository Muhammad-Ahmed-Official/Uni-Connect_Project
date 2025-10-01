import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Save } from "lucide-react";
import { Privacy } from "@/types/settings";

interface PrivacyTabProps {
    privacy: Privacy;
    onPrivacyChange: (privacy: Privacy) => void;
    onSave: () => void;
}

export default function PrivacyTab({ privacy, onPrivacyChange, onSave }: PrivacyTabProps) {
    const togglePrivacy = (key: keyof Privacy, value: boolean | string) => {
        onPrivacyChange({ ...privacy, [key]: value });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy Settings
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="profileVisibility">Profile Visibility</Label>
                        <Select
                            value={privacy.profileVisibility}
                            onValueChange={(value) => togglePrivacy('profileVisibility', value)}
                        >
                            <SelectTrigger className="mt-2">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">Public - Anyone can see</SelectItem>
                                <SelectItem value="university">University Only - Students and staff</SelectItem>
                                <SelectItem value="department">Department Only - Same department</SelectItem>
                                <SelectItem value="private">Private - Only me</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <PrivacySwitch
                        id="showEmail"
                        label="Show Email Address"
                        description="Allow others to see your email"
                        checked={privacy.showEmail}
                        onCheckedChange={(checked) => togglePrivacy('showEmail', checked)}
                    />
                    <PrivacySwitch
                        id="showPhone"
                        label="Show Phone Number"
                        description="Allow others to see your phone number"
                        checked={privacy.showPhone}
                        onCheckedChange={(checked) => togglePrivacy('showPhone', checked)}
                    />
                    <PrivacySwitch
                        id="allowDirectMessages"
                        label="Allow Direct Messages"
                        description="Let other users send you direct messages"
                        checked={privacy.allowDirectMessages}
                        onCheckedChange={(checked) => togglePrivacy('allowDirectMessages', checked)}
                    />
                    <PrivacySwitch
                        id="showOnlineStatus"
                        label="Show Online Status"
                        description="Display when you're online"
                        checked={privacy.showOnlineStatus}
                        onCheckedChange={(checked) => togglePrivacy('showOnlineStatus', checked)}
                    />
                </div>
                <Button onClick={onSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Privacy Settings
                </Button>
            </CardContent>
        </Card>
    );
}

interface PrivacySwitchProps {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

function PrivacySwitch({ id, label, description, checked, onCheckedChange }: PrivacySwitchProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <Label htmlFor={id}>{label}</Label>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <Switch
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
            />
        </div>
    );
}