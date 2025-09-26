import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

interface FiltersProps {
    options: string[]
    currentFilter: string
    setCurrentFilter: (value: string) => void
    label?: string
    count?: number
    countLabel?: string
}

const Filters = ({
    options,
    currentFilter,
    setCurrentFilter,
    label = "Items",
    count,
    countLabel = "items available"
}: FiltersProps) => {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                            <Filter className="h-4 w-4 mr-2" />
                            Sort by: <span className="capitalize">{currentFilter === "All" ? `All ${label}` : currentFilter}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {options.map((opt) => (
                            <DropdownMenuItem key={opt} onClick={() => setCurrentFilter(opt)} className={`capitalize cursor-pointer ${currentFilter === opt ? "font-bold bg-gray-200" : ""}`} >
                                {opt}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {typeof count === "number" && (
                <div className="text-sm text-gray-500">
                    {count} {countLabel}
                </div>
            )}
        </div>
    )
}

export default Filters