"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft, Play } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";

import 'swiper/css';

interface Show {
    id: number;
    name: string;
    poster_path: string | null;
    first_air_date: string;
}

export default function ShowsNewReleasesSection() {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const fetchNewShows = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/tv/on_the_air?language=en-EN&page=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                            accept: 'application/json',
                        },
                    }
                );
                const data = await res.json();
                setShows(data.results.slice(0, 10));
            } catch (error) {
                console.error("Error fetching new shows:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNewShows();
    }, []);

    const handleSwiper = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
        setActiveIndex(swiper.realIndex);
    }, []);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

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
                    New Released Shows
                </h2>

                {/* Навигация — видна только на lg (десктоп) */}
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
                        <Skeleton key={i} className="h-[380px] w-full bg-[#1A1A1A] rounded-[20px]" />
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
                    {shows.map((show) => (
                        <SwiperSlide key={show.id}>
                            <Link href={`/Shows/${show.id}`} className="block h-full">
                                <Card className="bg-[#1A1A1A] border-none p-3 md:p-4 rounded-[20px] hover:bg-[#1F1F1F] transition-all group cursor-pointer h-full">
                                    <CardContent className="p-0 flex flex-col h-full">
                                        <div className="relative aspect-[2/3] overflow-hidden rounded-xl mb-4 bg-[#262626]">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                                alt={show.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="w-12 h-12 bg-[#E50000] flex items-center justify-center rounded-full shadow-xl scale-90 group-hover:scale-100 transition-transform">
                                                    <Play fill="white" size={20} className="ml-1 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-[#141414] border border-[#262626] rounded-lg py-2 px-3 flex items-center justify-center mb-3">
                                            <span className="text-[#999999] text-[10px] md:text-xs">
                                                Released at <span className="text-white ml-1">{formatDate(show.first_air_date)}</span>
                                            </span>
                                        </div>

                                        <h3 className="text-white text-sm md:text-base font-semibold truncate text-center group-hover:text-[#E50000] transition-colors">
                                            {show.name}
                                        </h3>
                                    </CardContent>
                                </Card>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Мобильная пагинация — видна только < lg */}
            <div className="flex lg:hidden justify-center mt-8">
                <PaginationBullets />
            </div>
        </section>
    );
}