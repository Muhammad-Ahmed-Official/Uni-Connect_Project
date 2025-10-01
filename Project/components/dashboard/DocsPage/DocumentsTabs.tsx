import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DocumentsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function DocumentsTabs({ activeTab, onTabChange }: DocumentsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList>
        <TabsTrigger value="all">All Documents</TabsTrigger>
        <TabsTrigger value="new">New Documents</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}