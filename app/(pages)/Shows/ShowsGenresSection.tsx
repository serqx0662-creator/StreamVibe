"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";

import 'swiper/css';
import 'swiper/css/pagination';

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

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
    const [paginationEl, setPaginationEl] = useState<HTMLElement | null>(null);

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

    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Our Genres
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

                    <div ref={(node) => setPaginationEl(node)} className="genres-pagination flex items-center gap-1 px-2 min-w-[60px] justify-center" />

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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-[280px] w-full bg-[#1A1A1A] rounded-[20px]" />
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
                        renderBullet: (index, className) => index < 5 ? `<span class="${className} genre-bullet"></span>` : "",
                    }}
                    breakpoints={{
                        480: { slidesPerView: 2.2 },
                        768: { slidesPerView: 3.2, slidesPerGroup: 2 },
                        1024: { slidesPerView: 5, slidesPerGroup: 2, spaceBetween: 20 }
                    }}
                >
                    {genres.map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <Link href={`/Shows?genre=${genre.id}`}>
                                <Card className="bg-[#1A1A1A] border-none p-4 rounded-[20px] hover:bg-[#1F1F1F] transition-all group cursor-pointer h-full">
                                    <CardContent className="p-0">
                                        {/* Сетка из 4-х постеров */}
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
                                            <span className="text-white text-sm md:text-base font-semibold">
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

            <style jsx global>{`
                .genre-bullet {
                    width: 12px !important;
                    height: 4px !important;
                    background-color: #333333 !important;
                    border-radius: 2px !important;
                    opacity: 1 !important;
                    display: inline-block;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active.genre-bullet {
                    width: 24px !important;
                    background-color: #E50000 !important;
                }
            `}</style>
        </section>
    );
}