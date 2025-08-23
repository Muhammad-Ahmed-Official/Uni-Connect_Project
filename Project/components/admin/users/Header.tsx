import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const Header = () => {
    return (
        <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-1">Manage all registered users, advisors, and administrators.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New User
            </Button>
        </div>
    )
}

export default Header