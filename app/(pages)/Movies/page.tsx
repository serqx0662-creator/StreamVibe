import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import MovieHero from "@/app/(pages)/Movies/MovieHero";
import OurGenresSection from "@/app/(pages)/Movies/OurGenresSection";
import PopularTop10Section from "@/app/(pages)/Movies/PopularTop10Section";
import TrendingNowSection from "@/app/(pages)/Movies/TrendingNowSection";
import NewReleasesSection from "@/app/(pages)/Movies/NewReleasesSection";
import MustWatchSection from "@/app/(pages)/Movies/MustWatchSection";
import SectionWrapper from "@/app/(pages)/Movies/SectionWrapper";


export default function Page() {
    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white">
            <Header />

            <main className="flex flex-col gap-10 md:gap-20">
                <MovieHero />

                <div className="container mx-auto px-4 md:px-10 lg:px-16 space-y-20 md:space-y-32">

                    {/* --- СЕКЦИЯ MOVIES --- */}
                    <SectionWrapper label="Movies">
                        <div className="space-y-20">
                            <OurGenresSection />
                            <PopularTop10Section />
                            <TrendingNowSection />
                            <NewReleasesSection />
                            <MustWatchSection />
                        </div>
                    </SectionWrapper>

                    {/* --- СЕКЦИЯ SHOWS --- */}
                    <SectionWrapper label="Shows">
                        <div className="space-y-20">
                            <OurGenresSection />
                            <PopularTop10Section />
                            <TrendingNowSection/>
                            <NewReleasesSection/>
                            <MustWatchSection />
                        </div>
                    </SectionWrapper>

                </div>
            </main>

            <Footer />
        </div>
    )
}