import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface EventTableSkeletonProps {
  count?: number
}

const EventSkeleton = ({ count = 3}: EventTableSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-3">
            {/* Event Image Skeleton */}
            <Skeleton className="w-full h-48 rounded-lg mb-3" />
            
            <div className="space-y-2">
              {/* Event Title Skeleton */}
              <Skeleton className="h-6 w-3/4" />
              
              {/* Event Date Skeleton */}
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
              
              {/* Event Location Skeleton */}
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Event Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            
            {/* Department Badge Skeleton */}
            <Skeleton className="h-6 w-20 rounded-full" />
            
            {/* Status and Actions Section */}
            <div className="flex items-center justify-between pt-3 border-t">
              {/* Status Badge Skeleton */}
              <Skeleton className="h-6 w-16 rounded-full" />
              
              {/* Action Buttons Skeleton */}
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default EventSkeleton