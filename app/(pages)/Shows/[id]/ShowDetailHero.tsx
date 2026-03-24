"use client";

import React, { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { Play, Pause, Plus, ThumbsUp, Volume2, X, RotateCcw, RotateCw, Settings, Maximize } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

// Правильный интерфейс данных
interface Show {
    id: number;
    name: string;
    overview: string;
    backdrop_path: string;
}

interface HeroProps {
    show: Show; // Объект данных
    videoKey: string | null; // ID видео YouTube
    activeSeason: number | string;
    activeEpisode: number | string;
    isViewing: boolean;
    setIsViewing: (isViewing: boolean) => void;
}

export default function ShowDetailHero({
                                           show,
                                           videoKey,
                                           activeSeason,
                                           activeEpisode,
                                           isViewing,
                                           setIsViewing
                                       }: HeroProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [viewMode, setViewMode] = useState<'trailer' | 'series'>('series');

    const isSeriesMode = isViewing && viewMode === 'series';

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && isPlaying && !isSeriesMode) {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying, isSeriesMode]);

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        setDuration(event.target.getDuration());
        if (isPlaying) event.target.playVideo();
    };

    const skip = (amount: number) => {
        if (isSeriesMode) return;
        const time = playerRef.current?.getCurrentTime() || 0;
        playerRef.current?.seekTo(time + amount, true);
    };

    return (
        <div className="container mx-auto px-0 md:px-10 lg:px-16 pt-16 md:pt-25">
            <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] overflow-hidden md:rounded-[40px] border-b md:border border-[#262626] bg-black group/hero">

                {!isViewing ? (
                    <>
                        {/* Фоновое изображение */}
                        <div className="absolute inset-0 z-0">
                            <div
                                className="w-full h-full bg-cover bg-center bg-no-repeat opacity-50 transition-transform duration-700 group-hover/hero:scale-105"
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${show?.backdrop_path})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent" />
                        </div>

                        {/* Контент */}
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-10 md:pb-20 px-6 text-center">
                            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 text-white uppercase tracking-tighter leading-none">
                                {show?.name}
                            </h1>
                            <p className="text-[#999999] text-sm md:text-lg max-w-2xl mx-auto mb-8 line-clamp-2 md:line-clamp-3 leading-relaxed">
                                {show?.overview}
                            </p>

                            {/* Блок кнопок */}
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <Button
                                        onClick={() => { setViewMode('series'); setIsViewing(true); }}
                                        className="bg-[#E50000] hover:bg-[#FF1A1A] text-white w-full sm:w-auto px-10 py-7 rounded-xl flex gap-3 items-center text-lg font-bold shadow-[0_4px_20px_rgba(229,0,0,0.4)] transition-all active:scale-95"
                                    >
                                        <Play fill="white" size={24} /> Play Now
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => { setViewMode('trailer'); setIsViewing(true); }}
                                        className="bg-white/10 border-white/10 hover:bg-white/20 hover:text-white w-full sm:w-auto px-8 py-7 rounded-xl text-lg text-white font-bold backdrop-blur-md transition-all active:scale-95"
                                    >
                                        Watch Trailer
                                    </Button>
                                </div>

                                {/* Дополнительные действия */}
                                <div className="flex items-center gap-3">
                                    <ActionButton icon={<Plus size={24} />} />
                                    <ActionButton icon={<ThumbsUp size={24} />} />
                                    <ActionButton icon={<Volume2 size={24} />} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col group/player bg-black">
                        {/* Header плеера */}
                        <div className="absolute top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-50 bg-gradient-to-b from-black/90 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
                            <div className="flex flex-col">
                                <h2 className="text-white text-lg md:text-2xl font-bold">{show?.name}</h2>
                                {isSeriesMode && (
                                    <span className="text-[#E50000] text-xs md:text-base font-semibold uppercase tracking-widest">
                                        Season {activeSeason} • Episode {activeEpisode}
                                    </span>
                                )}
                            </div>
                            <Button
                                onClick={() => setIsViewing(false)}
                                className="bg-white/10 hover:bg-[#E50000] rounded-full p-3 backdrop-blur-md border border-white/10 transition-all active:scale-90"
                            >
                                <X size={24} />
                            </Button>
                        </div>

                        {/* Контейнер видео */}
                        <div className={`absolute inset-0 z-10 flex items-center justify-center ${isSeriesMode ? "pointer-events-auto" : "pointer-events-none"}`}>
                            {isSeriesMode ? (
                                <iframe
                                    src={`https://vidsrc.cc/v2/embed/tv/${show?.id}/${activeSeason || 1}/${activeEpisode || 1}`}
                                    className="w-full h-full border-0 z-10"
                                    allowFullScreen
                                    allow="autoplay; encrypted-media"
                                />
                            ) : (
                                <div className="relative w-full h-full scale-[1.3] sm:scale-110">
                                    <YouTube
                                        videoId={videoKey || ""}
                                        opts={{
                                            height: '100%',
                                            width: '100%',
                                            playerVars: { autoplay: 1, controls: 0, disablekb: 1, modestbranding: 1, rel: 0, iv_load_policy: 3 },
                                        }}
                                        onReady={onPlayerReady}
                                        onStateChange={(e) => setIsPlaying(e.data === 1)}
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Трейлер-контроллеры */}
                        {!isSeriesMode && (
                            <div className="absolute inset-0 z-40 flex flex-col justify-end p-6 md:p-12 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
                                <div className="w-full h-1.5 bg-white/20 rounded-full mb-8 relative overflow-hidden">
                                    <div
                                        className="absolute h-full bg-[#E50000] shadow-[0_0_15px_rgba(229,0,0,0.8)]"
                                        style={{ width: `${(currentTime / duration) * 100}%` }}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-8">
                                        <button onClick={() => {
                                            if (isPlaying) playerRef.current?.pauseVideo();
                                            else playerRef.current?.playVideo();
                                            setIsPlaying(!isPlaying);
                                        }} className="text-white hover:text-[#E50000] transition-transform active:scale-90">
                                            {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" />}
                                        </button>
                                        <div className="hidden sm:flex items-center gap-6">
                                            <RotateCcw onClick={() => skip(-10)} size={28} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
                                            <RotateCw onClick={() => skip(10)} size={28} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
                                        </div>
                                        <span className="text-white font-mono text-sm md:text-lg">{formatTime(currentTime)} / {formatTime(duration)}</span>
                                    </div>
                                    <div className="flex gap-6 text-white/60">
                                        <Settings size={28} className="hover:text-white cursor-pointer" />
                                        <Maximize size={28} className="hover:text-white cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

function ActionButton({ icon }: { icon: React.ReactNode }) {
    return (
        <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 md:w-16 md:h-16 bg-[#0F0F0F]/60 border-[#262626] rounded-xl hover:bg-[#E50000] hover:border-[#E50000] hover:text-white text-white transition-all active:scale-90 backdrop-blur-md"
        >
            {icon}
        </Button>
    );
}