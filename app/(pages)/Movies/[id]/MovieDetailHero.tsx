"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { Play, Pause, Plus, ThumbsUp, Volume2, X, RotateCcw, RotateCw, Settings, Maximize, MessageSquare } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

interface Movie {
    id: number;
    title?: string;
    name?: string;
    backdrop_path: string;
    tagline?: string;
    overview: string;
}

export default function MovieDetailHero({ movie, videoKey }: { movie: Movie, videoKey: string | null }) {
    const [isViewing, setIsViewing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showFullMovie, setShowFullMovie] = useState(false);
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

    // Обработчик готовности плеера
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
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-[40px] border border-[#262626] bg-black group/hero">

                {!isViewing ? (
                    <>
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title || movie.name || "Poster"}
                            fill
                            className="object-cover opacity-50 transition-transform duration-700 group-hover/hero:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent z-10" />
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full max-w-[800px] z-20 px-4">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title || movie.name}</h1>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <Button
                                        onClick={() => {
                                            setIsViewing(true);
                                            setShowFullMovie(true);
                                        }}
                                        className="bg-[#E50000] hover:bg-[#FF1A1A] text-white w-full cursor-pointer sm:w-auto px-10 py-7 rounded-xl flex gap-2 items-center text-lg font-bold shadow-[0_4px_14px_rgba(229,0,0,0.3)] transition-transform active:scale-95"
                                    >
                                        <Play className="fill-white" size={24} /> Play Now
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsViewing(true);
                                            setShowFullMovie(false);
                                        }}
                                        className="bg-white/10 border-white/20 hover:bg-white/20 hover:text-white w-full sm:w-auto px-8 py-7 rounded-xl text-lg text-white font-bold backdrop-blur-md transition-all active:scale-95"
                                    >
                                        Watch Trailer
                                    </Button>
                                </div>

                                {/* Дополнительные иконки: всегда в ряд по центру */}
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="w-14 md:h-14 hover:text-white bg-[#0F0F0F]/60 border-[#262626] rounded-xl hover:bg-[#E50000] hover:border-[#E50000] text-white transition-all active:scale-90 backdrop-blur-sm"
                                    >
                                        <Plus size={24} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="w-14 md:h-14 hover:text-white bg-[#0F0F0F]/60 border-[#262626] rounded-xl hover:bg-[#E50000] hover:border-[#E50000] text-white transition-all active:scale-90 backdrop-blur-sm"
                                    >
                                        <ThumbsUp size={24} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="w-14 md:h-14 hover:text-white bg-[#0F0F0F]/60 border-[#262626] rounded-xl hover:bg-[#E50000] hover:border-[#E50000] text-white transition-all active:scale-90 backdrop-blur-sm"
                                    >
                                        <Volume2 size={24} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col group/player">
                        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
                            <div className="flex-1" />
                            <h2 className="text-white text-xl font-bold">
                            {showFullMovie ? "Watching Movie" : "Watching Trailer"}: {movie.title || movie.name}
                            </h2>
                            <div className="flex-1 flex justify-end">
                                <Button
                                    onClick={() => setIsViewing(false)}
                                    className="bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-md border border-white/10"
                                >
                                    <X size={24} />
                                </Button>
                            </div>
                        </div>


                        <div className={`absolute inset-0 z-10 flex items-center justify-center ${showFullMovie ? "" : "pointer-events-none overflow-hidden"}`}>
                            {showFullMovie ? (
                                <iframe
                                    src={`https://vidsrc.cc/v2/embed/movie/${movie.id}?autoPlay=1`}
                                    className="w-full h-full border-0 z-10"
                                    allowFullScreen
                                    allow="autoplay; encrypted-media"
                                />
                            ) : (
                                <div className="relative w-[150%] h-[150%] scale-110">
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
                            )}
                        </div>

                        {!showFullMovie && (
                            <div className="absolute inset-0 z-40 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
                                {/* Твой прогресс-бар */}
                                <div className="w-full h-1.5 bg-white/20 rounded-full mb-6 relative">
                                    <div
                                        className="absolute h-full bg-[#E50000] rounded-full"
                                        style={{ width: `${(currentTime / duration) * 100}%` }}
                                    />
                                </div>

                                {/* Твои кнопки управления */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <button onClick={togglePlay} className="text-white hover:text-[#E50000] transition-colors">
                                            {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" />}
                                        </button>
                                        <RotateCcw onClick={() => skip(-10)} className="text-white/70 hover:text-white cursor-pointer active:scale-90 transition-all" />
                                        <RotateCw onClick={() => skip(10)} className="text-white/70 hover:text-white cursor-pointer active:scale-90 transition-all" />
                                        <div className="flex items-center gap-3 ml-2">
                                            <Volume2 className="text-white" />
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
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

