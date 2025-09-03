import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Reply, Eye, CheckCircle, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { AdvisorEscalation } from "@/types/advisor"

export default function EscalationTable({ 
  escalations,
  onUpdate 
}: { 
  escalations: AdvisorEscalation[]
  onUpdate: (escalationId: string, updates: any) => Promise<void>
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved': return <Badge variant="secondary">{status}</Badge>
      case 'In Progress': return <Badge variant="default">{status}</Badge>
      case 'Escalated': return <Badge variant="destructive">{status}</Badge>
      default: return <Badge>{status}</Badge>
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: 'Resolved' | 'Escalated') => {
    await onUpdate(id, { status: newStatus })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Student</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {escalations.map((escalation) => (
          <TableRow key={escalation._id}>
            <TableCell className="font-medium">{escalation.title}</TableCell>
            <TableCell>
              {escalation.student_id.firstName} {escalation.student_id.lastName}
              <span className="text-muted-foreground block text-xs">
                {escalation.student_id.studentId}
              </span>
            </TableCell>
            <TableCell>
              <Badge variant={
                escalation.priority === 'High' ? 'destructive' :
                escalation.priority === 'Medium' ? 'default' : 'secondary'
              }>
                {escalation.priority}
              </Badge>
            </TableCell>
            <TableCell>{getStatusBadge(escalation.status)}</TableCell>
            <TableCell>
              {new Date(escalation.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              {escalation.status === 'In Progress' && (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleStatusUpdate(escalation._id, 'Resolved')}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleStatusUpdate(escalation._id, 'Escalated')}
                  >
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
