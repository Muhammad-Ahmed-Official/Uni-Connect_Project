import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaperCardSkeleton() {
    return (
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="flex-1">
                <div className="flex items-start justify-between mb-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-5 w-3/4 mb-3" />

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-32" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col justify-end">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-4 rounded" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-6 w-16 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                    </div>

                    <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1 rounded-md" />
                        <Skeleton className="h-10 flex-1 rounded-md" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}