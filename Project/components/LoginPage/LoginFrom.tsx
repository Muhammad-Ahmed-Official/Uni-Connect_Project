"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

const LoginFrom = () => {
    const { register, handleSubmit, formState: {
        errors: rhfErrors
    } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [resetEmail, setResetEmail] = useState<string>("")
    const [isResetLoading, setIsResetLoading] = useState<boolean>(false)

    const router = useRouter()
    const { toast } = useToast()

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });
            if (res?.error) {
                toast({
                    title: "Login failed",
                    description: res?.error || "Invalid email or password. Please try again.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Login successful!",
                    description: "Welcome back to Uni-Connect.",
                });
                router.push("/dashboard");
            }
            setIsLoading(false);
        } catch (error) {
            toast({
                title: "Login failed",
                description: "Invalid email or password. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!resetEmail) {
            toast({
                title: "Email required",
                description: "Please enter your email address.",
                variant: "destructive",
            })
            return
        }

        setIsResetLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: "Reset link sent!",
                description: "Check your email for password reset instructions.",
            })

            setResetEmail("")
        } catch (error) {
            toast({
                title: "Reset failed",
                description: "Unable to send reset email. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsResetLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your university email" className={`pl-10 ${rhfErrors.email ? "border-red-500" : ""}`} {...register('email')}
                    />
                </div>
                {rhfErrors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {rhfErrors.email.message as string}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password" className={`pl-10 pr-10 ${rhfErrors.password ? "border-red-500" : ""}`}
                        {...register('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {rhfErrors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {rhfErrors.password.message as string}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <input
                        id="remember"
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                    </Label>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link" className="px-0 text-sm text-blue-600 hover:text-blue-700">
                            Forgot password?
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Reset Password</DialogTitle>
                            <DialogDescription>
                                Enter your email address and we'll send you a link to reset your password.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handlePasswordReset} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reset-email">Email Address</Label>
                                <Input
                                    id="reset-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isResetLoading}>
                                {isResetLoading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
            </Button>
        </form>
    )
}

export default LoginFrom