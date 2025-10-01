import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { PasswordData } from "@/types/settings";

interface AccountTabProps {
    onPasswordChange: (passwordData: PasswordData) => void;
}

export default function AccountTab({ onPasswordChange }: AccountTabProps) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordData, setPasswordData] = useState<PasswordData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handlePasswordSubmit = () => {
        onPasswordChange(passwordData);
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const updatePasswordField = (field: keyof PasswordData, value: string) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6">
            {/* Change Password */}
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <PasswordInput
                        id="currentPassword"
                        label="Current Password"
                        value={passwordData.currentPassword}
                        onChange={(value) => updatePasswordField('currentPassword', value)}
                        showPassword={showCurrentPassword}
                        onToggleShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}
                    />
                    <PasswordInput
                        id="newPassword"
                        label="New Password"
                        value={passwordData.newPassword}
                        onChange={(value) => updatePasswordField('newPassword', value)}
                        showPassword={showNewPassword}
                        onToggleShowPassword={() => setShowNewPassword(!showNewPassword)}
                    />
                    <PasswordInput
                        id="confirmPassword"
                        label="Confirm New Password"
                        value={passwordData.confirmPassword}
                        onChange={(value) => updatePasswordField('confirmPassword', value)}
                        showPassword={showConfirmPassword}
                        onToggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    <Button onClick={handlePasswordSubmit}>Change Password</Button>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
                <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                        <p className="text-sm text-red-700 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button variant="destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    showPassword: boolean;
    onToggleShowPassword: () => void;
}

function PasswordInput({ id, label, value, onChange, showPassword, onToggleShowPassword }: PasswordInputProps) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <Input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={onToggleShowPassword}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    );
}