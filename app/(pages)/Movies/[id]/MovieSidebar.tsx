"use client";

import React from 'react';
import Image from 'next/image';
import { CalendarDays, Languages, Star, Layers3, User, Music } from 'lucide-react';
import { Badge } from "@/app/components/ui/badge";

interface Genre {
    id: number;
    name: string;
}

interface Language {
    iso_639_1: string;
    english_name: string;
}

interface SidebarMovie {
    release_date: string;
    spoken_languages: Language[];
    vote_average: number;
    genres: Genre[];
    origin_country?: string[];
}

interface Director {
    name: string;
    profile_path: string | null;
}

interface MovieSidebarProps {
    movie: SidebarMovie;
    director: Director | null;
}

export default function MovieSidebar({ movie, director }: MovieSidebarProps) {
    return (
        <aside className="bg-[#1A1A1A] border border-[#262626] p-6 md:p-8 rounded-2xl space-y-6 xl:sticky xl:top-24 self-start">

            <SidebarItem
                icon={<CalendarDays size={18} />}
                label="Released Year"
                value={movie.release_date?.split('-')[0] || "N/A"}
            />

            <SidebarItem icon={<Languages size={18} />} label="Available Languages">
                <div className="flex flex-wrap gap-2 mt-2">
                    {movie.spoken_languages?.map((l) => (
                        <Badge key={l.iso_639_1} variant="outline" className="bg-[#141414] border-[#262626] py-1.5 px-3 text-white font-normal">
                            {l.english_name}
                        </Badge>
                    ))}
                </div>
            </SidebarItem>

            <SidebarItem icon={<Star size={18} />} label="Ratings">
                <div className="space-y-3 mt-2">
                    <RatingCard label="IMDb" score={(movie.vote_average / 2).toFixed(1)} />
                    <RatingCard label="Streamvibe" score="4.5" />
                </div>
            </SidebarItem>

            <SidebarItem icon={<Layers3 size={18} />} label="Genres">
                <div className="flex flex-wrap gap-2 mt-2">
                    {movie.genres?.map((g) => (
                        <Badge key={g.id} className="bg-[#141414] border-[#262626] py-1.5 px-3 font-normal text-white">
                            {g.name}
                        </Badge>
                    ))}
                </div>
            </SidebarItem>

            <SidebarItem label="Director">
                <div className="mt-2 flex items-center gap-3 bg-[#141414] border border-[#262626] p-3 rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-[#262626] overflow-hidden flex-shrink-0 relative">
                        {director?.profile_path ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                                alt="director"
                                fill
                                className="object-cover"
                            />
                        ) : <User className="p-2 w-full h-full opacity-50" />}
                    </div>
                    <div>
                        <p className="font-medium text-sm text-white">{director?.name || "Unknown"}</p>
                        <p className="text-xs text-[#999999]">From {movie.origin_country?.[0] || "World"}</p>
                    </div>
                </div>
            </SidebarItem>

            <SidebarItem icon={<Music size={18} />} label="Music">
                <div className="mt-2 flex items-center gap-3 bg-[#141414] border border-[#262626] p-3 rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-[#262626] overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <Music className="w-6 h-6 opacity-50" />
                    </div>
                    <div>
                        <p className="font-medium text-sm text-white">B. Ajaneesh Loknath</p>
                        <p className="text-xs text-[#999999]">From India</p>
                    </div>
                </div>
            </SidebarItem>
        </aside>
    );
}


interface SidebarItemProps {
    icon?: React.ReactNode;
    label: string;
    value?: string;
    children?: React.ReactNode;
}

function SidebarItem({ icon, label, value, children }: SidebarItemProps) {
    return (
        <div className="w-full">
            <div className="flex items-center gap-2 text-[#999999] mb-2">
                {icon} <span className="font-medium text-sm">{label}</span>
            </div>
            {value && <p className="text-lg font-semibold text-white">{value}</p>}
            {children}
        </div>
    );
}

function RatingCard({ label, score }: { label: string; score: string }) {
    return (
        <div className="bg-[#141414] border border-[#262626] p-4 rounded-xl">
            <p className="text-[#999999] text-sm font-medium mb-1">{label}</p>
            <div className="flex items-center gap-1">
                <div className="flex text-[#E50000]">{renderStars(parseFloat(score))}</div>
                <span className="text-white font-bold ml-1">{score}</span>
            </div>
        </div>
    );
}

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-current" : "opacity-30"} />
    ));
};