import { Activity, Building2, Calendar, CheckCircle, Clock, Eye, FileText, MessageSquareMore, Users } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const formatDate = (dateString: string) => {
  if (!dateString) return "Date not available";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const iconMap: Record<string, React.ElementType> = {
  event: Calendar,
  department: Building2,
  student: Users,
  document: FileText,
  default: Clock,
};

const RecentActivitySkeleton = ({ recentActivity }: any) => {
  const skeletonCount = recentActivity?.length || 5;

  return (
    <CardContent className="space-y-4 max-h-96 overflow-y-auto">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div
          key={index}
          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
        >
          <div className="p-2 rounded-lg bg-gray-100">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">Loading...</p>
            <div className="flex items-center mt-1">
              <Clock className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">Loading...</span>
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  );
};

const RecentActivityItem = ({ activity }: { activity: Activity }) => {
  const Icon = iconMap[activity?.type?.toLowerCase()] || iconMap.default;
  
  return (
    <div key={activity?.id || Math.random()} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
      <div className={`p-2 rounded-lg bg-gray-100`}>
        <Icon className={`h-4 w-4 text-blue-600`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{activity?.title}</p>
        <div className="flex items-center mt-1">
          <Clock className="h-3 w-3 text-gray-400 mr-1" />
          <span className="text-xs text-gray-500">{formatDate(activity?.time)}</span>
        </div>
      </div>
    </div>
  )
}

const RecentActivity = ({ recentActivity }: any) => {
  return (
    <div className="">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest actions and updates across the platform</CardDescription>
        </CardHeader>
        
        {/* Scrollable content with fixed height */}
        <div className="max-h-[260px] overflow-y-auto">
          <CardContent className="space-y-4">
            {!recentActivity ? (
              <RecentActivitySkeleton recentActivity={recentActivity} />
            ) : (
              recentActivity?.map((activity: any) => (
                <RecentActivityItem key={activity.id || Math.random()} activity={activity} />
              ))
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default RecentActivity