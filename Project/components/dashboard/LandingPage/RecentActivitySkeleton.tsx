import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RecentActivitySkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <Skeleton className="w-2 h-2 rounded-full mt-2" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full mt-4">
                    <Skeleton className="h-9 w-full rounded-md" />
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentActivitySkeleton