import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const DepartmentCardSkeleton = () => {
    return (
        <Card className="cursor-pointer h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                        <Skeleton className="w-10 h-10 rounded-md" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-6 w-3/4 mt-2" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-2/3 mt-1" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Tags Skeleton */}
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-14 rounded-full" />
                    </div>

                    {/* Stats Skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>

                    {/* Activity Indicator Skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <div className="flex justify-between text-xs">
                            <Skeleton className="h-3 w-12" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// You can also create a grid of skeleton cards for loading states
const DepartmentCardSkeletonGrid = ({ count = 6 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <DepartmentCardSkeleton key={index} />
            ))}
        </div>
    )
}

export { DepartmentCardSkeleton, DepartmentCardSkeletonGrid }