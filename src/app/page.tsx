import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import DemoSection from "@/components/demo-section"
import BenefitsSection from "@/components/benefits-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <DemoSection />
          <BenefitsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
  )
}