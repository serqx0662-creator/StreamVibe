"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";

import 'swiper/css';
import 'swiper/css/pagination';

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

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
    const [paginationEl, setPaginationEl] = useState<HTMLElement | null>(null);

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

    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Popular Top 10 In Genres
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

                    <div ref={(node) => setPaginationEl(node)} className="top-rated-pagination flex items-center gap-1 px-2 min-w-[60px] justify-center" />

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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-[320px] w-full bg-[#1A1A1A] rounded-[20px]" />
                    ))}
                </div>
            ) : (
                <Swiper
                    key={prevEl ? 'ready' : 'loading'}
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1.1}
                    loop={true}
                    navigation={{ prevEl, nextEl }}
                    pagination={{
                        el: paginationEl,
                        clickable: true,
                        renderBullet: (index, className) => index < 5 ? `<span class="${className} tr-bullet"></span>` : "",
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2.2, slidesPerGroup: 2 },
                        1024: { slidesPerView: 4, slidesPerGroup: 2, spaceBetween: 24 }
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
                                            <span className="text-white text-lg font-bold">
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

            <style jsx global>{`
                .tr-bullet {
                    width: 12px !important;
                    height: 4px !important;
                    background-color: #333333 !important;
                    border-radius: 2px !important;
                    opacity: 1 !important;
                    display: inline-block;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active.tr-bullet {
                    width: 24px !important;
                    background-color: #E50000 !important;
                }
            `}</style>
        </section>
    );
}