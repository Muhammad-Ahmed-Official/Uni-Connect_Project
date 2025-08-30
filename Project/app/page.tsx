import CTASection from "@/components/LandingPage/CTASection"
import FeaturesSection from "@/components/LandingPage/FeaturesSection"
import FooterSection from "@/components/LandingPage/FooterSection"
import HeroSection from "@/components/LandingPage/HeroSection"
import TestimonialsSection from "@/components/LandingPage/TestimonialsSection"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
