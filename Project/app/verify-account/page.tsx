import { OTPVerification } from "@/components/OTPVerificationPage/OTPVerification";

export default async function OTPPage(props: {
  searchParams: Promise<{ [key: string]: string | null }>
}) {
  const searchParams = await props.searchParams
  const encodedEmail = searchParams.email
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <OTPVerification email={email} />
    </main>
  )
}