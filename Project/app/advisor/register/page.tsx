import RegistrationForm from "@/components/advisor/RegistrationPage/RegistrationForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap } from "lucide-react";
import Link from "next/link";



export default function AdvisorSignupPage() {


  return (
    <div className="">
      {/* <h1 className="text-2xl font-bold mb-6">Advisor Registration</h1> */}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          {/* Header */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1">
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2 text-center">Join Uni-Connect</CardTitle>
              <CardDescription className="text-center text-gray-600">Fill in your details to get started</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Social Login Buttons ==> TODO*/}
              {/* <SocialLoginButtons /> */}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                {/* <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or register with email</span>
                </div> */}
              </div>

              {/* Registration Form */}
              <RegistrationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
