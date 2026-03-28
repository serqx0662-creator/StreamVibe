"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";

import 'swiper/css';

interface TMDBPosterItem {
    poster_path: string | null;
}

interface ShowGenre {
    id: number;
    name: string;
    posters: string[];
}

export default function ShowsGenresSection() {
    const [genres, setGenres] = useState<ShowGenre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const fetchGenresAndShows = async () => {
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

                const genresWithPosters = await Promise.all(
                    genreData.genres.slice(0, 10).map(async (genre: { id: number, name: string }) => {
                        const showRes = await fetch(
                            `https://api.themoviedb.org/3/discover/tv?with_genres=${genre.id}&sort_by=popularity.desc`,
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

                setGenres(genresWithPosters);
            } catch (error) {
                console.error("Error fetching TV genres:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenresAndShows();
    }, []);

    const handleSwiper = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
        setActiveIndex(swiper.realIndex);
    }, []);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    // Количество точек пагинации (обычно 5 для 10 элементов при скролле по 2)
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
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-7 lg:py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Our Genres
                </h2>

                {/* Десктопная навигация */}
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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-[280px] w-full bg-[#1A1A1A] rounded-[20px]" />
                    ))}
                </div>
            ) : (
                <Swiper
                    key={prevEl ? 'ready' : 'loading'}
                    modules={[Navigation]}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    loop={true}
                    navigation={{ prevEl, nextEl }}
                    onSwiper={handleSwiper}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        480: { slidesPerView: 2.2 },
                        768: { slidesPerView: 3.2, slidesPerGroup: 1 },
                        1024: { slidesPerView: 5, slidesPerGroup: 1, spaceBetween: 20 }
                    }}
                >
                    {genres.map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <Link href={`/Shows?genre=${genre.id}`}>
                                <Card className="bg-[#1A1A1A] border-none p-4 rounded-[20px] hover:bg-[#1F1F1F] transition-all group cursor-pointer h-full">
                                    <CardContent className="p-0">
                                        <div className="grid grid-cols-2 gap-2 mb-4 relative aspect-square">
                                            {genre.posters.map((path, idx) => (
                                                <div key={idx} className="relative w-full h-full overflow-hidden rounded-lg bg-[#262626]">
                                                    {path && (
                                                        <Image
                                                            src={`https://image.tmdb.org/t/p/w200${path}`}
                                                            alt={genre.name}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-white group-hover:text-[#E50000] text-sm md:text-base font-semibold">
                                                {genre.name}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-[#4C4C4C] group-hover:text-white transition-colors" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Мобильная пагинация */}
            <div className="flex lg:hidden justify-center mt-8">
                <PaginationBullets />
            </div>
        </section>
    );
}