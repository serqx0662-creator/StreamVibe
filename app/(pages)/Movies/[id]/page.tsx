"use client";

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import {
    Play, Plus, ThumbsUp, Volume2, CalendarDays,
    Languages, Star, Layers3, ArrowLeft, ArrowRight, Clock, ThumbsDown
} from 'lucide-react';

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Skeleton } from "@/app/components/ui/skeleton";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [movie, setMovie] = useState<any>(null);
    const [cast, setCast] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieRes, creditsRes, similiarRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}?language=ru-RU`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    }),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=ru-RU`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    }),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=ru-RU&page=1`, {
                        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, accept: 'application/json' }
                    })
                ]);

                const movieData = await movieRes.json();
                const creditsData = await creditsRes.json();
                const similarData = await similiarRes.json();

                setReviews(similarData.results.slice(0, 5));
                setMovie(movieData);
                setCast(creditsData.cast.slice(0, 15));
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <MovieSkeleton />;
    if (!movie) return <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">Movie not found</div>;

    return (
        <div className="bg-[#0F0F0F] min-h-screen text-white flex flex-col">
            <Header />

            <main className="flex-grow pb-20">
                {/* HERO SECTION */}
                <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden rounded-b-[40px] border-b border-[#262626]">
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full max-w-[1000px] px-6">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
                        <p className="text-[#999999] text-base md:text-lg mb-8 line-clamp-3 md:line-clamp-none">
                            {movie.overview}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button className="bg-[#E50000] hover:bg-[#FF1A1A] text-white px-10 py-7 rounded-xl text-lg font-semibold gap-2">
                                <Play className="fill-white w-6 h-6" /> Play Now
                            </Button>
                            <div className="flex gap-3 mt-4 sm:mt-0">
                                <ActionButton icon={<Plus />} />
                                <ActionButton icon={<ThumbsUp />} />
                                <ActionButton icon={<Volume2 />} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="container mx-auto px-4 md:px-10 lg:px-16 mt-16 grid grid-cols-1 lg:grid-cols-[1fr,420px] gap-10">

                    {/* LEFT: Info, Cast, Reviews */}
                    <div className="space-y-10">
                        <SectionBox title="Description">
                            <p className="text-white leading-relaxed text-sm md:text-base">{movie.overview}</p>
                        </SectionBox>

                        {/* CAST SECTION */}
                        <SectionBox title="Cast" paginationClass="cast-pagination" nextEl="cast-next" prevEl="cast-prev" hasArrows>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={16}
                                slidesPerView={2.5}
                                navigation={{ prevEl: '.cast-prev', nextEl: '.cast-next' }}
                                pagination={{ clickable: true, el: '.cast-pagination', bulletClass: 'swiper-pagination-bullet cast-bullet', bulletActiveClass: 'swiper-pagination-bullet-active' }}
                                breakpoints={{ 640: { slidesPerView: 3.5 }, 768: { slidesPerView: 5 }, 1024: { slidesPerView: 6 } }}
                            >
                                {cast.map(person => (
                                    <SwiperSlide key={person.id}>
                                        <div className="text-center group">
                                            <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden mb-3 bg-[#262626] border-2 border-transparent group-hover:border-[#E50000] transition-colors duration-300">
                                                {person.profile_path ? (
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                                                        alt={person.name} fill className="object-cover"
                                                    />
                                                ) : <div className="flex items-center justify-center w-full h-full text-3xl font-bold bg-[#141414]">{person.name[0]}</div>}
                                            </div>
                                            <p className="text-xs font-medium truncate text-white">{person.name}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </SectionBox>

                        {/* REVIEWS SECTION */}
                        <SectionBox title="Reviews" paginationClass="review-pagination" nextEl="review-next" prevEl="review-prev" hasArrows addButton>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation={{ prevEl: '.review-prev', nextEl: '.review-next' }}
                                pagination={{ clickable: true, el: '.review-pagination', bulletClass: 'swiper-pagination-bullet review-bullet' }}
                                breakpoints={{ 768: { slidesPerView: 2 } }}
                            >
                                {reviews.map((review: any) => (
                                    <SwiperSlide key={review.id}>
                                        <ReviewCard review={review} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </SectionBox>
                    </div>

                    {/* RIGHT: Sidebar */}
                    <aside className="space-y-8 bg-[#1A1A1A] border border-[#262626] p-8 rounded-3xl h-fit lg:sticky lg:top-10">
                        <SidebarItem icon={<CalendarDays />} label="Released Year" value={movie.release_date ? movie.release_date.split('-')[0] : 'N/A'} />

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[#999999]"><Languages size={20}/> <span className="font-medium">Available Languages</span></div>
                            <div className="flex flex-wrap gap-2">
                                {movie.spoken_languages.map((l: any) => (
                                    <Badge key={l.iso_639_1} variant="outline" className="bg-[#141414] border-[#262626] py-2 px-4 text-white text-xs">
                                        {l.english_name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[#999999]"><Star size={20}/> <span className="font-medium">Ratings</span></div>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="bg-[#141414] border-[#262626] p-4 text-center">
                                    <p className="text-xs text-[#999999] mb-1.5">TMDB</p>
                                    <p className="font-bold text-2xl text-white">⭐ {movie.vote_average.toFixed(1)}</p>
                                </Card>
                                <Card className="bg-[#141414] border-[#262626] p-4 text-center">
                                    <p className="text-xs text-[#999999] mb-1.5">Streamvibe</p>
                                    <p className="font-bold text-2xl text-white">⭐ 4.5</p>
                                </Card>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[#999999]"><Layers3 size={20}/> <span className="font-medium">Genres</span></div>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((g: any) => (
                                    <Badge key={g.id} className="bg-[#141414] border-[#262626] text-white">
                                        {g.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />

            <style jsx global>{`
                .cast-bullet, .review-bullet {
                    width: 12px; height: 4px; background: #333333;
                    border-radius: 999px; opacity: 1 !important; margin: 0 4px !important;
                }
                .swiper-pagination-bullet-active.cast-bullet,
                .swiper-pagination-bullet-active.review-bullet {
                    width: 24px; background: #E50000;
                }
            `}</style>
        </div>
    );
}

// Helper Components

function SectionBox({ title, children, paginationClass, nextEl, prevEl, hasArrows, addButton }: any) {
    return (
        <Card className="bg-[#1A1A1A] border-[#262626] p-6 md:p-8 rounded-2xl relative">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#999999] font-medium text-xl">{title}</h3>
                <div className="flex items-center gap-3">
                    {addButton && (
                        <Button className="bg-[#141414] border-[#262626] text-white gap-2 text-xs md:text-sm">
                            <Plus size={16}/> Add Your Review
                        </Button>
                    )}
                    {hasArrows && (
                        <div className="flex gap-2">
                            <Button size="icon" variant="outline" className={`rounded-full w-10 h-10 border-[#262626] bg-[#141414] text-white ${prevEl}`}><ArrowLeft size={16}/></Button>
                            <Button size="icon" variant="outline" className={`rounded-full w-10 h-10 border-[#262626] bg-[#141414] text-white ${nextEl}`}><ArrowRight size={16}/></Button>
                        </div>
                    )}
                </div>
            </div>
            {children}
            {paginationClass && <div className={`${paginationClass} swiper-pagination !static !bottom-0 !left-0 !translate-x-0 !mt-8 flex justify-center items-center`}/>}
        </Card>
    );
}

