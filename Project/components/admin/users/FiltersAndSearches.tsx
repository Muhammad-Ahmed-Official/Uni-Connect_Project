"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import UsersTable from './UsersTable'
// { users: User[] }
const FiltersAndSearches = ({ users, setUsers, loading2, searchTerm, setSearchTerm }: any) => {
    const [roleFilter, setRoleFilter] = useState("all")
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader>
                <CardTitle>User Directory</CardTitle>
                <CardDescription>Search and filter through all registered users</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search by name, email, or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    {/* <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="student">Students</SelectItem>
                            <SelectItem value="advisor">Advisors</SelectItem>
                        </SelectContent>
                    </Select> */}
                </div>

                {/* Users Table */}
                <UsersTable usersData={users} setUsers={setUsers} loading2={loading2} />
            </CardContent>
        </Card>
    )
}

export default FiltersAndSearches