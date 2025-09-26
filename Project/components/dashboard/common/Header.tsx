import React from 'react'

interface HeaderProps {
    title: string
    description: string
}

const Header = ({ title, description }: HeaderProps) => {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

export default Header