function ReviewCard({ review }: any) {
    return (
        <Card className="bg-[#141414] border-[#262626] p-6 rounded-2xl space-y-4 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-medium text-white text-lg">Aniket Roy</h4>
                    <p className="text-sm text-[#666666]">Отличный фильм!</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0A0A0A] border border-[#1A1A1A] p-2 rounded-full">
                    <Star className="text-amber-400 fill-amber-400" size={16} /> 4.5
                </div>
            </div>
            <p className="text-white text-sm md:text-base leading-relaxed line-clamp-4">
                Это один из лучших фильмов года. Отличная актерская игра, захватывающий сюжет и отличная операторская работа. Определенно стоит посмотреть!
            </p>
            <div className="flex justify-between items-center text-xs text-[#666666] pt-2 border-t border-[#1A1A1A]">
                <span>2 часа назад</span>
                <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="w-7 h-7 hover:bg-transparent"><ThumbsUp size={16} /></Button>
                    <Button size="icon" variant="ghost" className="w-7 h-7 hover:bg-transparent"><ThumbsDown size={16} /></Button>
                </div>
            </div>
        </Card>
    );
}

function SidebarItem({ icon, label, value }: any) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#999999]">{icon} <span className="font-medium">{label}</span></div>
            <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
        </div>
    );
}

function ActionButton({ icon }: any) {
    return (
        <Button size="icon" variant="outline" className="w-16 h-16 rounded-xl bg-[#141414] border-[#262626] hover:bg-[#1F1F1F]">
            {React.cloneElement(icon, { size: 28, className: "text-white" })}
        </Button>
    );
}

function MovieSkeleton() {
    return (
        <div className="bg-[#0F0F0F] min-h-screen p-20 space-y-10">
            <Header/>
            <Skeleton className="w-full h-[70vh] rounded-3xl bg-[#1A1A1A]" />
            <Footer/>
        </div>
    );
}
