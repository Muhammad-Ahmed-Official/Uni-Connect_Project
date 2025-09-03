import { useEffect, useState } from "react"
import axios from "axios"
import { UniversityEvent, UniversityEscalation, UniversityStats } from "@/types/university"

const API_BASE = "/api/university"

export const useUniversityEvents = () => {
  const [events, setEvents] = useState<UniversityEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  })

  const fetchEvents = async (page = 1, limit = 10) => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE}/events`, {
        params: { page, limit }
      })
      setEvents(res.data.events)
      setPagination(res.data.pagination)
    } catch (err) {
      setError("Failed to fetch events")
    } finally {
      setLoading(false)
    }
  }

  const createEvent = async (eventData: Omit<UniversityEvent, 'id'>) => {
    try {
      const res = await axios.post(`${API_BASE}/events`, eventData)
      await fetchEvents(pagination.page, pagination.limit)
      return res.data.event
    } catch (err) {
      setError("Failed to create event")
      throw err
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return {
    events,
    loading,
    error,
    pagination,
    fetchEvents,
    createEvent
  }
}

export const useUniversityEscalations = () => {
  const [escalations, setEscalations] = useState<UniversityEscalation[]>([])
  const [stats, setStats] = useState<UniversityStats>({
    byStatus: [],
    byPriority: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEscalations = async (filters = {}) => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE}/escalations`, { params: filters })
      setEscalations(res.data.escalations)
      setStats(res.data.stats)
    } catch (err) {
      setError("Failed to fetch escalations")
    } finally {
      setLoading(false)
    }
  }

  const assignEscalation = async (escalationId: string, advisorId: string, notes: string) => {
    try {
      await axios.patch(`${API_BASE}/escalations`, {
        escalation_id: escalationId,
        advisor_id: advisorId,
        notes
      })
      await fetchEscalations()
    } catch (err) {
      setError("Failed to assign escalation")
      throw err
    }
  }

  useEffect(() => {
    fetchEscalations()
  }, [])

  return {
    escalations,
    stats,
    loading,
    error,
    fetchEscalations,
    assignEscalation
  }
}
