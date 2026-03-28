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

interface TMDBMovie {
    id: number;
    poster_path: string | null;
}

interface Genre {
    id: number;
    name: string;
}

interface GenreWithImages extends Genre {
    images: string[];
}

const GENRES = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 16, name: "Animation" },
];

export default function OurGenresSection() {
    const [genresData, setGenresData] = useState<GenreWithImages[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const results: GenreWithImages[] = await Promise.all(
                    GENRES.map(async (genre: Genre) => {
                        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&language=en-EN&sort_by=popularity.desc&vote_count.gte=100`;
                        const res = await fetch(url, {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                            }
                        });
                        const data = await res.json();
                        const movies: TMDBMovie[] = data.results || [];
                        const images = movies
                            .filter((m) => m.poster_path !== null)
                            .slice(0, 4)
                            .map((m) => `https://image.tmdb.org/t/p/w500${m.poster_path}`);

                        return { ...genre, images };
                    })
                );
                setGenresData(results);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const handleSwiper = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
        setTotalSlides(swiper.slides.length);
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
                        onClick={() => swiperRef.current?.slideToLoop(i * Math.ceil(totalSlides / BULLET_COUNT))}
                        style={{
                            width: isActive ? '20px' : '12px',
                            height: '4px',
                            borderRadius: '2px',
                            backgroundColor: isActive ? '#E50000' : '#333333',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
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

                {/* Навигация — теперь скрыта на мобилках полностью через hidden lg:flex */}
                <div className="hidden lg:flex items-center gap-2 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-xl">
                    <Button
                        ref={(node) => setPrevEl(node)}
                        variant="ghost"
                        size="icon"
                        className="w-11 h-11 text-white hover:text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] rounded-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div className="items-center gap-1 px-2 min-w-[60px] justify-center flex">
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
                        <Skeleton key={i} className="h-[250px] w-full bg-[#1A1A1A] rounded-[20px]" />
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
                        768: { slidesPerView: 3.2 },
                        1024: { slidesPerView: 5, spaceBetween: 20 }
                    }}
                    className="genres-swiper"
                >
                    {genresData.map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <Card className="bg-[#1A1A1A] border-none p-4 rounded-[20px] hover:bg-[#1F1F1F] transition-all group cursor-pointer h-full">
                                <CardContent className="p-0 flex flex-col h-full">
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        {genre.images.map((imgUrl: string, idx: number) => (
                                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-[#262626] shadow-lg">
                                                <Image
                                                    src={imgUrl}
                                                    alt={genre.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="text-white truncate group-hover:text-[#E50000] text-base font-semibold">{genre.name}</span>
                                        <ArrowRight className="text-[#4C4C4C] group-hover:text-white transition-all w-5 h-5" />
                                    </div>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <div className="flex lg:hidden justify-center mt-6">
                <PaginationBullets />
            </div>
        </section>
    );
}