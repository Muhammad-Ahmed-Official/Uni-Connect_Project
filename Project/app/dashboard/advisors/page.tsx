"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/dashboard/common/Header";
import Filters from "@/components/dashboard/common/Filters";
import AdvisorsList from "@/components/dashboard/AdvisorsPage/AdvisorsList";
import EscalationsList from "@/components/dashboard/AdvisorsPage/EscalationsList";
import EscalationForm from "@/components/dashboard/AdvisorsPage/EscalationForm";
import { Advisor, Escalation } from "@/types/advisor";

const advisors: Advisor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Academic Advisor",
    department: "Computer Science",
    specialties: ["Course Planning", "Career Guidance", "Research Opportunities"],
    email: "s.johnson@university.edu",
    phone: "(555) 123-4567",
    office: "CS Building, Room 301",
    rating: 4.8,
    responseTime: "Within 24 hours",
    availability: "Mon-Fri, 9AM-5PM",
    image: "/student-avatar.png",
    bio: "Dr. Johnson has been advising computer science students for over 10 years. She specializes in helping students navigate their academic journey and explore career opportunities in tech.",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    title: "Department Head & Advisor",
    department: "Engineering",
    specialties: ["Academic Planning", "Graduate School Prep", "Industry Connections"],
    email: "m.chen@university.edu",
    phone: "(555) 234-5678",
    office: "Engineering Building, Room 205",
    rating: 4.9,
    responseTime: "Within 48 hours",
    availability: "Tue-Thu, 10AM-4PM",
    image: "/student-avatar.png",
    bio: "Professor Chen brings 15 years of industry experience and has helped hundreds of engineering students achieve their academic and career goals.",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Student Success Advisor",
    department: "Business Administration",
    specialties: ["Academic Support", "Internship Guidance", "Study Abroad"],
    email: "e.rodriguez@university.edu",
    phone: "(555) 345-6789",
    office: "Business School, Room 150",
    rating: 4.7,
    responseTime: "Within 24 hours",
    availability: "Mon-Wed-Fri, 8AM-6PM",
    image: "/student-avatar.png",
    bio: "Dr. Rodriguez is passionate about student success and has extensive experience in international business and study abroad programs.",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Pre-Med Advisor",
    department: "Medicine",
    specialties: ["Medical School Prep", "MCAT Guidance", "Research Opportunities"],
    email: "j.wilson@university.edu",
    phone: "(555) 456-7890",
    office: "Medical Center, Room 402",
    rating: 4.9,
    responseTime: "Within 12 hours",
    availability: "Mon-Fri, 7AM-3PM",
    image: "/student-avatar.png",
    bio: "Dr. Wilson has guided over 200 students into medical school with his comprehensive approach to pre-med advising and MCAT preparation.",
  },
  {
    id: 5,
    name: "Prof. Lisa Thompson",
    title: "Academic Advisor",
    department: "Arts & Humanities",
    specialties: ["Creative Programs", "Graduate School", "Fellowship Applications"],
    email: "l.thompson@university.edu",
    phone: "(555) 567-8901",
    office: "Arts Building, Room 220",
    rating: 4.6,
    responseTime: "Within 24 hours",
    availability: "Tue-Thu, 11AM-5PM",
    image: "/student-avatar.png",
    bio: "Professor Thompson specializes in helping arts and humanities students explore creative career paths and secure competitive fellowships.",
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    title: "Research Advisor",
    department: "Natural Sciences",
    specialties: ["Research Projects", "PhD Programs", "Lab Placements"],
    email: "r.kim@university.edu",
    phone: "(555) 678-9012",
    office: "Science Building, Room 315",
    rating: 4.8,
    responseTime: "Within 36 hours",
    availability: "Mon-Wed-Fri, 9AM-4PM",
    image: "/student-avatar.png",
    bio: "Dr. Kim connects students with cutting-edge research opportunities and has helped numerous students secure positions in top PhD programs.",
  },
]

const escalations: Escalation[] = [
  {
    id: 1,
    title: "Course Registration Issue",
    advisor: "Dr. Sarah Johnson",
    department: "Computer Science",
    status: "In Progress",
    priority: "High",
    submittedDate: "2024-01-10",
    lastUpdate: "2024-01-12",
    description: "Unable to register for required CS courses due to prerequisite conflicts.",
    attachments: ["transcript.pdf", "course_plan.docx"],
  },
  {
    id: 2,
    title: "Graduate School Application Guidance",
    advisor: "Prof. Michael Chen",
    department: "Engineering",
    status: "Resolved",
    priority: "Medium",
    submittedDate: "2024-01-05",
    lastUpdate: "2024-01-08",
    description: "Need help with graduate school applications and recommendation letters.",
    attachments: ["resume.pdf"],
  },
  {
    id: 3,
    title: "Internship Credit Transfer",
    advisor: "Dr. Emily Rodriguez",
    department: "Business Administration",
    status: "Pending",
    priority: "Low",
    submittedDate: "2024-01-13",
    lastUpdate: "2024-01-13",
    description: "Questions about transferring internship experience for academic credit.",
    attachments: [],
  },
]

export default function AdvisorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const [userEscalations, setUserEscalations] = useState<Escalation[]>(escalations);

  const departments = ["All Departments", ...Array.from(new Set(advisors.map((advisor) => advisor.department)))];

  const filteredAdvisors = advisors.filter((advisor) => {
    const matchesSearch =
      advisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      advisor.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDepartment = departmentFilter === "All" || advisor.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const handleContactAdvisor = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
    setShowEscalationForm(true);
  };

  const handleSubmitEscalation = (escalationData: any) => {
    const newEscalation: Escalation = {
      id: userEscalations.length + 1,
      ...escalationData,
      lastUpdate: escalationData.submittedDate,
    };
    setUserEscalations([newEscalation, ...userEscalations]);
    setShowEscalationForm(false);
    setSelectedAdvisor(null);
  };

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header
        title="Academic Advisors"
        description="Get guidance and support from experienced academic advisors"
      />

      <Tabs defaultValue="advisors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="advisors" className="cursor-pointer" >Find Advisors</TabsTrigger>
          <TabsTrigger value="escalations" className="cursor-pointer" >My Escalations ({userEscalations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="advisors" className="space-y-6">
          {/* Filters */}
          <Filters
            options={departments}
            currentFilter={departmentFilter}
            setCurrentFilter={setDepartmentFilter}
            label="Departments"
            count={filteredAdvisors.length}
            countLabel="advisors available"
          />

          {/* Advisors List */}
          <AdvisorsList
            advisors={filteredAdvisors}
            onContactAdvisor={handleContactAdvisor}
          />
        </TabsContent>

        <TabsContent value="escalations" className="space-y-6">
          {/* Escalations List */}
          <EscalationsList escalations={userEscalations} />
        </TabsContent>
      </Tabs>

      {/* Escalation Form Dialog */}
      <Dialog open={showEscalationForm} onOpenChange={setShowEscalationForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Advisor</DialogTitle>
            <DialogDescription>
              Submit your question or concern to get personalized guidance from your advisor.
            </DialogDescription>
          </DialogHeader>
          {selectedAdvisor && (
            <EscalationForm
              advisor={selectedAdvisor}
              onSubmit={handleSubmitEscalation}
              onClose={() => setShowEscalationForm(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
