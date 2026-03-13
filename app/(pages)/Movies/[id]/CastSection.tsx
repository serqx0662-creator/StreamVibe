"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

import 'swiper/css';
import 'swiper/css/navigation';

interface CastSectionProps {
    cast: any[];
}

export default function CastSection({ cast }: CastSectionProps) {
    return (
        <div className="bg-[#1A1A1A] border border-[#262626] p-8 md:p-10 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#999999] font-medium text-lg">Cast</h3>
                <div className="flex gap-2">
                    <Button size="icon" className="rounded-full w-10 h-10 border-[#262626] bg-[#141414] hover:bg-[#262626] text-white cast-prev">
                        <ArrowLeft size={18}/>
                    </Button>
                    <Button size="icon" className="rounded-full w-10 h-10 border-[#262626] bg-[#141414] hover:bg-[#262626] text-white cast-next">
                        <ArrowRight size={18}/>
                    </Button>
                </div>
            </div>
            <Swiper
                modules={[Navigation]}
                spaceBetween={12}
                slidesPerView={3.2}
                navigation={{ prevEl: '.cast-prev', nextEl: '.cast-next' }}
                breakpoints={{ 640: { slidesPerView: 4.5 }, 768: { slidesPerView: 5.5 }, 1024: { slidesPerView: 7 } }}
            >
                {cast.map(person => (
                    <SwiperSlide key={person.id}>
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-[#262626] border border-[#333]">
                            {person.profile_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                    alt={person.name} 
                                    fill 
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-xs font-bold">
                                    {person.name[0]}
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
