import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ComparisonTable from "./ComparisonTable";
import PricingSection from "@/app/(pages)/Home/PricingSection";

export default function SubscriptionsPage() {
    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white">
            <Header />

            <main className="flex flex-col py-18">
                <PricingSection/>
                <ComparisonTable />
            </main>

            <Footer />
        </div>
    );
}
