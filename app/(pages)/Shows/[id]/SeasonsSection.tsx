"use client";

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import { Play, Clock, Loader2 } from 'lucide-react';
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
}

export default function SeasonsSection({ showId, seasonsCount }: SeasonsSectionProps) {
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
        <section className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-10 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">Seasons and Episodes</h2>

            <Accordion type="single" collapsible className="space-y-4">
                {Array.from({ length: seasonsCount }, (_, i) => i + 1).map((num) => (
                    <AccordionItem
                        key={num}
                        value={`season-${num}`}
                        className="border border-[#262626] rounded-xl px-4 md:px-6 bg-[#0F0F0F] overflow-hidden"
                    >
                        <AccordionTrigger
                            onClick={() => fetchEpisodes(num)}
                            className="hover:no-underline py-6 group"
                        >
                            <div className="flex items-center justify-between w-full pr-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-lg md:text-xl font-semibold text-white group-hover:text-[#E50000] transition-colors">
                                        Season {num.toString().padStart(2, '0')}
                                    </span>
                                    {episodes[num] && (
                                        <span className="text-[#999999] text-sm bg-[#141414] px-3 py-1 rounded-full border border-[#262626]">
                                            {episodes[num].length} Episodes
                                        </span>
                                    )}
                                </div>
                                {loadingSeasons[num] && <Loader2 className="animate-spin text-[#E50000]" size={20} />}
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="pb-6 border-t border-[#262626] pt-6">
                            <div className="space-y-8">
                                {episodes[num]?.map((ep: Episode, idx: number) => (
                                    <div
                                        key={ep.id}
                                        className="flex flex-col md:flex-row items-start md:items-center gap-6 group/item"
                                    >
                                        <span className="text-2xl font-bold text-[#4C4C4C] hidden md:block min-w-[30px]">
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </span>

                                        <div className="relative w-full md:w-48 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-[#262626]">
                                            {ep.still_path ? (
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w400${ep.still_path}`}
                                                    alt={ep.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 192px"
                                                    className="object-cover opacity-70 group-hover/item:opacity-100 transition-opacity"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#4C4C4C] text-xs">No Image</div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center border border-white/20 group-hover/item:scale-110 transition-transform">
                                                    <Play size={16} fill="white" className="ml-0.5 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-grow space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <h4 className="text-lg font-semibold text-white group-hover/item:text-[#E50000] transition-colors">
                                                    {ep.name}
                                                </h4>
                                                <div className="flex items-center gap-1 text-[#999999] border border-[#262626] px-2 py-1 rounded-md bg-[#141414] w-fit">
                                                    <Clock size={14} />
                                                    <span className="text-xs">{ep.runtime || '45'} min</span>
                                                </div>
                                            </div>
                                            <p className="text-[#999999] text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                                                {ep.overview || "No description available for this episode."}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}