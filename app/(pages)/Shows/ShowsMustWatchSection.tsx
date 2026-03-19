"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, ArrowLeft, Play, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";

import 'swiper/css';
import 'swiper/css/pagination';

interface Show {
    id: number;
    name: string;
    poster_path: string | null;
    vote_average: number;
    popularity: number;
}

export default function ShowsMustWatchSection() {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
    const [paginationEl, setPaginationEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const fetchMustWatchShows = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/tv/top_rated?language=en-EN&page=1`,
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
                console.error("Error fetching must watch shows:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMustWatchShows();
    }, []);

    const renderStars = (rating: number) => {
        const starsCount = Math.round(rating / 2);
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < starsCount ? "fill-[#E50000] text-[#E50000]" : "text-[#4C4C4C]"}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Must - Watch Shows
                </h2>

                <div className="flex items-center gap-2 md:gap-3 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-xl">
                    <Button
                        ref={(node) => setPrevEl(node)}
                        variant="ghost"
                        size="icon"
                        className="w-9 h-9 md:w-11 md:h-11 text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] rounded-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div ref={(node) => setPaginationEl(node)} className="must-shows-pagination flex items-center gap-1 px-2 min-w-[60px] justify-center" />

                    <Button
                        ref={(node) => setNextEl(node)}
                        variant="ghost"
                        size="icon"
                        className="w-9 h-9 md:w-11 md:h-11 text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] rounded-lg transition-all"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-[400px] w-full bg-[#1A1A1A] rounded-[20px]" />
                    ))}
                </div>
            ) : (
                <Swiper
                    key={prevEl ? 'ready' : 'loading'}
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    loop={true}
                    navigation={{ prevEl, nextEl }}
                    pagination={{
                        el: paginationEl,
                        clickable: true,
                        renderBullet: (index, className) => index < 5 ? `<span class="${className} ms-bullet"></span>` : "",
                    }}
                    breakpoints={{
                        480: { slidesPerView: 2.2 },
                        768: { slidesPerView: 3.2, slidesPerGroup: 2 },
                        1024: { slidesPerView: 4, slidesPerGroup: 2, spaceBetween: 24 }
                    }}
                >
                    {shows.map((show) => (
                        <SwiperSlide key={show.id}>
                            <Link href={`/Shows/${show.id}`}>
                                <Card className="bg-[#1A1A1A] border-none p-4 rounded-[20px] hover:bg-[#1F1F1F] transition-all group cursor-pointer h-full">
                                    <CardContent className="p-0 flex flex-col h-full">
                                        <div className="relative aspect-[2/3] overflow-hidden rounded-xl mb-4 bg-[#262626] shadow-2xl">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                                alt={show.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-85" />

                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button size="icon" className="w-12 h-12 bg-[#E50000] hover:bg-[#FF1A1A] rounded-full shadow-xl">
                                                    <Play fill="white" size={20} className="ml-1" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-[#999999] text-[10px] md:text-xs mb-3">
                                            <div className="flex items-center gap-1 bg-[#141414] px-2 py-1 rounded-full border border-[#262626]">
                                                <Clock size={12} className="text-[#4C4C4C]" />
                                                <span>45min / Ep</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-[#141414] px-2 py-1 rounded-full border border-[#262626]">
                                                {renderStars(show.vote_average)}
                                                <span className="text-[#999999]">{(show.popularity / 10).toFixed(0)}K</span>
                                            </div>
                                        </div>

                                        <h3 className="text-white text-sm md:text-base font-semibold truncate group-hover:text-[#E50000] transition-colors">
                                            {show.name}
                                        </h3>
                                    </CardContent>
                                </Card>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <style jsx global>{`
                .ms-bullet {
                    width: 12px !important;
                    height: 4px !important;
                    background-color: #333333 !important;
                    border-radius: 2px !important;
                    opacity: 1 !important;
                    display: inline-block;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active.ms-bullet {
                    width: 24px !important;
                    background-color: #E50000 !important;
                }
            `}</style>
        </section>
    );
}