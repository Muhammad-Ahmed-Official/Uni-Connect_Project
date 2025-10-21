import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Calendar, Heart, MessageCircle } from 'lucide-react'
import React from 'react'

interface StatsCardsProps {
    eventStats: any
    approvedEvents: number
    pendingEvents: number
}

const StatsCards = ({ eventStats, approvedEvents, pendingEvents }: StatsCardsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                    <Calendar className="h-[20px] w-[20px] text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{eventStats?.totalEvents ? eventStats?.totalEvents : 0}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                    <Heart className='h-[20px] w-[20px] text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{eventStats?.totalLikes ? eventStats?.totalLikes : 0}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                    <MessageCircle className="h-[20px] w-[20px] text-yellow-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{eventStats?.totalComments ? eventStats?.totalComments : 0}</div>
                </CardContent>
            </Card>
        </div>
    )
}
export default StatsCards;

{/* <p className="text-xs text-muted-foreground">+2 from last month</p> */}
{/* <p className="text-xs text-muted-foreground">Active events</p> */}
{/* <CheckCircle className="h-4 w-4 text-green-600" />
<AlertCircle className="h-4 w-4 " /> */}
{/* <p className="text-xs text-muted-foreground">Awaiting review</p> */}