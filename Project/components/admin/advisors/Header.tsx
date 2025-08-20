import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const Header = () => {
    return (
        <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Advisor Management</h1>
                <p className="text-gray-600 mt-1">Manage academic advisors, assignments, and performance metrics.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Advisor
            </Button>
        </div>
    )
}

export default Header