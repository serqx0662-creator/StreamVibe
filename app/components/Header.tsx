"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import Logo from "..//../public/img/icons/Logo.png"

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 lg:px-12 flex items-center justify-between ${
                isScrolled ? "bg-black/95 shadow-lg" : "bg-transparent"
            }`}
        >
            <div className="flex items-center gap-2">
                <div className="relative w-[200px] h-[50px]">
                    <Image src={Logo} alt="StreamVibe" fill className="object-contain" />
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl p-1 px-2">
                <NavLink href="#" label="Home" active/>
                <NavLink href="#" label="Movies & Shows" />
                <NavLink href="#" label="Support" />
                <NavLink href="#" label="Subscriptions" />
            </nav>


            <div className="flex items-center gap-5">
                <button className="text-white hover:text-red-600 transition-colors">
                    <Search size={24} />
                </button>
                <button className="text-white hover:text-red-600 transition-colors">
                    <Bell size={24} />
                </button>
            </div>
        </header>
    );
}

// Мини-компонент для ссылок
function NavLink({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`px-6 py-3 gap-2 rounded-lg text-sm font-medium transition-all ${
                active
                    ? "bg-[#1A1A1A] text-white border border-white/5"
                    : "text-[#BFBFBF] hover:text-white hover:border-white/5 hover:bg-[#1A1A1A]"
            }`}
        >
            {label}
        </Link>
    );
}