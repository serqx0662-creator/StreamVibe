"use client"
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

interface Genre {
    id: number;
    name: string;
}

interface GenreWithImages extends Genre {
    images: string[];
}

interface TMDBMovie {
    poster_path: string | null;
}

interface TMDBResponse {
    results: TMDBMovie[];
}

const GENRES: Genre[] = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 16, name: "Animation" },
];

export default function CategoriesSection() {
    const [categoriesData, setCategoriesData] = useState<GenreWithImages[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const results: GenreWithImages[] = await Promise.all(
                    GENRES.map(async (genre) => {
                        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&language=en-EN&sort_by=popularity.desc&vote_count.gte=100`;
                        const res = await fetch(url, {
                            headers: {
                                accept: 'application/json',
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                            }
                        });
                        const data: TMDBResponse = await res.json();
                        const images = data.results
                            ?.filter((m) => m.poster_path !== null)
                            .slice(0, 4)
                            .map((m) => `https://image.tmdb.org/t/p/w500${m.poster_path}`) || [];
                        return { ...genre, images };
                    })
                );
                setCategoriesData(results);
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
        setActiveIndex(swiper.realIndex);
    }, []);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    const TOTAL_GENRES = GENRES.length;

    const PaginationBullets = () => (
        <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_GENRES }).map((_, i) => {
                const isActive = i === activeIndex;
                return (
                    <button
                        key={i}
                        onClick={() => swiperRef.current?.slideToLoop(i)}
                        className="transition-all duration-300 ease-in-out border-none p-0 cursor-pointer"
                        style={{
                            width: isActive ? '20px' : '12px',
                            height: '4px',
                            borderRadius: '999px',
                            backgroundColor: isActive ? '#E50000' : '#333333',
                        }}
                    />
                );
            })}
        </div>
    );

    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-2 md:py-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-12 gap-6">
                <div className="max-w-[800px]">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                        Explore our wide variety of categories
                    </h2>
                    <p className="text-[#999999] text-xs md:text-sm lg:text-base">
                        Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new
                    </p>
                </div>

                <div className="hidden lg:flex items-center gap-2 md:gap-3 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-xl">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="w-11 h-11 text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] rounded-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div className="px-2">
                        <PaginationBullets />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => swiperRef.current?.slideNext()}
                        className="w-11 h-11 text-white bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] rounded-lg transition-all"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1.3}
                slidesPerGroup={1}
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                breakpoints={{
                    480: { slidesPerView: 2.2, slidesPerGroup: 1 },
                    768: { slidesPerView: 3.2, slidesPerGroup: 1 },
                    1024: {
                        slidesPerView: 5,
                        slidesPerGroup: 1,
                        spaceBetween: 20
                    }
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
                    categoriesData.map((cat) => (
                        <SwiperSlide key={cat.id}>
                            <Card className="bg-[#1A1A1A] border-[#262626] p-4 rounded-[20px] hover:bg-[#212121] transition-all group cursor-pointer">
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-2 gap-2 mb-4 relative overflow-hidden rounded-xl">
                                        {cat.images.map((imgUrl, idx) => (
                                            <div key={idx} className="relative aspect-[1/1.1] overflow-hidden bg-[#262626]">
                                                <Image
                                                    src={imgUrl}
                                                    alt={cat.name}
                                                    fill
                                                    sizes="(max-width: 1024px) 50vw, 20vw"
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 to-transparent pointer-events-none" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium truncate">{cat.name}</span>
                                        <ArrowRight className="text-[#4C4C4C] group-hover:text-white transition-colors" size={20} />
                                    </div>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>

            <div className="flex lg:hidden justify-center mt-6">
                <PaginationBullets />
            </div>
        </section>
    );
}