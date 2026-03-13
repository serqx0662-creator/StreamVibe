"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/app/components/ui/button";

export default function SupportHero() {
    const [movies, setMovies] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        agree: false
    });

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1`,
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="container mx-auto px-4 md:px-10 lg:px-16 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                
                {/* LEFT SIDE - Text & Movie Grid */}
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Welcome to our<br />support page!
                    </h1>
                    <p className="text-[#999999] text-base md:text-lg mb-10 max-w-md">
                        We're here to help you with any problems you may be having with our product.
                    </p>

                    {/* Movie Grid Container */}
                    <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-4 w-fit">
                        <div className="grid grid-cols-4 gap-3">
                            {movies.slice(0, 12).map((movie) => (
                                <div key={movie.id} className="relative w-[120px] h-[110px] rounded-lg overflow-hidden bg-[#0F0F0F] border border-[#333]">
                                    {movie.poster_path && (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <style jsx>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        .scrollbar-hide {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>
                </div>

                {/* RIGHT SIDE - Contact Form */}
                <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* First Name & Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter First Name"
                                    className="w-full bg-[#0F0F0F] border border-[#262626] rounded-lg px-4 py-3 text-white placeholder:text-[#666666] focus:outline-none focus:border-[#E50000] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter Last Name"
                                    className="w-full bg-[#0F0F0F] border border-[#262626] rounded-lg px-4 py-3 text-white placeholder:text-[#666666] focus:outline-none focus:border-[#E50000] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your Email"
                                    className="w-full bg-[#0F0F0F] border border-[#262626] rounded-lg px-4 py-3 text-white placeholder:text-[#666666] focus:outline-none focus:border-[#E50000] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Phone Number
                                </label>
                                <div className="flex gap-2">
                                    <div className="w-20 bg-[#0F0F0F] border border-[#262626] rounded-lg px-3 py-3 flex items-center justify-center">
                                        <span className="text-2xl">🇮🇳</span>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter Phone Number"
                                        className="flex-1 bg-[#0F0F0F] border border-[#262626] rounded-lg px-4 py-3 text-white placeholder:text-[#666666] focus:outline-none focus:border-[#E50000] transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your Message"
                                rows={6}
                                className="w-full bg-[#0F0F0F] border border-[#262626] rounded-lg px-4 py-3 text-white placeholder:text-[#666666] focus:outline-none focus:border-[#E50000] transition-colors resize-none"
                            />
                        </div>

                        {/* Terms & Submit */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.agree}
                                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                                    className="mt-1 w-4 h-4 rounded border-[#262626] bg-[#0F0F0F] text-[#E50000] focus:ring-[#E50000]"
                                />
                                <span className="text-[#999999] text-sm">
                                    I agree with Terms of Use and Privacy Policy
                                </span>
                            </label>
                            <Button
                                type="submit"
                                className="bg-[#E50000] hover:bg-[#FF1A1A] text-white px-8 py-6 rounded-lg font-semibold whitespace-nowrap"
                            >
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
