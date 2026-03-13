"use client";

import { useEffect, useState, use } from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Skeleton } from "@/app/components/ui/skeleton";
import MovieDetailHero from "./MovieDetailHero";
import DescriptionSection from "./DescriptionSection";
import CastSection from "./CastSection";
import ReviewsSection from "./ReviewsSection";
import MovieSidebar from "./MovieSidebar";
import TrialCTA from "@/app/components/TrialCTA";

// Интерфейсы приведены в соответствие с требованиями Sidebar и Hero
interface Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
    runtime: number;
    spoken_languages: { iso_639_1: string; english_name: string }[];
    origin_country?: string[];
    tagline?: string;
}

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface Director {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
}

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<CastMember[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [director, setDirector] = useState<Director | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieRes, creditsRes, similarRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-EN`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    }),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-EN`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    }),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-EN&page=1`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    })
                ]);

                const movieData = await movieRes.json();
                const creditsData = await creditsRes.json();
                const similarData = await similarRes.json();

                setMovie(movieData);
                setCast(creditsData.cast.slice(0, 15));
                setReviews(similarData.results.slice(0, 5));
                const dir = creditsData.crew.find((person: any) => person.job === 'Director');
                setDirector(dir || null);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <MovieSkeleton />;
    if (!movie) return <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center font-sans uppercase tracking-widest">Movie not found</div>;

    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white flex flex-col font-sans">
            <Header />

            <main className="flex-grow pb-20">
                <MovieDetailHero movie={movie} />

                <div className="container mx-auto px-4 md:px-10 lg:px-16 mt-16">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

                        {/* ЛЕВАЯ ЧАСТЬ (Занимает 2 колонки из 3 на XL) */}
                        <div className="xl:col-span-2 flex flex-col gap-6">
                            <DescriptionSection overview={movie.overview} />
                            <CastSection cast={cast} />
                            <ReviewsSection reviews={reviews} />
                        </div>

                        <div className="xl:col-span-1 xl:sticky xl:top-28">
                            <MovieSidebar movie={movie} director={director} />
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

function MovieSkeleton() {
    return (
        <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto px-4 md:px-10 lg:px-16 py-20 flex flex-col gap-10">
                <Skeleton className="w-full h-[60vh] bg-[#1A1A1A] rounded-[40px]" />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 flex flex-col gap-6">
                        <Skeleton className="h-[200px] bg-[#1A1A1A] rounded-2xl" />
                        <Skeleton className="h-[300px] bg-[#1A1A1A] rounded-2xl" />
                        <Skeleton className="h-[400px] bg-[#1A1A1A] rounded-2xl" />
                    </div>
                    <Skeleton className="xl:col-span-1 h-[600px] bg-[#1A1A1A] rounded-2xl" />
                </div>
            </div>
            <Footer />
        </div>
    );
}