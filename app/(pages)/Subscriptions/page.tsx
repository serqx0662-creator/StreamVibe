import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PricingPlans from "./PricingPlans";
import ComparisonTable from "./ComparisonTable";

export default function SubscriptionsPage() {
    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white">
            <Header />

            <main className="flex flex-col">
                <PricingPlans />
                <ComparisonTable />
            </main>

            <Footer />
        </div>
    );
}
