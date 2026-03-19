"use client";

import React from 'react';
import { CalendarDays, Languages, Star, Layers3, User, Tv } from 'lucide-react';
import { Badge } from "@/app/components/ui/badge";

interface Genre {
    id: number;
    name: string;
}

interface Language {
    english_name: string;
}

interface Creator {
    name: string;
}

interface TVShow {
    id: number;
    name: string;
    first_air_date: string;
    spoken_languages: Language[];
    vote_average: number;
    genres: Genre[];
    number_of_seasons: number;
    created_by: Creator[];
}


export default function ShowSidebar({ show }: { show: TVShow }) {
    return (
        <aside className="bg-[#1A1A1A] border border-[#262626] p-6 md:p-8 rounded-2xl space-y-6 xl:sticky xl:top-24 self-start">

            <SidebarItem
                icon={<CalendarDays size={18} />}
                label="Released Year"
                value={show.first_air_date ? show.first_air_date.split('-')[0] : "N/A"}
            />

            <SidebarItem icon={<Languages size={18} />} label="Available Languages">
                <div className="flex flex-wrap gap-2 mt-2">
                    {show.spoken_languages?.map((l, idx) => (
                        <Badge key={idx} variant="outline" className="bg-[#141414] border-[#262626] py-1.5 px-3 text-white font-normal">
                            {l.english_name}
                        </Badge>
                    ))}
                </div>
            </SidebarItem>

            <SidebarItem icon={<Star size={18} />} label="Ratings">
                <div className="space-y-3 mt-2">
                    <RatingCard label="TMDB" score={(show.vote_average / 2).toFixed(1)} />
                    <RatingCard label="Streamvibe" score="4.8" />
                </div>
            </SidebarItem>

            <SidebarItem icon={<Layers3 size={18} />} label="Genres">
                <div className="flex flex-wrap gap-2 mt-2">
                    {show.genres?.map((g) => (
                        <Badge key={g.id} className="bg-[#141414] border-[#262626] py-1.5 px-3 font-normal text-white">
                            {g.name}
                        </Badge>
                    ))}
                </div>
            </SidebarItem>

            <SidebarItem icon={<User size={18} />} label="Created By">
                <div className="space-y-2 mt-2">
                    {show.created_by && show.created_by.length > 0 ? (
                        show.created_by.map((person) => (
                            <div key={person.name} className="flex items-center gap-3 bg-[#141414] border border-[#262626] p-3 rounded-xl">
                                <div className="w-10 h-10 rounded-lg bg-[#262626] flex items-center justify-center flex-shrink-0">
                                    <User size={20} className="text-[#4C4C4C]" />
                                </div>
                                <span className="text-sm text-white truncate">{person.name}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#999999] text-xs italic">No creator data</p>
                    )}
                </div>
            </SidebarItem>

            <SidebarItem icon={<Tv size={18} />} label="Seasons">
                <div className="mt-2 bg-[#141414] border border-[#262626] p-3 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#262626] flex items-center justify-center flex-shrink-0">
                        <Tv size={20} className="text-[#4C4C4C]" />
                    </div>
                    <span className="text-white font-medium">{show.number_of_seasons} Seasons</span>
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
                <div className="flex text-[#E50000]">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(parseFloat(score)) ? "fill-current" : "opacity-30"} />
                    ))}
                </div>
                <span className="text-white font-bold ml-1">{score}</span>
            </div>
        </div>
    );
}