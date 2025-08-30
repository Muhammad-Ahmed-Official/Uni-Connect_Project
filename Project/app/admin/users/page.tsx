import Header from "@/components/admin/users/Header"
import StatsCards from "@/components/admin/users/StatsCards"
import FiltersAndSearches from "@/components/admin/users/FiltersAndSearches"

const mockUsers: User[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "student",
    department: "Computer Science",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-03-10",
    avatar: "/student-avatar.png",
  },
  {
    id: 2,
    name: "Dr. Michael Smith",
    email: "m.smith@university.edu",
    role: "advisor",
    department: "Engineering",
    status: "active",
    joinDate: "2020-08-20",
    lastActive: "2024-03-11",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Emily Chen",
    email: "emily.chen@university.edu",
    role: "student",
    department: "Business Administration",
    status: "active",
    joinDate: "2023-09-01",
    lastActive: "2024-03-09",
    avatar: "/student-avatar.png",
  },
  {
    id: 4,
    name: "Prof. David Wilson",
    email: "d.wilson@university.edu",
    role: "admin",
    department: "Mathematics",
    status: "active",
    joinDate: "2019-01-10",
    lastActive: "2024-03-11",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 5,
    name: "Jessica Rodriguez",
    email: "j.rodriguez@university.edu",
    role: "student",
    department: "Psychology",
    status: "suspended",
    joinDate: "2023-01-20",
    lastActive: "2024-02-28",
    avatar: "/student-avatar.png",
  },
  {
    id: 6,
    name: "Dr. Lisa Anderson",
    email: "l.anderson@university.edu",
    role: "advisor",
    department: "Biology",
    status: "active",
    joinDate: "2021-03-15",
    lastActive: "2024-03-10",
    avatar: "/placeholder-user.jpg",
  },
]

export default function UserManagement() {
  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header />

      {/* Stats Cards */}
      <StatsCards users={mockUsers} />

      {/* Filters and Search */}
      <FiltersAndSearches users={mockUsers} />
    </div>
  )
}
