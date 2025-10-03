import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Shield } from "lucide-react";
import SettingsCard from "@/components/shared/SettingsCard";
import SettingsSwitch from "@/components/shared/SettingsSwitch";
import { PlatformSettings } from "@/types/settings";

interface PlatformSettingsTabProps {
    settings: PlatformSettings;
    onSettingsChange: (settings: PlatformSettings) => void;
    onSave: () => void;
}

export default function PlatformSettingsTab({
    settings,
    onSettingsChange,
    onSave,
}: PlatformSettingsTabProps) {
    const updateSetting = (key: keyof PlatformSettings, value: any) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    return (
        <div className="space-y-6">
            <SettingsCard
                title="General Platform Settings"
                icon={<Shield className="h-5 w-5" />}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="siteName">Site Name</Label>
                            <Input
                                id="siteName"
                                value={settings.siteName}
                                onChange={(e) => updateSetting('siteName', e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                            <Input
                                id="sessionTimeout"
                                type="number"
                                value={settings.sessionTimeout}
                                onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="siteDescription">Site Description</Label>
                        <Textarea
                            id="siteDescription"
                            value={settings.siteDescription}
                            onChange={(e) => updateSetting('siteDescription', e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="maxFileUploadSize">Max File Upload Size (MB)</Label>
                            <Input
                                id="maxFileUploadSize"
                                type="number"
                                value={settings.maxFileUploadSize}
                                onChange={(e) => updateSetting('maxFileUploadSize', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <SettingsSwitch
                            id="maintenanceMode"
                            label="Maintenance Mode"
                            description="Temporarily disable site access for maintenance"
                            checked={settings.maintenanceMode}
                            onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                        />
                        <SettingsSwitch
                            id="registrationEnabled"
                            label="User Registration"
                            description="Allow new users to register accounts"
                            checked={settings.registrationEnabled}
                            onCheckedChange={(checked) => updateSetting('registrationEnabled', checked)}
                        />
                        <SettingsSwitch
                            id="emailVerificationRequired"
                            label="Email Verification Required"
                            description="Require email verification for new accounts"
                            checked={settings.emailVerificationRequired}
                            onCheckedChange={(checked) => updateSetting('emailVerificationRequired', checked)}
                        />
                    </div>

                    <Button onClick={onSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Platform Settings
                    </Button>
                </div>
            </SettingsCard>
        </div>
    );
}