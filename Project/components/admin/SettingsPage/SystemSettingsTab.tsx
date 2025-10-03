import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Download, RefreshCw } from "lucide-react";

interface SystemSettingsTabProps {
    onBackupExport: () => void;
    onSystemRestart: () => void;
}

export default function SystemSettingsTab({
    onBackupExport,
    onSystemRestart,
}: SystemSettingsTabProps) {
    return (
        <div className="space-y-6">
            {/* System Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        System Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">99.9%</div>
                            <div className="text-sm text-gray-600">Uptime</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">2.3GB</div>
                            <div className="text-sm text-gray-600">Database Size</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">1,247</div>
                            <div className="text-sm text-gray-600">Active Users</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Backup & Maintenance */}
            <Card>
                <CardHeader>
                    <CardTitle>Backup & Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="font-medium">Database Backup</h4>
                            <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
                        </div>
                        <Button onClick={onBackupExport} variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export Backup
                        </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="font-medium">System Restart</h4>
                            <p className="text-sm text-gray-600">Schedule system restart for maintenance</p>
                        </div>
                        <Button onClick={onSystemRestart} variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Schedule Restart
                        </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="font-medium">System Logs</h4>
                            <p className="text-sm text-gray-600">Download system logs for analysis</p>
                        </div>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download Logs
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* System Information */}
            <Card>
                <CardHeader>
                    <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Platform Version:</span>
                            <Badge variant="secondary">v2.1.0</Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Database Version:</span>
                            <Badge variant="secondary">PostgreSQL 15.2</Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Server Environment:</span>
                            <Badge variant="secondary">Production</Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Last Updated:</span>
                            <span className="text-sm">January 15, 2024</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}