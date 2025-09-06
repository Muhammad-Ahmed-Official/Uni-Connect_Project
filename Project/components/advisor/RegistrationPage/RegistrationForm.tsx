"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Building, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";


const formSchema = z.object({
    username: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    departmentName: z.string().min(1, "Required"),
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    idNumber: z.string().min(1, "Required"),
    role: z.enum(["department_Student_Advisor", "university_Student_Advisor"]),
    confirmPassword: z.string().min(6, "Minimum 6 characters"),
    officeLocation: z.string().min(1, "Required"),
    officeTiming: z.string().min(1, "Required"),
    specialties: z.array(z.object({
        value: z.string().min(1, "Specialty required")
    })).min(1, "At least one specialty required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const {
        register,
        control,
        handleSubmit,
        formState: { errors: rhfErrors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            departmentName: '',
            firstName: '',
            lastName: '',
            idNumber: '',
            confirmPassword: '',
            role: 'department_Student_Advisor',
            officeLocation: '',
            officeTiming: '',
            specialties: [{ value: "" }]
        }
    })

    // const { fields, append } = useFieldArray({
    //     control,
    //     name: "specialties"
    // });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await axios.post('/api/advisor/signup', data);
            // Handle response
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User Details Section */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                            <Input
                                id="firstName"
                                type="text"
                                placeholder="Enter your first name" className={`${rhfErrors.firstName ? "border-red-500" : ""}`} {...register('firstName')}
                            />
                        </div>
                        {rhfErrors.firstName && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {rhfErrors.firstName.message as string}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                            <Input
                                id="lastName"
                                type="text"
                                placeholder="Enter your last name" className={`${rhfErrors.lastName ? "border-red-500" : ""}`} {...register('lastName')}
                            />
                        </div>
                        {rhfErrors.lastName && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {rhfErrors.lastName.message as string}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="username"
                                type="text"
                                placeholder="Username" className={`pl-10 ${rhfErrors.username ? "border-red-500" : ""}`} {...register('username')}
                            />
                        </div>
                        {rhfErrors.username && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {rhfErrors.username.message as string}
                            </p>
                        )}
                    </div>
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="departmentName">Department Name</Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="departmentName"
                                type="text"
                                placeholder="Enter your department name" className={`pl-10 ${rhfErrors.departmentName ? "border-red-500" : ""}`} {...register('departmentName')}
                            />
                        </div>
                        {rhfErrors.departmentName && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {rhfErrors.departmentName.message as string}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="idNumber">Employee ID Number</Label>
                        <div className="relative">
                            <Input
                                id="idNumber"
                                type="text"
                                placeholder="Enter your ID card number" className={`${rhfErrors.idNumber ? "border-red-500" : ""}`} {...register('idNumber')}
                            />
                        </div>
                        {rhfErrors.idNumber && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {rhfErrors.idNumber.message as string}
                            </p>
                        )}
                    </div>
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
                        className={`pl-10 pr-10 ${rhfErrors.password ? "border-red-500" : ""}`}
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

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`pl-10 pr-10 ${rhfErrors.confirmPassword ? "border-red-500" : ""}`}
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
                {rhfErrors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {rhfErrors.confirmPassword.message as string}
                        {/* {
                             && (
                                <span className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Passwords do not match
                                </span>
                            )
                        } */}
                    </p>
                )}
            </div>

            {/* Advisor Details Section */}
            {/* <div className="space-y-4">
                <h2 className="text-xl font-semibold">Advisor Information</h2>
                <div>
                    <label>Role</label>
                    <select {...register("role")} className="select">
                        <option value="">Select Role</option>
                        <option value="department_Student_Advisor">Department Advisor</option>
                        <option value="university_Student_Advisor">University Advisor</option>
                    </select>
                    {rhfErrors.role && <div className="error">{rhfErrors.role.message}</div>}
                </div>

                <div>
                    <label>Office Location</label>
                    <input {...register("officeLocation")} className="input" />
                    {rhfErrors.officeLocation && <div className="error">{rhfErrors.officeLocation.message}</div>}
                </div>

                <div>
                    <label>Office Hours</label>
                    <input {...register("officeTiming")} className="input" placeholder="e.g., Mon-Fri 9AM-5PM" />
                    {rhfErrors.officeTiming && <div className="error">{rhfErrors.officeTiming.message}</div>}
                </div>

                <div>
                    <label>Specialties</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2">
                            <input
                                {...register(`specialties.${index}.value`)}
                                className="input flex-1"
                                placeholder="Enter specialty"
                            />
                            {index === fields.length - 1 && (
                                <Button
                                    type="button"
                                    onClick={() => append({ value: "" })}
                                >
                                    Add More
                                </Button>
                            )}
                        </div>
                    ))}
                    {rhfErrors.specialties && <div className="error">{rhfErrors.specialties.message}</div>}
                </div>
            </div> */}

            <Button type="submit" className="w-full">
                Complete Registration
            </Button>
        </form>
    )
}

export default RegistrationForm