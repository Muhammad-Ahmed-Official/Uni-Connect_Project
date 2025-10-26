import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StatsCard {
  title: string;
  value: string | number;
  // description: string;
  icon: React.ElementType;
  iconColor?: string;
  trend?: string;
}

interface StatsCardsProps {
  stats: StatsCard[];
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.iconColor || "text-gray-500"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              {/* <p className="text-xs text-gray-600">{stat.description}</p> */}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;