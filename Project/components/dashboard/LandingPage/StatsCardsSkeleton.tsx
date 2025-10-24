// components/dashboard/StatsCardsSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StatsCardsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Active Discussions Skeleton */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-7 w-12 mb-1" />
                    <Skeleton className="h-3 w-28" />
                </CardContent>
            </Card>

            {/* Upcoming Events Skeleton */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-7 w-8 mb-1" />
                    <Skeleton className="h-3 w-16" />
                </CardContent>
            </Card>

            {/* Study Materials Skeleton */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-7 w-12 mb-1" />
                    <Skeleton className="h-3 w-24" />
                </CardContent>
            </Card>

            {/* Advisor Responses Skeleton */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-7 w-4 mb-1" />
                    <Skeleton className="h-3 w-20" />
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCardsSkeleton