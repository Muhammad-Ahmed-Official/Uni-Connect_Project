"use client";

import { Event } from '@/app/dashboard/events/page';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'

function CalendarView({ events, onEventClick }: { events: Event[]; onEventClick: (event: Event) => void }) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ]

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
    }

    const getEventsForDay = (day: number) => {
        const currentDate = new Date(currentYear, currentMonth, day);

        return events.filter((event) => {
            const eventDate = new Date(event.eventDetails.start_date);

            return eventDate.getFullYear() === currentDate.getFullYear() &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getDate() === currentDate.getDate();
        })
    }

    const navigateMonth = (direction: number) => {
        let newMonth = currentMonth + direction
        let newYear = currentYear

        if (newMonth > 11) {
            newMonth = 0
            newYear++
        } else if (newMonth < 0) {
            newMonth = 11
            newYear--
        }

        setCurrentMonth(newMonth)
        setCurrentYear(newYear)
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    return (
        <div className="bg-white rounded-lg border">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">
                    {monthNames[currentMonth]} {currentYear}
                </h2>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth(-1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth(1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                        key={day}
                        className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500"
                    >
                        {day}
                    </div>
                ))}

                {days.map((day, index) => (
                    <div
                        key={index}
                        className="bg-white min-h-[120px] p-2 border border-gray-100"
                    >
                        {day && (
                            <>
                                <div className="text-sm font-medium text-gray-900 mb-1">
                                    {day}
                                </div>
                                <div className="space-y-1 max-h-20 overflow-y-auto">
                                    {getEventsForDay(day).map((event) => (
                                        <button
                                            key={event._id}
                                            onClick={() => onEventClick(event)}
                                            className="w-full text-left p-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors truncate"
                                            title={event.title}
                                        >
                                            <div className="truncate font-medium">
                                                {event.title}
                                            </div>
                                            <div className="truncate text-blue-600">
                                                {formatTime(event.eventDetails.start_date)}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalendarView