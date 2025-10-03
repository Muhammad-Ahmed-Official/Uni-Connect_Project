import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsSwitchProps {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export default function SettingsSwitch({
    id,
    label,
    description,
    checked,
    onCheckedChange,
}: SettingsSwitchProps) {
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