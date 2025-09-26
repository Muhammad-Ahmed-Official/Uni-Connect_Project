import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'

const FeaturedSection = () => {
    return (
        <div className="mt-8">
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Join the Study Group Challenge!</h3>
                            <p className="text-blue-100 mb-4">
                                Form study groups with students from different departments and earn points for collaboration.
                            </p>
                            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                                Learn More
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                        <div className="hidden md:block">
                            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                                <Star className="w-12 h-12 text-yellow-300" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FeaturedSection