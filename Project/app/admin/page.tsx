"use client"
import StatsCards from "@/components/admin/StatsCards"
import Header from "@/components/admin/Header"
import RecentActivity from "@/components/admin/RecentActivity"
import QuickActions from "@/components/admin/QuickActions"
import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"

export default function AdminDashboard() {
  const [stat, setStat] = useState();
  const [recentActivity, setRecentActivity] = useState();

  const getDashboard = async () => {
    const response:any = await apiClient.getDashboardStats();
    setStat(response?.data);
  };

  const getDashboardActivity = async() => {
    const response:any = await apiClient.getDashboardActivity();
    setRecentActivity(response.data)
  }

  useEffect(() => {
    getDashboardActivity();
    getDashboard()
  }, [])

  return (
    <div className="p-2 sm:p-6 space-y-6">
      <Header />

      <StatsCards stat={stat} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity recentActivity={recentActivity} />

        <QuickActions />
      </div>
    </div>
  )
}
