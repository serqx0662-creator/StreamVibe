"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, ArrowLeft, Play, Plus, Clock } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";

import 'swiper/css';
import 'swiper/css/pagination';

export default function MustWatchSection() {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/top_rated?language=ru-RU&page=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                            accept: 'application/json',
                        },
                    }
                );
                const data = await res.json();
                setMovies(data.results.slice(0, 10));
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-6">
                <div className="max-w-[800px]">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                        Must - Watch Movies
                    </h2>
                </div>

                <div className="flex items-center gap-2 md:gap-3 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-xl">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="must-prev-btn w-9 h-9 md:w-11 md:h-11 text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] hover:text-white rounded-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div className="must-pagination flex items-center gap-1 px-1 md:px-2" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="must-next-btn w-9 h-9 md:w-11 md:h-11 text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] hover:text-white rounded-lg transition-all"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1.5}
                slidesPerGroup={1}
                navigation={{ prevEl: '.must-prev-btn', nextEl: '.must-next-btn' }}
                pagination={{
                    el: '.must-pagination',
                    clickable: true,
                    renderBullet: (index, className) => index < 5 ? `<span class="${className} must-bullet"></span>` : "",
                }}
                breakpoints={{
                    480: { slidesPerView: 2.2 },
                    768: { slidesPerView: 3.2, slidesPerGroup: 2 },
                    1024: { slidesPerView: 4, slidesPerGroup: 2, spaceBetween: 20 }
                }}
                loop={true}
            >
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <SwiperSlide key={i}>
                            <Skeleton className="h-[380px] md:h-[420px] w-full bg-[#1A1A1A] rounded-[16px]" />
                        </SwiperSlide>
                    ))
                ) : (
                    movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Card className="bg-[#1A1A1A] border-[#262626] p-3 md:p-4 rounded-[16px] hover:bg-[#212121] transition-all group cursor-pointer relative overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="relative aspect-[2/3] overflow-hidden rounded-xl mb-3 bg-[#262626]">
                                        {movie.poster_path && (
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button size="icon" className="w-10 h-10 bg-[#E50000] hover:bg-[#FF1A1A] rounded-full">
                                                <Play fill="white" size={18} />
                                            </Button>
                                            <Button size="icon" className="w-10 h-10 bg-[#0F0F0F]/80 border border-[#262626] hover:bg-[#1A1A1A] rounded-full">
                                                <Plus size={18} />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-white text-sm md:text-base font-medium line-clamp-1 block">
                                            {movie.title}
                                        </span>

                                        <div className="flex items-center justify-between text-xs text-[#999999]">
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span>⭐</span>
                                                <span>{movie.vote_average.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>

            <style jsx global>{`
                .must-bullet {
                    width: 12px;
                    height: 4px;
                    background-color: #333333;
                    border-radius: 999px;
                    opacity: 1 !important;
                    display: inline-block;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .swiper-pagination-bullet-active.must-bullet {
                    width: 20px;
                    background-color: #E50000;
                }
            `}</style>
        </section>
    );
}
