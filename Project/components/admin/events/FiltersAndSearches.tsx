import React from 'react'
import EventTable from './EventTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FiltersAndSearchesProps {
    filteredEvents: AdminEvent[]
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    statusFilter: string
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>
    categoryFilter: string
    setCategoryFilter: React.Dispatch<React.SetStateAction<string>>
    setEvents: React.Dispatch<React.SetStateAction<AdminEvent[]>>
    events: AdminEvent[]
}

const FiltersAndSearches = ({ filteredEvents, searchTerm, setSearchTerm, statusFilter, setStatusFilter, categoryFilter, setCategoryFilter, setEvents, events }: FiltersAndSearchesProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Event Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search events or organizers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="University-wide">University-wide</SelectItem>
                            <SelectItem value="Department">Department</SelectItem>
                            <SelectItem value="Club">Club</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Events Grid */}
                <EventTable filteredEvents={filteredEvents} setEvents={setEvents} events={events} />
            </CardContent>
        </Card>
    )
}

export default FiltersAndSearches