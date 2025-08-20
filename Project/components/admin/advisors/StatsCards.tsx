import { Advisor } from '@/app/admin/advisors/page'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, MessageSquare, Star, UserCheck } from 'lucide-react'
import React from 'react'

const StatsCards = ({ advisors }: { advisors: Advisor[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-wrap w-full">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Advisors</p>
              <p className="text-2xl font-bold text-gray-900">{advisors.length}</p>
            </div>
            <UserCheck className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Advisors</p>
              <p className="text-2xl font-bold text-gray-900">
                {advisors.filter((a) => a.status === "active").length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {(advisors.reduce((sum, a) => sum + a.rating, 0) / advisors.length).toFixed(1)}
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Escalations</p>
              <p className="text-2xl font-bold text-gray-900">
                {advisors.reduce((sum, a) => sum + a.totalEscalations, 0)}
              </p>
            </div>
            <MessageSquare className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsCards