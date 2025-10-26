import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Calendar, FileText, UserCheck, Users, Building2 } from 'lucide-react'
import StatsCardsSkeleton from '../dashboard/LandingPage/StatsCardsSkeleton';

const StatsCards = ({ stat, loading }: any) => {
  // if (!stat) return null;

  const stats = [
    {
      title: "Total Students",
      value: stat?.totalStudents ?? 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Advisors",
      value: stat?.totalAdvisors ?? 0,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Departments",
      value: stat?.totalDepartments ?? 0,
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    // {
    //   title: "Total Documents",
    //   value: stat.totalDocuments ?? 0,
    //   icon: FileText,
    //   color: "text-teal-600",
    //   bgColor: "bg-teal-100",
    // },
    {
      title: "Total Events",
      value: stat?.totalEvents ?? 0,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];


  if (loading) {
      return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((statItem, index) => (
        <StatsCardsItem key={index} statItem={statItem} />
      ))}
    </div>
  )
}


const StatsCardsItem = ({ statItem }: any) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{statItem.title}</CardTitle>
        <div className={`p-2 rounded-lg ${statItem.bgColor}`}>
          <statItem.icon className={`h-4 w-4 ${statItem.color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{statItem.value}</div>
      </CardContent>
    </Card>
  )
}

export default StatsCards