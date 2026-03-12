import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroSection from "@/app/(pages)/Home/HeroSection";
import CategorySection from "@/app/(pages)/Home/CategorySection";
import DevicesSection from "@/app/(pages)/Home/DevicesSection";
import PricingSection from "@/app/(pages)/Home/PricingSection";
import TrialCTA from "@/app/components/TrialCTA";
import FaqSection from "@/app/(pages)/Home/FAQSection";



export default function Page() {
    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white">
            <Header />

            <main className="flex flex-col gap-10 md:gap-20">
                <HeroSection />

                <div className="container mx-auto px-4 md:px-10 lg:px-16 space-y-24 md:space-y-32">
                    <CategorySection />

                    <DevicesSection />

                    <FaqSection/>

                    <PricingSection/>

                    <TrialCTA />
                </div>
            </main>

            <Footer />
        </div>
    )
}