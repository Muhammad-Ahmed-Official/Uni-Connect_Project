"use client"

import React from 'react'
import { Button } from '../ui/button'
import { FaGoogle, FaMicrosoft } from 'react-icons/fa'
import { useToast } from '@/hooks/use-toast'

const SocialLoginButtons = () => {
    const { toast } = useToast()

    const handleSocialLogin = (provider: string) => {
        toast({
            title: `${provider} login`,
            description: "Social login integration coming soon!",
        })
    }
    return (
        <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => handleSocialLogin("Google")} className="w-full">
                <FaGoogle className="w-4 h-4 mr-2" />
                Google
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin("Microsoft")} className="w-full">
                <FaMicrosoft className="w-4 h-4 mr-2" />
                Microsoft
            </Button>
        </div>
    )
}

export default SocialLoginButtons