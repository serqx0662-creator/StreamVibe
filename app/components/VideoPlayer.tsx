"use client";

import Video from 'next-video';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
    src: string; // Прямая ссылка на видео или объект из /videos
    poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-video rounded-[30px] overflow-hidden border border-[#262626] bg-black shadow-2xl"
        >
            <Video
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                // Кастомизация через CSS переменные под твой красный цвет
                style={{

                    '--next-video-control-background': 'rgba(15, 15, 15, 0.8)',
                    '--next-video-focus-color': '#E50000',
                }}
            />
        </motion.div>
    );
}