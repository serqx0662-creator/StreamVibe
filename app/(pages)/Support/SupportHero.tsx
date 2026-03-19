"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/app/components/ui/button";
import CustomPhoneInput from "@/app/(pages)/Support/PhoneInput";

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
    overview: string;
    genre_ids?: number[]; // Если планируешь фильтровать по жанрам
}

export default function SupportHero() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?language=en-EN&page=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                            accept: 'application/json',
                        },
                    }
                );
                const data = await res.json();
                setMovies(data.results.slice(0, 12));
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <section className="container mt-20 mx-auto px-4 md:px-10 lg:px-16 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">

                <div className="lg:col-span-2 flex flex-col h-full">
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
                            Welcome to our<br />support page!
                        </h1>
                        <p className="text-[#999999] text-base md:text-lg max-w-md">
                            We're here to help you with any problems you may be having with our product.
                        </p>
                    </div>

                    <div className="relative flex-grow bg-[#1A1A1A] border border-[#262626] rounded-[24px] p-3 sm:p-4 overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                            {movies.map((movie) => (
                                <div key={movie.id} className="relative aspect-[100/115] rounded-xl overflow-hidden bg-[#0F0F0F] border border-[#262626]">
                                    {movie.poster_path && (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            fill
                                            className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent pointer-events-none" />
                    </div>
                </div>

                <div className="lg:col-span-3 bg-[#0F0F0F] border border-[#262626] rounded-[20px] p-6 md:p-12 h-full">
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput label="First Name" placeholder="Enter First Name" />
                            <FormInput label="Last Name" placeholder="Enter Last Name" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput label="Email" placeholder="Enter your Email" type="email" />
                            <CustomPhoneInput />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-white text-sm font-medium">Message</label>
                            <textarea
                                placeholder="Enter your Message"
                                rows={5}
                                className="w-full bg-[#141414] border border-[#262626] rounded-xl px-5 py-4 text-white placeholder:text-[#666666] focus:border-[#E50000] outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-16">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-[#262626] bg-[#141414] text-[#E50000] focus:ring-0 cursor-pointer" />
                                <span className="text-[#999999] text-sm group-hover:text-white transition-colors">
                                    I agree with Terms of Use and Privacy Policy
                                </span>
                            </label>
                            <Button className="bg-[#E50000] hover:bg-[#FF1A1A] text-white px-6 py-6 rounded-lg cursor-pointer font-medium text-sm w-full sm:w-auto transition-transform active:scale-95">
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

function FormInput({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
    return (
        <div className="space-y-3">
            <label className="block text-white text-sm font-medium">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-[#141414] border border-[#262626] rounded-xl px-5 py-4 text-white placeholder:text-[#666666] focus:border-[#E50000] outline-none transition-all"
            />
        </div>
    );
}