import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Key } from "lucide-react";
import SettingsCard from "@/components/shared/SettingsCard";
import SettingsSwitch from "@/components/shared/SettingsSwitch";
import { SecuritySettings } from "@/types/settings";

interface SecuritySettingsTabProps {
    settings: SecuritySettings;
    onSettingsChange: (settings: SecuritySettings) => void;
    onSave: () => void;
}

export default function SecuritySettingsTab({
    settings,
    onSettingsChange,
    onSave,
}: SecuritySettingsTabProps) {
    const updateSetting = (key: keyof SecuritySettings, value: any) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    return (
        <SettingsCard
            title="Security Configuration"
            icon={<Key className="h-5 w-5" />}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                        <Input
                            id="passwordMinLength"
                            type="number"
                            value={settings.passwordMinLength}
                            onChange={(e) => updateSetting('passwordMinLength', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="loginAttemptLimit">Login Attempt Limit</Label>
                        <Input
                            id="loginAttemptLimit"
                            type="number"
                            value={settings.loginAttemptLimit}
                            onChange={(e) => updateSetting('loginAttemptLimit', e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="accountLockoutDuration">Account Lockout Duration (minutes)</Label>
                    <Input
                        id="accountLockoutDuration"
                        type="number"
                        value={settings.accountLockoutDuration}
                        onChange={(e) => updateSetting('accountLockoutDuration', e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <SettingsSwitch
                        id="requireSpecialChars"
                        label="Require Special Characters"
                        description="Passwords must contain special characters"
                        checked={settings.requireSpecialChars}
                        onCheckedChange={(checked) => updateSetting('requireSpecialChars', checked)}
                    />
                    <SettingsSwitch
                        id="requireNumbers"
                        label="Require Numbers"
                        description="Passwords must contain numbers"
                        checked={settings.requireNumbers}
                        onCheckedChange={(checked) => updateSetting('requireNumbers', checked)}
                    />
                    <SettingsSwitch
                        id="requireUppercase"
                        label="Require Uppercase Letters"
                        description="Passwords must contain uppercase letters"
                        checked={settings.requireUppercase}
                        onCheckedChange={(checked) => updateSetting('requireUppercase', checked)}
                    />
                    <SettingsSwitch
                        id="twoFactorEnabled"
                        label="Two-Factor Authentication"
                        description="Enable 2FA for admin accounts"
                        checked={settings.twoFactorEnabled}
                        onCheckedChange={(checked) => updateSetting('twoFactorEnabled', checked)}
                    />
                </div>

                <Button onClick={onSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Security Settings
                </Button>
            </div>
        </SettingsCard>
    );
}