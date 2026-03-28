"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react'; // Добавил useRef и useCallback
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper'; // Добавил тип
import Image from 'next/image';
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";

import 'swiper/css';

interface TMDBRawMovie {
    id: number;
    poster_path: string | null;
    title: string;
}

interface Movie {
    id: number;
    poster_path: string;
    title: string;
}
interface GenreCard {
    id: number;
    name: string;
    posters: Movie[];
}

const GENRES = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 16, name: 'Animation' },
];

export default function PopularTop10Section() {
    const [genreData, setGenreData] = useState<GenreCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const fetchMoviesByGenres = async () => {
            try {
                const results: GenreCard[] = await Promise.all(
                    GENRES.map(async (genre) => {
                        const res = await fetch(
                            `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&language=en-EN`,
                            { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}` } }
                        );
                        const data = await res.json();
                        return { ...genre, posters: data.results?.slice(0, 4) || [] };
                    })
                );
                setGenreData(results);
            } catch (error) { console.error(error); } finally { setLoading(false); }
        };
        fetchMoviesByGenres();
    }, []);

    const handleSwiper = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
        setActiveIndex(swiper.realIndex);
    }, []);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    const BULLET_COUNT = GENRES.length;

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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                    Popular Top 10 In Genres
                </h2>

                {/* Навигация — скрыта на мобилках до lg */}
                <div className="hidden lg:flex items-center gap-3 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-xl">
                    <Button
                        ref={(node) => setPrevEl(node)}
                        variant="ghost" size="icon"
                        className="w-11 h-11 text-white hover:text-white bg-[#141414] border border-[#262626] rounded-lg hover:bg-[#1F1F1F]"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-1 px-2 min-w-[60px] justify-center">
                        <PaginationBullets />
                    </div>

                    <Button
                        ref={(node) => setNextEl(node)}
                        variant="ghost" size="icon"
                        className="w-11 h-11 text-white hover:text-white bg-[#141414] border border-[#262626] rounded-lg hover:bg-[#1F1F1F]"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-[380px] w-full bg-[#1A1A1A] rounded-[20px]" />
                    ))}
                </div>
            ) : (
                <Swiper
                    key={prevEl ? 'ready' : 'loading'}
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    loop={true}
                    navigation={{ prevEl, nextEl }}
                    onSwiper={handleSwiper}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.2 },
                        1280: { slidesPerView: 4 }
                    }}
                >
                    {genreData.map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <Card className="bg-[#1A1A1A] border-none p-5 rounded-[20px] hover:bg-[#1F1F1F] group h-full cursor-pointer transition-all">
                                <CardContent className="p-0 flex flex-col h-full">
                                    <div className="grid grid-cols-2 gap-2 mb-5">
                                        {genre.posters.map((movie: any, i: number) => (
                                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-[#262626]">
                                                {movie.poster_path && (
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                                        alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="space-y-1">
                                            <span className="inline-block bg-[#E50000] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm">Top 10 In</span>
                                            <h3 className="text-white group-hover:text-[#E50000] text-lg font-semibold">{genre.name}</h3>
                                        </div>
                                        <ArrowRight className="text-[#4C4C4C] group-hover:text-white transition-all w-6 h-6" />
                                    </div>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Пагинация внизу — только на мобилке (скрыта на lg) */}
            <div className="flex lg:hidden justify-center mt-8">
                <PaginationBullets />
            </div>
        </section>
    );
}