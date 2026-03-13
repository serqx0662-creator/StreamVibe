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

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [movie, setMovie] = useState<any>(null);
    const [cast, setCast] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [director, setDirector] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieRes, creditsRes, similarRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}?language=ru-RU`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    }),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=ru-RU`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    }),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=ru-RU&page=1`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    })
                ]);

                const movieData = await movieRes.json();
                const creditsData = await creditsRes.json();
                const similarData = await similarRes.json();

                setMovie(movieData);
                setCast(creditsData.cast.slice(0, 15));
                setReviews(similarData.results.slice(0, 5));
                setDirector(creditsData.crew.find((person: any) => person.job === 'Director'));
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <MovieSkeleton />;
    if (!movie) return <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">Movie not found</div>;

    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white flex flex-col font-sans">
            <Header />

            <div className="flex-grow pb-20">
                <MovieDetailHero movie={movie} />

                <div className="container mx-auto px-4 md:px-10 lg:px-16 mt-16">
                    <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-8 items-start">
                        <div className="flex flex-col gap-6">
                            <DescriptionSection overview={movie.overview} />
                            <CastSection cast={cast} />
                            <ReviewsSection reviews={reviews} />
                        </div>

                        <MovieSidebar movie={movie} director={director} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function MovieSkeleton() {
    return (
        <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
            <Header />
            <div className="flex-grow p-10 md:p-20 flex flex-col gap-10">
                <Skeleton className="w-full h-[60vh] bg-[#1A1A1A] rounded-3xl" />
                <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-8">
                    <div className="flex flex-col gap-6">
                        <Skeleton className="h-[200px] bg-[#1A1A1A] rounded-2xl" />
                        <Skeleton className="h-[300px] bg-[#1A1A1A] rounded-2xl" />
                        <Skeleton className="h-[400px] bg-[#1A1A1A] rounded-2xl" />
                    </div>
                    <Skeleton className="h-[600px] bg-[#1A1A1A] rounded-2xl" />
                </div>
            </div>
            <Footer />
        </div>
    );
}