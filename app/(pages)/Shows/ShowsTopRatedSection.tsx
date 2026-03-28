"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";

import 'swiper/css';

interface TMDBPosterItem {
    poster_path: string | null;
}

interface TopRatedGenre {
    id: number;
    name: string;
    posters: string[];
}

export default function ShowsTopRatedSection() {
    const [genres, setGenres] = useState<TopRatedGenre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const fetchTopRatedByGenre = async () => {
            try {
                const genreRes = await fetch(
                    `https://api.themoviedb.org/3/genre/tv/list?language=en-EN`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                            accept: 'application/json',
                        },
                    }
                );
                const genreData = await genreRes.json();

                const topGenres = await Promise.all(
                    genreData.genres.slice(0, 10).map(async (genre: { id: number, name: string }) => {
                        const showRes = await fetch(
                            `https://api.themoviedb.org/3/discover/tv?with_genres=${genre.id}&sort_by=vote_average.desc&vote_count.gte=500`,
                            {
                                headers: {
                                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                                    accept: 'application/json',
                                },
                            }
                        );
                        const showData = await showRes.json();
                        return {
                            id: genre.id,
                            name: genre.name,
                            posters: showData.results.slice(0, 4).map((s: TMDBPosterItem) => s.poster_path)
                        };
                    })
                );

                setGenres(topGenres);
            } catch (error) {
                console.error("Error fetching top rated TV:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopRatedByGenre();
    }, []);

    const handleSwiper = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
        setActiveIndex(swiper.realIndex);
    }, []);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    const BULLET_COUNT = 5;

    const PaginationBullets = () => (
        <div className="flex items-center gap-1">
            {Array.from({ length: BULLET_COUNT }).map((_, i) => {
                const isActive = i === (activeIndex % BULLET_COUNT);
                return (
                    <button
                        key={i}
                        onClick={() => swiperRef.current?.slideToLoop(i)}
                        className="transition-all duration-300"
                        style={{
                            width: isActive ? '20px' : '12px',
                            height: '4px',
                            borderRadius: '2px',
                            backgroundColor: isActive ? '#E50000' : '#333333',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                        }}
                    />
                );
            })}
        </div>
    );

    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-3 sm:py-7 lg:py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Popular Top 10 In Genres
                </h2>

                {/* Навигация для десктопа */}
                <div className="hidden lg:flex items-center gap-3 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-xl">
                    <Button
                        ref={(node) => setPrevEl(node)}
                        variant="ghost"
                        size="icon"
                        className="w-11 h-11 text-white hover:text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] rounded-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-1 px-2 min-w-[60px] justify-center">
                        <PaginationBullets />
                    </div>

                    <Button
                        ref={(node) => setNextEl(node)}
                        variant="ghost"
                        size="icon"
                        className="w-11 h-11 text-white hover:text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] rounded-lg transition-all"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-[320px] w-full bg-[#1A1A1A] rounded-[20px]" />
                    ))}
                </div>
            ) : (
                <Swiper
                    key={prevEl ? 'ready' : 'loading'}
                    modules={[Navigation]}
                    spaceBetween={16}
                    slidesPerView={1.1}
                    loop={true}
                    navigation={{ prevEl, nextEl }}
                    onSwiper={handleSwiper}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        640: { slidesPerView: 2.2, slidesPerGroup: 1 },
                        1024: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 24 }
                    }}
                >
                    {genres.map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <Card className="bg-[#1A1A1A] border-none p-5 rounded-[20px] hover:bg-[#1F1F1F] transition-all group cursor-pointer h-full">
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-2 gap-2 mb-6 aspect-square">
                                        {genre.posters.map((path, idx) => (
                                            <div key={idx} className="relative w-full h-full overflow-hidden rounded-lg bg-[#262626]">
                                                {path && (
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w300${path}`}
                                                        alt={genre.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-[#E50000] text-white text-[10px] font-bold px-2 py-1 rounded">
                                                Top 10 In
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white group-hover:text-[#E50000] text-lg font-bold">
                                                {genre.name}
                                            </span>
                                            <ArrowRight className="w-6 h-6 text-[#4C4C4C] group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Пагинация для мобилок */}
            <div className="flex lg:hidden justify-center mt-8">
                <PaginationBullets />
            </div>
        </section>
    );
}