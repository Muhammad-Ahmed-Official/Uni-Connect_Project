import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Key, Lock, EyeOff, Eye } from "lucide-react";
import SettingsCard from "@/components/shared/SettingsCard";
import SettingsSwitch from "@/components/shared/SettingsSwitch";
import { SecuritySettings } from "@/types/settings";
import { useState } from "react";
import { ComingSoonWrapper } from "@/components/shared/ComingSoonWrapper";

interface SecuritySettingsTabProps {
    settings: SecuritySettings;
    onSettingsChange: (settings: SecuritySettings) => void;
    onSave: () => void;
    errors: {
        newPassword?: string;
        confirmPassword?: string;
    };
    loading: boolean;
}

export default function SecuritySettingsTab({
    settings,
    onSettingsChange,
    onSave,
    errors,
    loading,
}: SecuritySettingsTabProps) {
    const updateSetting = (key: keyof SecuritySettings, value: any) => {
        // onSettingsChange({ ...settings, [key]: value });
        onSettingsChange({ ...settings, [key]: value });
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <SettingsCard
            title="Security Configuration"
            icon={<Key className="h-5 w-5" />}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="newPassword">New Password:</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className={`pl-10 pr-10 ${errors.newPassword ? "border-red-500" : ""}`}
                            onChange={(e) => updateSetting('newPassword', e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password:</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                            onChange={(e) => updateSetting('confirmPassword', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <ComingSoonWrapper>
                    <div className="space-y-4">
                        <SettingsSwitch
                            id="twoFactorEnabled"
                            label="Two-Factor Authentication"
                            description="Enable 2FA for admin accounts"
                            checked={settings.twoFactorEnabled}
                            onCheckedChange={(checked) => updateSetting('twoFactorEnabled', checked)}
                            // disabled={true}
                        />
                    </div>
                </ComingSoonWrapper>

                <Button onClick={onSave}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving...":  "Save Settings"}
                </Button>
            </div>
        </SettingsCard>
    );
}