import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Mail, IdCard, Clock } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

export default function ViewUserDialog({
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedUser,
}: any) {
  const roleColors: Record<string, string> = {
    student: "bg-blue-100 text-blue-800",
    advisor: "bg-green-100 text-green-800",
    admin: "bg-purple-100 text-purple-800",
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return <IdCard className="h-3 w-3" />;
      case "advisor":
        return <Mail className="h-3 w-3" />;
      case "admin":
        return <Clock className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information about the selected user
          </DialogDescription>
        </DialogHeader>

        {selectedUser && (
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                    <AvatarImage src={selectedUser.profilePic || ""} />
                    <AvatarFallback className="text-xl bg-blue-100 font-bold text-blue-600">
                      {selectedUser.firstName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 capitalize">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4" />
                      {selectedUser.email}
                    </p>

                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <Badge
                        className={`${roleColors[selectedUser.role]} border-0 gap-1`}
                      >
                        {getRoleIcon(selectedUser.role)}
                        <span className="capitalize">{selectedUser.role}</span>
                      </Badge>
                      {selectedUser.studentId && (
                        <Badge variant="outline" className="gap-1">
                          <IdCard className="h-3 w-3" />
                          {selectedUser.studentId}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Info Grid */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="font-medium text-gray-600">Department</Label>
                <p className="mt-1">{selectedUser.departmentName}</p>
              </div>

            <div>
                <Label className="font-medium text-gray-600">Member Since</Label>
                <p className="mt-1 text-gray-800">
                    {format(new Date(selectedUser.createdAt), "dd MMM yyyy")}
                </p>
            </div>

            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
