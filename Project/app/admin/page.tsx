"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import StatsCards from "@/components/admin/StatsCards"
import Header from "@/components/admin/Header"
import RecentActivity from "@/components/admin/RecentActivity"
import QuickActions from "@/components/admin/QuickActions"


export default function AdminDashboard() {
  const session = useSession();
  const role = session?.data?.user?.role;

  if (!session) redirect("/login");
  if (role === "user") redirect("/dashboard");

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header />

      {/* Stats Cards */}
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <RecentActivity />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  )
}
