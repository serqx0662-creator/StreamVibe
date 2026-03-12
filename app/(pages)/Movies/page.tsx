import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import MovieHero from "@/app/(pages)/Movies/MovieHero";

export default function Page() {
    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white">
            <Header />

            <main className="flex flex-col gap-10 md:gap-20">
                <MovieHero />

                <div className="container mx-auto px-4 md:px-10 lg:px-16 space-y-24 md:space-y-32">

                </div>
            </main>

            <Footer />
        </div>
    )
}
