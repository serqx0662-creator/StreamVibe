"use client";

import React, { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { Play, Pause, Plus, ThumbsUp, Volume2, X, RotateCcw, RotateCw, Settings, Maximize, MessageSquare } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

interface Show {
    name: string;
    overview: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
    number_of_seasons: number;
}

export default function ShowDetailHero({ show, videoKey }: { show: Show, videoKey: string | null }) {
    const [isViewing, setIsViewing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef<YouTubePlayer | null>(null);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && isPlaying) {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        setDuration(event.target.getDuration());
        if (isPlaying) event.target.playVideo();
    };

    const togglePlay = () => {
        if (isPlaying) playerRef.current?.pauseVideo();
        else playerRef.current?.playVideo();
        setIsPlaying(!isPlaying);
    };

    const skip = (amount: number) => {
        const time = playerRef.current?.getCurrentTime() || 0;
        playerRef.current?.seekTo(time + amount, true);
    };

    return (
        <div className="container mx-auto px-4 md:px-10 lg:px-16 pt-30">
            <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden rounded-[40px] border border-[#262626] bg-black group/hero">

                {!isViewing ? (
                    <>
                        <div className="absolute inset-0 z-0">
                            <div
                                className="w-full h-full bg-cover bg-center bg-no-repeat opacity-50 transition-transform duration-700 group-hover/hero:scale-105"
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent" />
                        </div>

                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-10 md:pb-20 px-4 text-center">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white uppercase tracking-tight">
                                {show.name}
                            </h1>
                            <p className="text-[#999999] text-sm md:text-base max-w-3xl mx-auto mb-8 line-clamp-3">
                                {show.overview}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    onClick={() => setIsViewing(true)}
                                    className="bg-[#E50000] hover:bg-[#FF1A1A] text-white px-10 py-7 rounded-xl flex gap-2 items-center text-lg font-bold transition-transform active:scale-95"
                                >
                                    <Play fill="white" size={24} /> Play Now
                                </Button>

                                <div className="flex gap-3">
                                    <ActionButton icon={<Plus size={24} />} />
                                    <ActionButton icon={<ThumbsUp size={24} />} />
                                    <ActionButton icon={<Volume2 size={24} />} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col group/player">

                        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
                            <div className="flex-1" />
                            <h2 className="text-white text-xl font-bold">{show.name}</h2>
                            <div className="flex-1 flex justify-end">
                                <Button
                                    onClick={() => setIsViewing(false)}
                                    className="bg-white/10 hover:bg-white/20 rounded-full p-2.5 backdrop-blur-md border border-white/10 transition-transform active:scale-90"
                                >
                                    <X size={24} />
                                </Button>
                            </div>
                        </div>

                        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-center justify-center">
                            <div className="relative w-[115%] h-[115%] scale-110">
                                <YouTube
                                    videoId={videoKey || ""}
                                    opts={{
                                        height: '100%',
                                        width: '100%',
                                        playerVars: {
                                            autoplay: 1, controls: 0, disablekb: 1,
                                            modestbranding: 1, rel: 0, iv_load_policy: 3,
                                            showinfo: 0
                                        },
                                    }}
                                    onReady={onPlayerReady}
                                    onStateChange={(e) => setIsPlaying(e.data === 1)}
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                        </div>

                        <div className="absolute inset-0 z-40 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">

                            <div className="w-full h-1.5 bg-white/20 rounded-full mb-6 relative">
                                <div
                                    className="absolute h-full bg-[#E50000] rounded-full shadow-[0_0_15px_rgba(229,0,0,0.5)]"
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <button onClick={togglePlay} className="text-white hover:text-[#E50000] transition-colors">
                                        {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" />}
                                    </button>
                                    <RotateCcw onClick={() => skip(-10)} className="text-white/70 hover:text-white cursor-pointer active:scale-90 transition-all" />
                                    <RotateCw onClick={() => skip(10)} className="text-white/70 hover:text-white cursor-pointer active:scale-90 transition-all" />
                                    <div className="flex items-center gap-3 ml-2">
                                        <Volume2 size={22} className="text-white" />
                                        <span className="text-white text-sm font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                                    </div>
                                </div>
                                <div className="flex gap-6 text-white/70">
                                    <MessageSquare size={22} className="hover:text-white cursor-pointer" />
                                    <Settings size={22} className="hover:text-white cursor-pointer" />
                                    <Maximize size={22} className="hover:text-white cursor-pointer" />
                                </div>
                            </div>
                        </div>
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
            className="w-14 h-14 bg-[#0F0F0F] border-[#262626] rounded-xl hover:bg-[#1A1A1A] text-white transition-all active:scale-90"
        >
            {icon}
        </Button>
    );
}