'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, Eye, EyeOff, User, AlertCircle } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from "axios"
import { signIn } from 'next-auth/react'

const departments = [
    "Computer Science",
    "Engineering",
    "Business Administration",
    "Medicine",
    "Law",
    "Arts & Humanities",
    "Natural Sciences",
    "Social Sciences",
    "Education",
    "Architecture",
]

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters").regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
    confirmPassword: z.string(),
    department: z.string().min(1, "Please select your department"),
    studentId: z.string().min(1, "Student ID is required"),
    agreeToTerms: z.boolean().refine(v => v === true, "You must agree to the terms and conditions"),
    role: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})
type FormData = z.infer<typeof schema>

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            department: "",
            studentId: "",
            agreeToTerms: false,
            role: "student"
        }
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()
    const { toast } = useToast();


    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        try {
            await axios.post('/api/auth/register', data);
            toast({ title: 'Account created successfully!', description: 'Welcome to Uni-Connect.' })
            router.push('/login')
        } catch (error) {
            toast({ title: 'Registration failed', description: 'Unable to create account.', variant: 'destructive' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="firstName"
                            placeholder="First name"
                            className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
                            {...register('firstName')}
                        />

                    </div>
                    {errors.firstName && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.firstName.message as string}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        placeholder="Last name"
                        className={errors.lastName ? "border-red-500" : ""}
                        {...register('lastName')}
                    />
                    {errors.lastName && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.lastName.message as string}
                        </p>
                    )}
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="your.email@university.edu"
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        {...register('email')}
                    />

                </div>
                {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message as string}
                    </p>
                )}
            </div>

            {/* Department and Student ID */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                        value={watch('department')}
                        onValueChange={(value) => setValue('department', value, { shouldValidate: true })}
                    >
                        <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                    {dept}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.department && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.department.message as string}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" placeholder="Student ID" className={errors.studentId ? "border-red-500" : ""} {...register('studentId')} />
                    {errors.studentId && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.studentId.message as string}
                        </p>
                    )}
                </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
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
                {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.password.message as string}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                        {...register('confirmPassword')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword.message as string}
                    </p>
                )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="terms"
                    checked={watch('agreeToTerms')}
                    onCheckedChange={(checked) => setValue('agreeToTerms', Boolean(checked), { shouldValidate: true })}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                        Privacy Policy
                    </Link>
                </Label>
            </div>
            {errors.agreeToTerms && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.agreeToTerms.message as string}
                </p>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
        </form>
    )
}

export default RegistrationForm