import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

const NotificationsSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="border-0 shadow-sm animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                {/* Header with title and dropdown */}
                <div className="flex items-start justify-between">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default NotificationsSkeleton