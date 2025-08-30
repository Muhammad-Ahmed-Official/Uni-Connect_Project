import { Advisor } from '@/app/admin/advisors/page'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

const Pagination = ({ filteredAdvisors }: { filteredAdvisors: Advisor[] }) => {
    const [currentPage, setCurrentPage] = useState(1)

    const advisorsPerPage = 10
    const totalPages = Math.ceil(filteredAdvisors.length / advisorsPerPage)
    const startIndex = (currentPage - 1) * advisorsPerPage;

    return (
        <div className="flex items-center justify-between mt-6 flex-wrap gap-2">
            <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + advisorsPerPage, filteredAdvisors.length)} of{" "}
                {filteredAdvisors.length} advisors
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>
                <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-8 h-8 p-0"
                        >
                            {page}
                        </Button>
                    ))}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default Pagination