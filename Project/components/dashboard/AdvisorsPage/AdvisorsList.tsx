import AdvisorCard from "@/components/dashboard/AdvisorsPage/AdvisorCard";
import { Advisor } from "@/types/advisor";
import { Search } from "lucide-react";

interface AdvisorsListProps {
    advisors: Advisor[];
    onContactAdvisor: (advisor: Advisor) => void;
}

export default function AdvisorsList({ advisors, onContactAdvisor }: AdvisorsListProps) {
    if (advisors.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No advisors found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor) => (
                <AdvisorCard
                    key={advisor.id}
                    advisor={advisor}
                    onContact={onContactAdvisor}
                />
            ))}
        </div>
    );
}