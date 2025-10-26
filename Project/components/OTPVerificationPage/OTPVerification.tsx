"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { redirect, useRouter } from "next/navigation"
import { ApiErrorResponse } from "@/types/ApiErrorResponse"

export function OTPVerification({ email }: { email: string | null }) {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const [isLoading, setIsLoading] = useState(false)
    const [isRedirecting, setIsRedirecting] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [error, setError] = useState("");
    const { toast } = useToast();
    const router = useRouter();


    const handleInputChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1) // Keep only the last digit

        setOtp(newOtp)

        // Auto-focus to next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`)
            nextInput?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`)
            prevInput?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text")
        const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6)

        const newOtp = [...otp]
        digits.forEach((digit, index) => {
            if (index < 6) {
                newOtp[index] = digit
            }
        })
        setOtp(newOtp)

        // Focus on the last filled input or the next empty one
        const lastFilledIndex = newOtp.findIndex((val) => val === "")
        const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex
        setTimeout(() => {
            document.getElementById(`otp-${focusIndex}`)?.focus()
        }, 0)
    }

    const handleVerify = async () => {
        const otpCode = otp.join("")
        setIsLoading(true);
        if (otpCode.length !== 6) {
            setError("Please enter all 6 digits")
            return
        }
        try {
            await axios.post("/api/auth/verifyCode", { code: otpCode, email: email as string })

            toast({ title: 'Verification successful!', description: 'Your account has been verified successfully.', variant: "success" });
            setError("")
            setIsRedirecting(true);
            router.push('/login')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error.response?.data as ApiErrorResponse;
                setError(serverError?.message || "Verification failed. Please try again.")
                setTimeout(() => setError(""), 3000);
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = async () => {
        try {
            setIsResending(true)
            await axios.post("/api/auth/resend", { email: email as string })
            toast({ title: 'OTP resent successfully!', description: `A new OTP has been sent to ${email}.`, variant: "success" });
        }
        catch (err) {
            setError("Failed to resend OTP. Please try again.")
        } finally {
            setIsResending(false)
        }
    };

    return (
        <Card className="w-full max-w-md p-8 shadow-lg">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">Verify OTP</h1>
                    <p className="text-muted-foreground">Enter the 6-digit code sent to your email</p>
                </div>

                {/* OTP Input Fields */}
                <div className="flex justify-center gap-3 flex-wrap">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-12 text-center text-2xl font-bold border-2 border-input rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-background text-foreground"
                            placeholder="•"
                        />
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Verify Button */}
                <Button
                    onClick={handleVerify}
                    disabled={isLoading || otp.some((digit) => digit === "")}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                    {isLoading ? "Verifying..." : isRedirecting ? "Redirecting..." : "Verify OTP"}
                </Button>

                {/* Resend Link */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Didn't receive the code?{" "}
                        <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer" onClick={handleResend}>
                            {isResending ? "Resending..." : "Resend OTP"}
                        </button>
                    </p>
                </div>
            </div>
        </Card>
    )
}