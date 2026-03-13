"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import Logo from "..//../public/img/icons/Logo.png"
import {usePathname} from "next/navigation";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

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
    }, [])

    const navLinks = [
        { href: "/Home", label: "Home" },
        { href: "/Movies", label: "Movies & Shows" },
        { href: "/Support", label: "Support" },
        { href: "/Subscriptions", label: "Subscriptions" },
    ];


    return (
        <header
            className={` fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 lg:px-12 flex items-center justify-between ${
                isScrolled ? "bg-black/95 shadow-lg" : "bg-transparent"
            }`}
        >
            <div className="flex items-center gap-2">
                <div className="relative w-[200px] h-[50px]">
                    <Image src={Logo} alt="StreamVibe" fill  className="object-contain" />
                </div>
            </div>

            <nav className="hidden md:flex items-center gap-1 bg-black border border-[#1F1F1F] rounded-xl p-2">
                {navLinks.map((link) => {
                    const isActive =
                        pathname === link.href ||
                        (link.href !== "/Home" && pathname.startsWith(link.href));

                    return (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            active={isActive}
                        />
                    );
                })}
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