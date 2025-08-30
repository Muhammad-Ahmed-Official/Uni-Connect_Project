import React from 'react'
import { Button } from "@/components/ui/button"
import {
    ArrowRight
} from "lucide-react"
import Link from 'next/link'

const CTASection = () => {
    return (
        <section className="py-24 bg-blue-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your University Experience?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Join the growing community of students who are making the most of their academic journey.
                </p>
                <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
                    <Link href="/register">
                        Start Your Journey Today
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
            </div>
        </section>
    )
}

export default CTASection