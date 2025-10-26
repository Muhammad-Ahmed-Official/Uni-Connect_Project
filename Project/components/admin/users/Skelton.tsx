import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TableSkeleton = () => {
  return (
    <div className="w-full space-y-6">
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-left px-6 py-3">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="text-left px-6 py-3">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="text-left px-6 py-3">
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="text-right px-6 py-3">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index} className="animate-pulse">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Skeleton className="h-9 w-9 rounded-md ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default TableSkeleton