"use client"

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import StatsCards from "@/components/admin/EscalationsPage/StatsCards";
import EscalationFilters from "@/components/admin/EscalationsPage/EscalationFilters";
import EscalationCard from "@/components/admin/EscalationsPage/EscalationCard";
import AssignEscalationDialog from "@/components/admin/EscalationsPage/AssignEscalationDialog";
import ViewEscalationDialog from "@/components/admin/EscalationsPage/ViewEscalationDialog";
import EscalationsEmptyState from "@/components/admin/EscalationsPage/EscalationsEmptyState";
import { Escalation, Advisor, StatsCard } from "@/types/admin-escalations";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

const mockEscalations: Escalation[] = [
  {
    id: 1,
    title: "Course Registration Issue",
    description: "Unable to register for required courses due to system error",
    student: "John Smith",
    studentId: "ST001",
    category: "Academic",
    priority: "High",
    status: "pending",
    assignedAdvisor: null,
    submittedDate: "2024-03-10T10:30:00",
    responseTime: null,
    attachments: ["screenshot.png", "error_log.txt"],
    department: "Computer Science",
  },
  {
    id: 2,
    title: "Financial Aid Delay",
    description: "Financial aid disbursement has been delayed for over 2 weeks",
    student: "Sarah Johnson",
    studentId: "ST002",
    category: "Financial",
    priority: "High",
    status: "in-progress",
    assignedAdvisor: "Dr. Wilson",
    submittedDate: "2024-03-08T14:15:00",
    responseTime: "2 hours",
    attachments: ["aid_documents.pdf"],
    department: "Financial Aid",
  },
  {
    id: 3,
    title: "Dormitory Maintenance Request",
    description: "Heating system not working in dormitory room 204B",
    student: "Mike Davis",
    studentId: "ST003",
    category: "Housing",
    priority: "Medium",
    status: "resolved",
    assignedAdvisor: "Ms. Brown",
    submittedDate: "2024-03-05T09:20:00",
    responseTime: "1 hour",
    attachments: [],
    department: "Housing Services",
  },
  {
    id: 4,
    title: "Grade Appeal Request",
    description: "Requesting review of final grade for MATH 301",
    student: "Emily Chen",
    studentId: "ST004",
    category: "Academic",
    priority: "Medium",
    status: "in-progress",
    assignedAdvisor: "Prof. Anderson",
    submittedDate: "2024-03-07T16:45:00",
    responseTime: "4 hours",
    attachments: ["assignment_copy.pdf", "grade_report.pdf"],
    department: "Mathematics",
  },
]

const mockAdvisors: Advisor[] = [
  { id: 1, name: "Dr. Wilson", department: "Financial Aid", activeEscalations: 3 },
  { id: 2, name: "Ms. Brown", department: "Housing Services", activeEscalations: 1 },
  { id: 3, name: "Prof. Anderson", department: "Mathematics", activeEscalations: 2 },
  { id: 4, name: "Dr. Smith", department: "Computer Science", activeEscalations: 0 },
]

export default function AdminEscalationsPage() {
  const [escalations, setEscalations] = useState<Escalation[]>(mockEscalations);
  const [selectedEscalation, setSelectedEscalation] = useState<Escalation | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Stats calculation
  const totalEscalations = escalations.length;
  const pendingEscalations = escalations.filter((e) => e.status === "pending").length;
  const inProgressEscalations = escalations.filter((e) => e.status === "in-progress").length;
  const resolvedEscalations = escalations.filter((e) => e.status === "resolved").length;
  const avgResponseTime = "2.5 hours";

  const stats: StatsCard[] = [
    {
      title: "Total Escalations",
      value: totalEscalations,
      description: "+3 from last week",
      icon: AlertTriangle,
    },
    {
      title: "Pending",
      value: pendingEscalations,
      description: "Awaiting assignment",
      icon: AlertCircle,
      iconColor: "text-yellow-600",
    },
    {
      title: "In Progress",
      value: inProgressEscalations,
      description: "Being handled",
      icon: Clock,
      iconColor: "text-blue-600",
    },
    {
      title: "Resolved",
      value: resolvedEscalations,
      description: "Completed",
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
    {
      title: "Avg Response",
      value: avgResponseTime,
      description: "Response time",
      icon: TrendingUp,
    },
  ];

  // Filter escalations
  const filteredEscalations = escalations.filter((escalation) => {
    const matchesSearch =
      escalation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escalation.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escalation.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || escalation.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || escalation.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || escalation.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Action handlers
  const handleAssignEscalation = (escalationId: number, advisorName: string) => {
    setEscalations((escalations) =>
      escalations.map((escalation) =>
        escalation.id === escalationId
          ? { ...escalation, assignedAdvisor: advisorName, status: "in-progress" }
          : escalation,
      ),
    );
    setIsAssignDialogOpen(false);
    toast({
      title: "Escalation Assigned",
      description: `Escalation has been assigned to ${advisorName}.`,
    });
  };

  const handleStatusChange = (escalationId: number, newStatus: "pending" | "in-progress" | "resolved") => {
    setEscalations((escalations) =>
      escalations.map((escalation) =>
        escalation.id === escalationId ? { ...escalation, status: newStatus } : escalation,
      ),
    );
    toast({
      title: "Status Updated",
      description: `Escalation status has been updated to ${newStatus}.`,
    });
  };

  const handleResolveEscalation = (escalationId: number) => {
    handleStatusChange(escalationId, "resolved");
  };

  // Badge helper functions
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Escalation Monitoring</h1>
          <p className="text-gray-600">Monitor and manage student escalations and advisor assignments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Filters */}
      <EscalationFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />

      {/* Escalations List */}
      <div className="grid gap-4">
        {filteredEscalations.length === 0 ? (
          <EscalationsEmptyState />
        ) : (
          filteredEscalations.map((escalation) => (
            <EscalationCard
              key={escalation.id}
              escalation={escalation}
              onView={(esc) => {
                setSelectedEscalation(esc);
                setIsViewDialogOpen(true);
              }}
              onAssign={(esc) => {
                setSelectedEscalation(esc);
                setIsAssignDialogOpen(true);
              }}
              onStatusChange={handleStatusChange}
              onResolve={handleResolveEscalation}
            />
          ))
        )}
      </div>

      {/* Dialogs */}
      <AssignEscalationDialog
        isOpen={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        escalation={selectedEscalation}
        advisors={mockAdvisors}
        onAssign={handleAssignEscalation}
      />

      <ViewEscalationDialog
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        escalation={selectedEscalation}
        getStatusBadge={getStatusBadge}
        getPriorityBadge={getPriorityBadge}
      />
    </div>
  );
}