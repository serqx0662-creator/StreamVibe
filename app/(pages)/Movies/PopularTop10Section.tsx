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
import 'swiper/css/navigation';

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

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
    const [paginationEl, setPaginationEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const fetchMoviesByGenres = async () => {
            try {
                const results: GenreCard[] = await Promise.all(
                    GENRES.map(async (genre) => {
                        const randomPage = Math.floor(Math.random() * 8) + 1;
                        const res = await fetch(
                            `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&language=en-EN&page=${randomPage}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                                    accept: 'application/json',
                                },
                            }
                        );
                        const data = await res.json();
                        const moviesWithPosters: Movie[] = (data.results as TMDBRawMovie[])
                            .filter((m): m is TMDBRawMovie & { poster_path: string } => m.poster_path !== null);                        const shuffled = moviesWithPosters.sort(() => 0.5 - Math.random());
                        return { ...genre, posters: shuffled.slice(0, 4) };
                    })
                );
                setGenreData(results);
            } catch (error) {
                console.error("Error fetching genres:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMoviesByGenres();
    }, []);

    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                    Popular Top 10 In Genres
                </h2>

                <div className="flex items-center gap-3 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-xl">
                    <Button
                        ref={(node) => setPrevEl(node)}
                        variant="ghost"
                        size="icon"
                        className="w-11 h-11 text-white hover:text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] rounded-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div ref={(node) => setPaginationEl(node)} className="top10-pagination flex items-center gap-1 px-2 min-w-[60px]" />

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-[380px] w-full bg-[#1A1A1A] rounded-[20px]" />
                    ))}
                </div>
            ) : (
                <Swiper
                    key={prevEl ? 'ready' : 'loading'}
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    loop={true}
                    navigation={{ prevEl, nextEl }}
                    pagination={{
                        el: paginationEl,
                        clickable: true,
                        renderBullet: (index, className) => {
                            return index < 5 ? `<span class="${className} top10-bullet"></span>` : "";
                        },
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.2, slidesPerGroup: 1 },
                        1280: { slidesPerView: 4, slidesPerGroup: 1 }
                    }}
                    className="popular-swiper"
                >
                    {genreData.map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <Card className="bg-[#1A1A1A] border-[#262626] p-5 rounded-[20px] hover:bg-[#1F1F1F] transition-all group cursor-pointer h-full border-none">
                                <CardContent className="p-0 flex flex-col h-full">
                                    <div className="grid grid-cols-2 gap-2 mb-5">
                                        {genre.posters.map((movie) => (
                                            <div key={movie.id} className="relative aspect-square rounded-xl overflow-hidden bg-[#262626] shadow-lg">
                                                {movie.poster_path && (
                                                    <>
                                                        <Image
                                                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                                            alt={movie.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="space-y-1">
                                            <span className="inline-block bg-[#E50000] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm">
                                                Top 10 In
                                            </span>
                                            <h3 className="text-white truncate group-hover:text-[#E50000] text-lg font-semibold">{genre.name}</h3>
                                        </div>
                                        <ArrowRight className="text-[#4C4C4C] w-6 h-6 group-hover:text-white transition-all" />
                                    </div>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <style jsx global>{`
                .top10-bullet {
                    width: 12px !important;
                    height: 4px !important;
                    background-color: #333333 !important;
                    border-radius: 2px !important;
                    opacity: 1 !important;
                    cursor: pointer;
                    display: inline-block;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active.top10-bullet {
                    width: 24px !important;
                    background-color: #E50000 !important;
                }
            `}</style>
        </section>
    );
}