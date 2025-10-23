import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton' // Make sure you have this component

interface DepartmentsTableSkeletonProps {
  count?: number
}

const DepartmentSkeleton = ({ count = 6 }: DepartmentsTableSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Department Icon Skeleton */}
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="space-y-2">
                  {/* Department Name Skeleton */}
                  <Skeleton className="h-6 w-32" />
                  {/* Department Code Badge Skeleton */}
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
              {/* Dropdown Menu Skeleton */}
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Department Head Skeleton */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Skeleton className="h-6 w-8 mx-auto mb-1" />
                <Skeleton className="h-3 w-12 mx-auto" />
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Skeleton className="h-6 w-8 mx-auto mb-1" />
                <Skeleton className="h-3 w-12 mx-auto" />
              </div>
            </div>

            {/* Additional Info Skeleton */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-1 rounded" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-1 rounded" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* Button Skeleton */}
            <Skeleton className="h-9 w-full rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default DepartmentSkeleton