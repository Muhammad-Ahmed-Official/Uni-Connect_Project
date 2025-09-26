"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import StatsCards from "@/components/dashboard/LandingPage/StatsCards"
import FeaturedSection from "@/components/dashboard/LandingPage/FeaturedSection"
import RecentActivity from "@/components/dashboard/LandingPage/RecentActivity"
import QuickLinks from "@/components/dashboard/LandingPage/QuickLinks"
import Header from "@/components/dashboard/common/Header"


export default function DashboardPage() {
  // TODO
  // const session = useSession();
  // const role = session?.data?.user?.role;

  // if (!session) redirect("/login");
  // if (role === "admin") redirect("/admin");

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header title="Welcome back, Sarah! 👋" description="Here's what's happening in your university community today." />

      {/* Stats Cards */}
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <QuickLinks />

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* Featured Section */}
      <FeaturedSection />
    </div>
  )
}
