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

export default function MovieHero() {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Получаем популярные фильмы через TMDB API
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                            accept: 'application/json',
                        },
                    }
                );
                const data = await res.json();
                setMovies(data.results.slice(0, 5)); // Берем топ-5 для слайдера
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) return <Skeleton className="w-full h-[500px] md:h-[700px] bg-[#1A1A1A] rounded-[32px] mx-auto max-w-[95%]" />;

    return (
        <section className="relative mt-20 w-full px-4 md:px-10 lg:px-20 pt-5">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
                pagination={{
                    el: '.hero-pagination',
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} hero-bullet"></span>`;
                    },
                }}
                className="rounded-[24px] md:rounded-[32px] overflow-hidden"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <Link href={`/Movies/${movie.id}`}>
                            <div className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] flex items-end justify-center pb-10 md:pb-16">
                                {/* Фоновое изображение */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
                                </div>

                                {/* Контент */}
                                <div className="relative z-10 w-full max-w-[1000px] px-4 text-center">
                                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                        {movie.title}
                                    </h1>
                                    <p className="text-[#999999] text-xs md:text-sm lg:text-base mb-8 line-clamp-2 md:line-clamp-3 max-w-[850px] mx-auto">
                                        {movie.overview}
                                    </p>

                                    {/* Кнопки */}
                                    <div className="flex flex-wrap justify-center items-center gap-3 mb-10 md:mb-16">
                                        <Button className="bg-[#E50000] hover:bg-[#FF1A1A] text-white px-6 md:px-8 py-5 md:py-7 rounded-lg font-semibold flex gap-2">
                                            <Play fill="white" size={20} /> Play Now
                                        </Button>
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
                        </Link>
                    </SwiperSlide>
                ))}

                {/* Кастомная навигация поверх слайдов */}
                <div className="absolute bottom-6 md:bottom-12 left-0 right-0 z-20 px-6 md:px-12 flex justify-between items-center pointer-events-none">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hero-prev pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-black/20 backdrop-blur-md border border-[#262626] text-white rounded-lg hover:bg-black/40"
                    >
                        <ArrowLeft size={20} />
                    </Button>

                    <div className="hero-pagination pointer-events-auto flex items-center gap-1.5" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hero-next pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-black/20 backdrop-blur-md border border-[#262626] text-white rounded-lg hover:bg-black/40"
                    >
                        <ArrowRight size={20} />
                    </Button>
                </div>
            </Swiper>

            <style jsx global>{`
                .hero-bullet {
                    width: 16px;
                    height: 4px;
                    background: #333333 !important;
                    border-radius: 10px;
                    opacity: 1 !important;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .swiper-pagination-bullet-active.hero-bullet {
                    width: 24px;
                    background: #E50000 !important;
                }
            `}</style>
        </section>
    );
}