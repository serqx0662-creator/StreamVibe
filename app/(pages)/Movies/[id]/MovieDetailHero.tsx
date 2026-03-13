"use client";

import React from 'react';
import Image from 'next/image';
import { Play, Plus, ThumbsUp, Volume2 } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

// 1. Описываем интерфейс фильма (можно вынести в отдельный файл types.ts)
interface Movie {
    title: string;
    backdrop_path: string;
    tagline?: string;
    overview: string;
}

interface MovieDetailHeroProps {
    movie: Movie; // Заменяем any на Movie
}

export default function MovieDetailHero({ movie }: MovieDetailHeroProps) {
    return (
        <div className="container mx-auto px-4 md:px-10 lg:px-16 pt-30">
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-[40px] border border-[#262626]">
                <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full max-w-[1000px] px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{movie.title}</h1>
                    <p className="text-[#999999] text-base md:text-lg mb-8 line-clamp-3">
                        {movie.tagline || movie.overview}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button className="bg-[#E50000] hover:bg-[#FF1A1A] text-white px-10 py-7 rounded-xl text-lg font-semibold gap-2">
                            <Play className="fill-white w-6 h-6" /> Play Now
                        </Button>
                        <div className="flex gap-3">
                            <ActionButton icon={<Plus size={24} />} />
                            <ActionButton icon={<ThumbsUp size={24} />} />
                            <ActionButton icon={<Volume2 size={24} />} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode; // ReactNode подходит для передачи компонентов иконок
}

function ActionButton({ icon }: ActionButtonProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-xl bg-[#141414] border border-[#262626] hover:bg-[#1F1F1F] text-white"
        >
            {icon}
        </Button>
    );
}