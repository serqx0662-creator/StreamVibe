"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Play, Plus, ThumbsUp, Volume2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface MovieListItem {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
    overview: string;
}

export default function MovieHero() {
    const [movies, setMovies] = useState<MovieListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?language=en-EN&page=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                            accept: 'application/json',
                        },
                    }
                );
                const data = await res.json();
                setMovies(data.results.slice(0, 5));
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) return (
        <div className="px-4 md:px-10 lg:px-20 pt-25">
            <Skeleton className="w-full h-[500px] md:h-[700px] bg-[#1A1A1A] rounded-[32px]" />
        </div>
    );

    return (
        <section className="relative mt-20 w-full px-4 md:px-10 lg:px-16 pt-5">
            {movies.length > 0 && (
                <div className="relative group overflow-hidden rounded-[24px] md:rounded-[32px]">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
                        pagination={{
                            el: '.hero-pagination',
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className} hero-bullet"></span>`;
                            },
                        }}
                        className="w-full"
                    >
                        {movies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <div className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] flex items-end justify-center pb-20 md:pb-24">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
                                    </div>

                                    <div className="relative z-10 w-full max-w-[1000px] px-4 text-center">
                                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                            {movie.title}
                                        </h1>
                                        <p className="text-[#999999] text-xs md:text-sm lg:text-base mb-8 line-clamp-2 md:line-clamp-3 max-w-[850px] mx-auto">
                                            {movie.overview}
                                        </p>

                                        <div className="flex flex-wrap justify-center items-center gap-3">
                                            <Link href={`/Movies/${movie.id}`}>
                                                <Button className="bg-[#E50000] hover:bg-[#FF1A1A] w-full sm:w-auto text-white px-10 md:px-8 py-5 md:py-7 rounded-lg font-semibold flex gap-2">
                                                    <Play fill="white" size={20} /> Play Now
                                                </Button>
                                            </Link>
                                            <div className="flex gap-2">
                                                <Button size="icon" className="w-12 h-12 md:w-14 md:h-14 bg-[#0F0F0F] border border-[#262626] rounded-lg text-white hover:bg-[#1A1A1A]">
                                                    <Plus size={24} />
                                                </Button>
                                                <Button size="icon" className="w-12 h-12 md:w-14 md:h-14 bg-[#0F0F0F] border border-[#262626] rounded-lg text-white hover:bg-[#1A1A1A]">
                                                    <ThumbsUp size={24} />
                                                </Button>
                                                <Button size="icon" className="w-12 h-12 md:w-14 md:h-14 bg-[#0F0F0F] border border-[#262626] rounded-lg text-white hover:bg-[#1A1A1A]">
                                                    <Volume2 size={24} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="hidden md:flex absolute bottom-8 left-0 right-0 z-20 px-10 justify-between items-center pointer-events-none">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hero-prev pointer-events-auto w-12 h-12 bg-black/20 backdrop-blur-md border border-[#262626] text-white rounded-lg hover:bg-black/40"
                        >
                            <ArrowLeft size={20} />
                        </Button>

                        <div className="hero-pagination pointer-events-auto flex items-center justify-center gap-1.5" />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="hero-next pointer-events-auto w-12 h-12 bg-black/20 backdrop-blur-md border border-[#262626] text-white rounded-lg hover:bg-black/40"
                        >
                            <ArrowRight size={20} />
                        </Button>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .hero-bullet {
                    width: 16px;
                    height: 4px;
                    background: #333333 !important;
                    border-radius: 10px;
                    opacity: 1 !important;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    margin: 0 4px;
                }
                .swiper-pagination-bullet-active.hero-bullet {
                    width: 24px;
                    background: #E50000 !important;
                }
                .swiper-button-next, .swiper-button-prev {
                    display: none !important;
                }
            `}</style>
        </section>
    );
}