import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SupportHero from "./SupportHero";
import TrialCTA from "@/app/components/TrialCTA";
import FAQSection from "@/app/(pages)/Home/FAQSection";

export default function SupportPage() {
    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white">
            <Header />

            <main className="flex flex-col">
                <SupportHero />
                <FAQSection/>
                <TrialCTA />
            </main>

            <Footer />
        </div>
    );
}
