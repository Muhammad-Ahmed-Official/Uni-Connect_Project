"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
// import { columns } from "./columns"
import EventForm from "@/components/university/EventForm"
import { useUniversityEvents } from "@/hooks/useUniversity"

export default function EventManagement() {
  const { events, createEvent } = useUniversityEvents()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <EventForm onSubmit={createEvent}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </EventForm>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            University Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={events}
            searchKey="title"
            filters={[
              { key: "status", label: "Status", options: ["Draft", "Published", "Archived"] },
              { key: "category", label: "Category" }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
