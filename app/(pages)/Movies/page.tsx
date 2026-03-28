"use client";

import React, { useState } from 'react';
import MovieHero from "@/app/(pages)/Movies/MovieHero";
import OurGenresSection from "@/app/(pages)/Movies/OurGenresSection";
import PopularTop10Section from "@/app/(pages)/Movies/PopularTop10Section";
import TrendingNowSection from "@/app/(pages)/Movies/TrendingNowSection";
import NewReleasesSection from "@/app/(pages)/Movies/NewReleasesSection";
import MustWatchSection from "@/app/(pages)/Movies/MustWatchSection";
import Header from "@/app/components/Header";
import SectionWrapper from "@/app/(pages)/Movies/SectionWrapper";
import Footer from "@/app/components/Footer";
import ShowsTrendingSection from "@/app/(pages)/Shows/ShowsTrendingSection";
import ShowsGenresSection from "@/app/(pages)/Shows/ShowsGenresSection";
import ShowsTopRatedSection from "@/app/(pages)/Shows/ShowsTopRatedSection";
import ShowsNewReleasesSection from "@/app/(pages)/Shows/ShowsNewReleasesSection";
import ShowsMustWatchSection from "@/app/(pages)/Shows/ShowsMustWatchSection";

export default function Page() {
    const [activeTab, setActiveTab] = useState<'movies' | 'shows'>('movies');

    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white font-sans">
            <Header />

            <main className="flex flex-col gap-10 md:gap-20 pb-20">
                <MovieHero />

                <div className="container mx-auto px-4 md:px-10 lg:px-16 space-y-20 md:space-y-32">

                    {/* Переключатель: виден ТОЛЬКО на мобилках (flex), на десктопе ПОЛНОСТЬЮ СКРЫТ (md:hidden) */}
                    <div className="flex md:hidden justify-center items-center">
                        <div className="inline-flex p-1.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[12px] w-full max-w-[400px]">
                            <button
                                onClick={() => setActiveTab('movies')}
                                className={`flex-1 py-3 px-4 rounded-[10px] text-sm font-semibold transition-all duration-300 ${
                                    activeTab === 'movies'
                                        ? 'bg-[#1F1F1F] text-white'
                                        : 'text-[#999999]'
                                }`}
                            >
                                Movies
                            </button>
                            <button
                                onClick={() => setActiveTab('shows')}
                                className={`flex-1 py-3 px-4 rounded-[10px] text-sm font-semibold transition-all duration-300 ${
                                    activeTab === 'shows'
                                        ? 'bg-[#1F1F1F] text-white'
                                        : 'text-[#999999]'
                                }`}
                            >
                                Shows
                            </button>
                        </div>
                    </div>

                    {/* Секция Movies */}
                    {/* На мобилках скрываем (hidden), если выбран таб Shows. На десктопе всегда показываем (md:block) */}
                    <div className={`${activeTab === 'movies' ? 'block' : 'hidden md:block'}`}>
                        <SectionWrapper label="Movies">
                            <div className="space-y-20">
                                <OurGenresSection />
                                <PopularTop10Section />
                                <TrendingNowSection />
                                <NewReleasesSection />
                                <MustWatchSection />
                            </div>
                        </SectionWrapper>
                    </div>

                    {/* Секция Shows */}
                    {/* На мобилках скрываем (hidden), если выбран таб Movies. На десктопе всегда показываем (md:block) */}
                    <div className={`${activeTab === 'shows' ? 'block' : 'hidden md:block'}`}>
                        <SectionWrapper label="Shows">
                            <div className="space-y-20">
                                <ShowsGenresSection />
                                <ShowsTopRatedSection />
                                <ShowsTrendingSection />
                                <ShowsNewReleasesSection />
                                <ShowsMustWatchSection />
                            </div>
                        </SectionWrapper>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}