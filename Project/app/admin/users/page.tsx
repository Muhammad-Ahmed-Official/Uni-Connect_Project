'use client'

import Header from "@/components/admin/users/Header"
import StatsCards from "@/components/admin/users/StatsCards"
import FiltersAndSearches from "@/components/admin/users/FiltersAndSearches"
import { apiClient } from "@/lib/api-client"
import { useEffect, useState } from "react"


export default function UserManagement() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStudent: 0, totalAdvisors: 0 })
  const [users, setUsers] = useState<User[]>([])

  const getUserStats = async () => {
    const response:any = await apiClient.userStats();
    setStats(response.data);
  }

  const getUsers = async() => {
    const response:any = await apiClient.getUsers();
    setUsers(response.data?.users);
  }
  
  useEffect(() => {
    getUsers();
    getUserStats();
  }, [])

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Filters and Search */}
      <FiltersAndSearches users={users}setUsers={setUsers} />
    </div>
  )
}
