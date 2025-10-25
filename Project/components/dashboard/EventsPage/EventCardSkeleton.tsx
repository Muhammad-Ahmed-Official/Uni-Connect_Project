import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
                {/* Image skeleton */}
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <Skeleton className="h-full w-full" />
                </div>

                <div className="pt-4 space-y-4">
                    {/* Title skeleton */}
                    <Skeleton className="h-6 w-4/5" />

                    {/* Description skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    {/* Event details skeletons */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-36" />
                        </div>
                    </div>

                    {/* Tags skeletons */}
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-14 rounded-full" />
                    </div>

                    {/* Department skeleton */}
                    <Skeleton className="h-4 w-24" />
                </div>
            </CardContent>
        </Card>
    );
}