import React from 'react'
import { Badge } from '../ui/badge'
import { Activity } from 'lucide-react'

const Header = () => {
    return (
        <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your university.</p>
            </div>
            <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600 border-green-200">
                    <Activity className="w-3 h-3 mr-1" />
                    System Healthy
                </Badge>
            </div>
        </div>
    )
}

export default Header