// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { StatsCard } from "@/types/admin-documents";

// interface StatsCardsProps {
//     stats: StatsCard[];
// }

// export default function StatsCards({ stats }: StatsCardsProps) {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//             {stats.map((stat, index) => (
//                 <Card key={index}>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                         <stat.icon className={`h-4 w-4 ${stat.iconColor || "text-muted-foreground"}`} />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{stat.value}</div>
//                         <p className="text-xs text-muted-foreground">{stat.description}</p>
//                     </CardContent>
//                 </Card>
//             ))}
//         </div>
//     );
// }