"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Bell, X, Clapperboard, Tv, Loader, Menu } from "lucide-react";
import Logo from "../../public/img/icons/Logo.png"; // Исправлен путь (убрана лишняя точка)
import { usePathname, useRouter } from "next/navigation";

// Интерфейс для результатов поиска
interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchType, setSearchType] = useState<'movie' | 'tv'>('movie');
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    // 1. Скролл-эффект
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 2. Блокировка скролла body
    useEffect(() => {
        if (isSearchOpen || isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isSearchOpen, isMobileMenuOpen]);

    // 3. Живой поиск (Debounce)
    useEffect(() => {
        let isMounted = true;

        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length > 2) {
                setIsSearching(true);
                try {
                    const type = searchType === 'movie' ? 'movie' : 'tv';
                    const res = await fetch(
                        `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(searchQuery)}&language=en-US`,
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                                accept: 'application/json'
                            }
                        }
                    );
                    const data = await res.json();
                    if (isMounted) {
                        setResults(data.results?.slice(0, 6) || []);
                    }
                } catch (error) {
                    console.error("Search error:", error);
                } finally {
                    if (isMounted) setIsSearching(false);
                }
            } else {
                setResults([]);
            }
        }, 500);

        return () => {
            isMounted = false;
            clearTimeout(delayDebounceFn);
        };
    }, [searchQuery, searchType]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        const targetRoute = searchType === 'movie' ? '/Movies' : '/Shows';
        router.push(`${targetRoute}?search=${encodeURIComponent(searchQuery)}`);
        setIsSearchOpen(false);
    };

    const navLinks = [
        { href: "/Home", label: "Home" },
        { href: "/Movies", label: "Movies & Shows" },
        { href: "/Support", label: "Support" },
        { href: "/Subscriptions", label: "Subscriptions" },
    ];

    // Функция для определения активной ссылки
    const checkActive = (href: string) => {
        if (href === "/Home") return pathname === "/" || pathname === "/Home";
        if (href === "/Movies") return pathname.startsWith("/Movies") || pathname.startsWith("/Shows");
        return pathname.startsWith(href);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-4 lg:px-12 flex items-center justify-between ${
                isScrolled ? "bg-black/85 backdrop-blur-lg py-3" : "bg-transparent py-5"
            }`}>
                <Link href="/Home" className="relative w-[140px] md:w-[160px] h-[40px] md:h-[45px]">
                    <Image src={Logo} alt="StreamVibe" fill className="object-contain" priority />
                </Link>

                <nav className="hidden xl:flex items-center gap-1 bg-black border border-[#1F1F1F] rounded-xl p-1.5">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            active={checkActive(link.href)}
                        />
                    ))}
                </nav>

                <div className="flex items-center gap-2 md:gap-4">
                    <button onClick={() => setIsSearchOpen(true)} className="text-white p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors">
                        <Search size={24} />
                    </button>
                    <button className="hidden sm:block text-white p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors">
                        <Bell size={24} />
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="xl:hidden text-white p-2 bg-[#1A1A1A] border border-[#262626] rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* --- MOBILE MENU --- */}
            <div className={`fixed inset-0 z-[70] ${isMobileMenuOpen ? "visible" : "invisible"}`}>
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                <div className={`absolute top-0 right-0 w-[80%] max-w-[300px] h-full bg-[#0F0F0F] border-l border-[#262626] p-8 transition-transform duration-500 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex justify-between items-center mb-12">
                        <span className="text-[#999999] font-bold uppercase tracking-widest text-xs">Navigation</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-white bg-[#1A1A1A] p-2 rounded-full">
                            <X size={20} />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-lg font-medium transition-colors ${
                                    checkActive(link.href) ? "text-[#E50000]" : "text-white hover:text-[#E50000]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* --- SEARCH OVERLAY --- */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-start pt-20 md:pt-32 px-4 overflow-y-auto pb-10 transition-all">
                    <button
                        onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                            setResults([]);
                        }}
                        className="absolute top-6 right-6 md:top-8 md:right-8 text-[#999999] hover:text-white transition-colors p-2 bg-[#1A1A1A] rounded-full"
                    >
                        <X size={28} />
                    </button>

                    <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex justify-center">
                            <div className="bg-[#141414] border border-[#262626] p-1 rounded-xl flex gap-1">
                                <button
                                    onClick={() => { setSearchType('movie'); setResults([]); }}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${searchType === 'movie' ? "bg-[#E50000] text-white" : "text-[#999999] hover:text-white"}`}
                                >
                                    <Clapperboard size={18} /> Movies
                                </button>
                                <button
                                    onClick={() => { setSearchType('tv'); setResults([]); }}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${searchType === 'tv' ? "bg-[#E50000] text-white" : "text-[#999999] hover:text-white"}`}
                                >
                                    <Tv size={18} /> TV Shows
                                </button>
                            </div>
                        </div>

                        <div className="relative group">
                            <form onSubmit={handleSearch}>
                                <input
                                    autoFocus
                                    type="text"
                                    autoComplete="off"
                                    placeholder={`Search for a ${searchType === 'movie' ? 'movie' : 'show'}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-b-2 border-[#262626] focus:border-[#E50000] py-4 text-xl md:text-4xl font-semibold text-white outline-none transition-all placeholder:text-[#4C4C4C]"
                                />
                            </form>
                            {isSearching && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                    <Loader className="animate-spin text-[#E50000]" size={24} />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                            {results.length > 0 ? (
                                results.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/${searchType === 'movie' ? 'Movies' : 'Shows'}/${item.id}`}
                                        onClick={() => setIsSearchOpen(false)}
                                        className="flex items-center gap-4 p-3 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#E50000] transition-all group"
                                    >
                                        <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#262626]">
                                            {item.poster_path ? (
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                                    alt={item.title || item.name || "Poster"}
                                                    fill
                                                    sizes="64px"
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-[#4C4C4C] uppercase text-center p-1">No Image</div>
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-white font-medium truncate group-hover:text-[#E50000] transition-colors">
                                                {item.title || item.name}
                                            </span>
                                            <div className="flex items-center gap-2 text-[#666666] text-xs mt-1">
                                                <span className="flex items-center gap-1 text-[#FFAD49]">★ {item.vote_average?.toFixed(1)}</span>
                                                <span>•</span>
                                                <span>{(item.release_date || item.first_air_date)?.split('-')[0] || "N/A"}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : searchQuery.length > 2 && !isSearching ? (
                                <div className="col-span-full text-center py-10 text-[#666666]">No results found.</div>
                            ) : (
                                <div className="col-span-full text-center py-10 text-[#4C4C4C] text-sm italic">Start typing...</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                active ? "bg-[#1A1A1A] text-white border border-white/5" : "text-[#BFBFBF] hover:text-white hover:bg-[#1A1A1A]"
            }`}
        >
            {label}
        </Link>
    );
}