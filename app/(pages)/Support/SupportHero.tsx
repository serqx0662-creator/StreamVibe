"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/app/components/ui/button";
import CustomPhoneInput from "@/app/(pages)/Support/PhoneInput";
import { CheckCircle2, X, Loader2 } from 'lucide-react';

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
}

export default function SupportHero() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    // Обработка отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Имитируем запрос к серверу
        setTimeout(() => {
            setIsSubmitting(false);
            setShowModal(true);
            // Блокируем скролл при открытой модалке
            document.body.style.overflow = 'hidden';
        }, 1500);
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <section className="container mt-20 mx-auto px-4 md:px-10 lg:px-16 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">
                {/* Левая часть: Текст и сетка фильмов */}
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

                {/* Правая часть: Форма */}
                <div className="lg:col-span-3 bg-[#0F0F0F] border border-[#262626] rounded-[20px] p-6 md:p-12 h-full">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput label="First Name" placeholder="Enter First Name" required />
                            <FormInput label="Last Name" placeholder="Enter Last Name" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput label="Email" placeholder="Enter your Email" type="email" required />
                            <CustomPhoneInput />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-white text-sm font-medium">Message</label>
                            <textarea
                                required
                                placeholder="Enter your Message"
                                rows={5}
                                className="w-full bg-[#141414] border border-[#262626] rounded-xl px-5 py-4 text-white placeholder:text-[#666666] focus:border-[#E50000] outline-none transition-all resize-none focus:ring-1 focus:ring-[#E50000]/20"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-16">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    required
                                    className="w-5 h-5 rounded border-[#262626] bg-[#141414] text-[#E50000] focus:ring-0 cursor-pointer checked:bg-[#E50000]"
                                />
                                <span className="text-[#999999] text-sm group-hover:text-white transition-colors">
                                    I agree with Terms of Use and Privacy Policy
                                </span>
                            </label>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#E50000] hover:bg-[#FF1A1A] text-white px-8 py-7 rounded-xl font-bold text-base w-full sm:w-auto transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Sending...
                                    </>
                                ) : "Send Message"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* --- MODAL WINDOW --- */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={closeModal}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-[#0F0F0F] border border-[#262626] rounded-[28px] p-8 md:p-12 max-w-lg w-full text-center shadow-[0_0_50px_rgba(229,0,0,0.15)] animate-in zoom-in-95 fade-in duration-300">
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 text-[#666666] hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-[#E50000]/10 rounded-full flex items-center justify-center border border-[#E50000]/20">
                                <CheckCircle2 size={44} className="text-[#E50000]" />
                            </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Message Sent Successfully!
                        </h3>
                        <p className="text-[#999999] text-base mb-8 leading-relaxed">
                            Thank you for reaching out to **StreamVibe**. We have received your request and our support team will contact you within **24 hours** via email.
                        </p>

                        <Button
                            onClick={closeModal}
                            className="w-full bg-[#1A1A1A] hover:bg-[#262626] text-white py-6 rounded-xl border border-[#262626] font-semibold transition-all"
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
}

function FormInput({ label, placeholder, type = "text", required = false }: { label: string, placeholder: string, type?: string, required?: boolean }) {
    return (
        <div className="space-y-3">
            <label className="block text-white text-sm font-medium">{label}</label>
            <input
                required={required}
                type={type}
                placeholder={placeholder}
                className="w-full bg-[#141414] border border-[#262626] rounded-xl px-5 py-4 text-white placeholder:text-[#666666] focus:border-[#E50000] outline-none transition-all focus:ring-1 focus:ring-[#E50000]/20"
            />
        </div>
    );
}