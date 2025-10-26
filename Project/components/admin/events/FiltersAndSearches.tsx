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
    loading2:boolean
    setEventStats: (value: any) => void
}

const FiltersAndSearches = ({ filteredEvents, searchTerm, setSearchTerm, setEventStats, loading2, setEvents, events }: FiltersAndSearchesProps) => {
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
                </div>

                {/* Events Grid */}
                <EventTable loading2={loading2} setEventStats={setEventStats} filteredEvents={filteredEvents} setEvents={setEvents} events={events} />
            </CardContent>
        </Card>
    )
}

export default FiltersAndSearches