"use client";

import { useEffect, useState, use } from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Skeleton } from "@/app/components/ui/skeleton";
import TrialCTA from "@/app/components/TrialCTA";

import DescriptionSection from "@/app/(pages)/Movies/[id]/DescriptionSection";
import CastSection from "@/app/(pages)/Movies/[id]/CastSection";
import SeasonsSection from "./SeasonsSection";
import ShowDetailHero from "./ShowDetailHero";
import ShowSidebar from "./ShowSidebar";
import ReviewsSection from "@/app/(pages)/Movies/[id]/ReviewsSection";

export interface TVShow {
    id: number;
    name: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
    number_of_seasons: number;
    genres: { id: number; name: string }[];
    spoken_languages: { english_name: string; iso_639_1: string }[];
    status: string;
    tagline?: string;
    created_by: { name: string; profile_path?: string | null }[];
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface SimilarShow {
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
    overview: string;
}

export default function ShowDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [show, setShow] = useState<TVShow | null>(null);
    const [cast, setCast] = useState<CastMember[]>([]);
    const [reviews, setReviews] = useState<SimilarShow[]>([]); // Убрали any[]
    const [videoKey, setVideoKey] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [showRes, creditsRes, videoRes, similarRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-EN`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    }),
                    fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-EN`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    }),
                    fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    }),
                    fetch(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-EN&page=1`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    })
                ]);

                const showData: TVShow = await showRes.json();
                const creditsData = await creditsRes.json();
                const videoData = await videoRes.json();
                const similarData = await similarRes.json();

                setShow(showData);
                setCast(creditsData.cast.slice(0, 15));
                setReviews(similarData.results.slice(0, 5));

                const trailer = videoData.results.find((v: { type: string; site: string; key: string }) =>
                    v.type === "Trailer" && v.site === "YouTube"
                );
                setVideoKey(trailer?.key || videoData.results[0]?.key || null);

            } catch (error) {
                console.error("Error fetching TV data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <ShowSkeleton />;
    if (!show) return <div className="bg-[#0F0F0F] min-h-screen text-white flex items-center justify-center">Show not found</div>;

    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow pb-20">
                <ShowDetailHero show={show} videoKey={videoKey} />

                <div className="container mx-auto px-4 md:px-10 lg:px-16 mt-16">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                        <div className="xl:col-span-2 flex flex-col gap-10">
                            <SeasonsSection showId={show.id} seasonsCount={show.number_of_seasons} />
                            <DescriptionSection overview={show.overview} />
                            <CastSection cast={cast} />
                            <ReviewsSection reviews={reviews} />
                        </div>

                        <div className="xl:col-span-1 xl:sticky xl:top-28">
                            <ShowSidebar show={show} />
                        </div>
                    </div>
                    <div className="mt-20">
                        <TrialCTA />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function ShowSkeleton() {
    return (
        <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto px-4 md:px-10 lg:px-16 py-20">
                <Skeleton className="w-full h-[60vh] bg-[#1A1A1A] rounded-[40px] mb-10" />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-6">
                        <Skeleton className="h-40 bg-[#1A1A1A] rounded-xl" />
                        <Skeleton className="h-60 bg-[#1A1A1A] rounded-xl" />
                    </div>
                    <Skeleton className="h-[500px] bg-[#1A1A1A] rounded-xl" />
                </div>
            </div>
            <Footer />
        </div>
    );
}