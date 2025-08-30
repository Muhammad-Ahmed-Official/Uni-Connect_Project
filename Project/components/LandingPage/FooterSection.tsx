import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface FooterLink {
    href: string
    label: string
}

const supportLinks: FooterLink[] = [
    { href: '/help', label: 'Help Center' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
]

const quickLinks: FooterLink[] = [
    { href: '/departments', label: 'Departments' },
    { href: '/events', label: 'Events' },
    { href: '/advisors', label: 'Advisors' },
    { href: '/past-papers', label: 'Past Papers' },
]

const FooterSection = () => {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">Uni-Connect</span>
                        </div>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Empowering students to connect, collaborate, and excel in their academic journey through innovative
                            social and educational tools.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-400">
                            {supportLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Uni-Connect. All rights reserved. Built for students, by students.</p>
                </div>
            </div>
        </footer>
    )
}

export default FooterSection