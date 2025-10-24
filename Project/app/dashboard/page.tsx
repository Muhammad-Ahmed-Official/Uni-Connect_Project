"use client";

import StatsCards from "@/components/dashboard/LandingPage/StatsCards"
import FeaturedSection from "@/components/dashboard/LandingPage/FeaturedSection"
import RecentActivity from "@/components/dashboard/LandingPage/RecentActivity"
import QuickLinks from "@/components/dashboard/LandingPage/QuickLinks"
import Header from "@/components/dashboard/common/Header"
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      {
        !user?.firstName ? (
          <Skeleton className="w-2/4 h-10 rounded-md bg-gray-200" />
        ) : (
          <Header title={`Welcome back, ${user?.firstName || "User"}! 👋`} description="Here's what's happening in your university community today." />
        )
      }

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
