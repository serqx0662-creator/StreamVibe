"use client"
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

const GENRES = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 16, name: "Animation" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
];

export default function OurGenresSection() {
    const [genresData, setGenresData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const results = await Promise.all(
                    GENRES.map(async (genre) => {
                        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&language=en-EN&sort_by=popularity.desc&vote_count.gte=100`;
                        const res = await fetch(url, {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                            }
                        });
                        const data = await res.json();
                        const images = data.results?.filter((m: any) => m.poster_path).slice(0, 4).map((m: any) => `https://image.tmdb.org/t/p/w500${m.poster_path}`) || [];
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

    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-6">
                <div className="max-w-[800px]">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                        Our Genres
                    </h2>
                </div>

                <div className="flex items-center gap-2 md:gap-3 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-xl">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="genres-prev-btn w-9 h-9 md:w-11 md:h-11 text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] hover:text-white rounded-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div className="genres-pagination flex items-center gap-1 px-1 md:px-2" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="genres-next-btn w-9 h-9 md:w-11 md:h-11 text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] hover:text-white rounded-lg transition-all"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1.3}
                slidesPerGroup={1}
                navigation={{ prevEl: '.genres-prev-btn', nextEl: '.genres-next-btn' }}
                pagination={{
                    el: '.genres-pagination',
                    clickable: true,
                    renderBullet: (index, className) => index < 5 ? `<span class="${className} genres-bullet"></span>` : "",
                }}
                breakpoints={{
                    480: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5, slidesPerGroup: 2 },
                    1024: { slidesPerView: 5, slidesPerGroup: 2, spaceBetween: 20 }
                }}
                loop={true}
            >
                {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <SwiperSlide key={i}>
                            <Skeleton className="h-[250px] md:h-[300px] w-full bg-[#1A1A1A] rounded-[20px]" />
                        </SwiperSlide>
                    ))
                ) : (
                    genresData.map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <Card className="bg-[#1A1A1A] border-[#262626] p-3 md:p-4 rounded-[16px] md:rounded-[20px] hover:bg-[#212121] transition-all group cursor-pointer">
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-3 md:mb-4 relative overflow-hidden rounded-xl">
                                        {genre.images.map((imgUrl: string, idx: number) => (
                                            <div key={idx} className="relative aspect-[2/3] overflow-hidden bg-[#262626]">
                                                <Image
                                                    src={imgUrl}
                                                    alt={genre.name}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 to-transparent pointer-events-none" />
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-white text-sm md:text-base font-medium truncate">{genre.name}</span>
                                        <ArrowRight className="text-[#4C4C4C] group-hover:text-white transition-colors" size={20} />
                                    </div>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>

            <style jsx global>{`
                .genres-bullet {
                    width: 12px;
                    height: 4px;
                    background-color: #333333;
                    border-radius: 999px;
                    opacity: 1 !important;
                    display: inline-block;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .swiper-pagination-bullet-active.genres-bullet {
                    width: 20px;
                    background-color: #E50000;
                }
            `}</style>
        </section>
    );
}
