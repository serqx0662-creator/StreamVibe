"use client";

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import { Play, Clock, Loader2, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface Episode {
    id: number;
    name: string;
    overview: string;
    still_path: string | null;
    runtime: number | null;
    episode_number: number;
}

interface SeasonData {
    episodes: Episode[];
}

interface SeasonsSectionProps {
    showId: number;
    seasonsCount: number;
    onEpisodeSelect: (season: number, episode: number) => void;
    activeSeason: number;
    activeEpisode: number;
}

export default function SeasonsSection({
                                           showId,
                                           seasonsCount,
                                           onEpisodeSelect,
                                           activeSeason,
                                           activeEpisode
                                       }: SeasonsSectionProps) {
    const [episodes, setEpisodes] = useState<{ [key: number]: Episode[] }>({});
    const [loadingSeasons, setLoadingSeasons] = useState<{ [key: number]: boolean }>({});

    const fetchEpisodes = async (seasonNumber: number) => {
        if (episodes[seasonNumber] || loadingSeasons[seasonNumber]) return;

        setLoadingSeasons(prev => ({ ...prev, [seasonNumber]: true }));

        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?language=en-EN`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                        accept: 'application/json'
                    }
                }
            );
            const data: SeasonData = await res.json();
            setEpisodes(prev => ({ ...prev, [seasonNumber]: data.episodes || [] }));
        } catch (error) {
            console.error("Error fetching episodes:", error);
        } finally {
            setLoadingSeasons(prev => ({ ...prev, [seasonNumber]: false }));
        }
    };

    return (
        <section className="bg-[#141414] border border-[#262626] rounded-2xl p-4 md:p-10 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">Seasons and Episodes</h2>

            <Accordion type="single" collapsible className="space-y-4">
                {Array.from({ length: seasonsCount }, (_, i) => i + 1).map((num) => (
                    <AccordionItem
                        key={num}
                        value={`season-${num}`}
                        className="border border-[#262626] rounded-xl px-4 md:px-6 bg-[#0F0F0F] overflow-hidden hover:border-[#333] transition-colors"
                    >
                        {/* Важно: добавили group, чтобы менять стили иконки при наведении на весь триггер */}
                        <AccordionTrigger
                            onClick={() => fetchEpisodes(num)}
                            className="hover:no-underline py-6 group flex items-center justify-between w-full"
                        >
                            <div className="flex items-center justify-between w-full pr-2">
                                <div className="flex items-center gap-4">
                                    <span className={`text-lg md:text-xl font-bold transition-colors ${
                                        activeSeason === num ? "text-[#E50000]" : "text-white group-hover:text-[#E50000]"
                                    }`}>
                                        Season {num.toString().padStart(2, '0')}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-[#999999] text-sm font-medium bg-[#141414] px-3 py-1.5 rounded-lg border border-[#262626]">
                                        {episodes[num] ? `${episodes[num].length} Episodes` : '...'}
                                    </span>

                                    {/* Круг со стрелкой */}
                                    <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#262626] flex items-center justify-center transition-all group-hover:bg-[#222]">
                                        {loadingSeasons[num] ? (
                                            <Loader2 className="animate-spin text-[#E50000]" size={18} />
                                        ) : (
                                            /* Используем стандартный для Shadcn класс поворота.
                                               Если в твоем AccordionTrigger иконка уже есть,
                                               убедись, что она не дублируется.
                                            */
                                            <ChevronDown
                                                className="text-[#999999] transition-transform duration-300 group-data-[state=open]:rotate-180"
                                                size={20}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="pb-6 pt-2 border-t border-[#262626]/50">
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                {episodes[num]?.map((ep: Episode) => {
                                    const isActive = activeSeason === num && activeEpisode === ep.episode_number;

                                    return (
                                        <div
                                            key={ep.id}
                                            onClick={() => onEpisodeSelect(num, ep.episode_number)}
                                            className={`group/item flex flex-col md:flex-row items-center gap-5 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                                                isActive
                                                    ? "bg-[#1A1A1A] border-[#E50000] shadow-[0_0_15px_rgba(229,0,0,0.15)]"
                                                    : "bg-transparent border-transparent hover:bg-[#141414] hover:border-[#262626]"
                                            }`}
                                        >
                                            <div className="relative w-full md:w-56 aspect-video rounded-lg overflow-hidden bg-[#262626] shrink-0">
                                                {ep.still_path ? (
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w400${ep.still_path}`}
                                                        alt={ep.name}
                                                        fill
                                                        className={`object-cover transition-transform duration-500 group-hover/item:scale-105 ${isActive ? "opacity-100" : "opacity-70"}`}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[#4C4C4C] text-xs">NO IMAGE</div>
                                                )}

                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? "bg-[#E50000]" : "bg-white/20 backdrop-blur-sm"}`}>
                                                        <Play size={18} fill="white" className="text-white ml-0.5" />
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 rounded-md text-[10px] font-bold text-white border border-white/10">
                                                    EP {ep.episode_number.toString().padStart(2, '0')}
                                                </div>
                                            </div>

                                            <div className="flex flex-col flex-1 gap-2 w-full">
                                                <div className="flex items-center justify-between gap-3">
                                                    <h4 className={`text-base font-bold transition-colors ${isActive ? "text-[#E50000]" : "text-white group-hover/item:text-[#E50000]"}`}>
                                                        {ep.name}
                                                    </h4>
                                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-[#0A0A0A] border border-[#262626] rounded-md shrink-0">
                                                        <Clock size={12} className="text-[#999999]" />
                                                        <span className="text-[11px] text-[#999999] font-medium">{ep.runtime || '45'} min</span>
                                                    </div>
                                                </div>
                                                <p className="text-[#999999] text-sm line-clamp-2 leading-relaxed">
                                                    {ep.overview || "No description available for this episode."}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}