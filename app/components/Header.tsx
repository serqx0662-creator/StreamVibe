"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Bell, X, Clapperboard, Tv, Loader, Menu, LayoutGrid } from "lucide-react";
import Logo from "../../public/img/icons/Logo.png";
import { usePathname, useRouter } from "next/navigation";

interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    media_type?: 'movie' | 'tv'; // Добавляем тип медиа
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Состояния поиска
    const [searchType, setSearchType] = useState<'all' | 'movie' | 'tv'>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen || isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isSearchOpen, isMobileMenuOpen]);

    // Живой поиск
    useEffect(() => {
        let isMounted = true;
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length > 2) {
                setIsSearching(true);
                try {
                    // Используем multi для 'all', иначе конкретный тип
                    const endpoint = searchType === 'all' ? 'multi' : searchType;
                    const res = await fetch(
                        `https://api.themoviedb.org/3/search/${endpoint}?query=${encodeURIComponent(searchQuery)}&language=en-US`,
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                                accept: 'application/json'
                            }
                        }
                    );
                    const data = await res.json();
                    if (isMounted) {
                        // Фильтруем, чтобы в 'all' не попадали люди (person)
                        const filtered = data.results?.filter((item: any) =>
                            item.media_type !== 'person'
                        ).slice(0, 9) || [];
                        setResults(filtered);
                    }
                } catch (error) {
                    console.error("Search error:", error);
                } finally {
                    if (isMounted) setIsSearching(false);
                }
            } else {
                setResults([]);
            }
        }, 400);

        return () => {
            isMounted = false;
            clearTimeout(delayDebounceFn);
        };
    }, [searchQuery, searchType]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        // Редирект в зависимости от типа
        const route = searchType === 'tv' ? '/Shows' : '/Movies';
        router.push(`${route}?search=${encodeURIComponent(searchQuery)}`);
        setIsSearchOpen(false);
    };

    const navLinks = [
        { href: "/Home", label: "Home" },
        { href: "/Movies", label: "Movies & Shows" },
        { href: "/Support", label: "Support" },
        { href: "/Subscriptions", label: "Subscriptions" },
    ];

    const checkActive = (href: string) => {
        if (href === "/Home") return pathname === "/" || pathname === "/Home";
        if (href === "/Movies") return pathname.startsWith("/Movies") || pathname.startsWith("/Shows");
        return pathname.startsWith(href);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-4 lg:px-12 flex items-center justify-between ${
                isScrolled ? "bg-black/70 backdrop-blur-xl py-3 shadow-2xl" : "bg-transparent py-6"
            }`}>
                <Link href="/Home" className="relative w-[140px] md:w-[160px] h-[40px] md:h-[45px]">
                    <Image src={Logo} alt="StreamVibe" fill className="object-contain" priority />
                </Link>

                <nav className="hidden xl:flex items-center gap-1 bg-[#0A0A0A]  border-3 border-[#1F1F1F] rounded-xl p-1.5 shadow-inner">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} href={link.href} label={link.label} active={checkActive(link.href)} />
                    ))}
                </nav>

                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="text-white p-2.5 hover:bg-[#1A1A1A] rounded-xl transition-all border border-transparent hover:border-[#262626]"
                    >
                        <Search size={22} />
                    </button>
                    <button className="hidden sm:block text-white p-2.5 hover:bg-[#1A1A1A] rounded-xl transition-all border border-transparent hover:border-[#262626]">
                        <Bell size={22} />
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="xl:hidden text-white p-2.5 bg-[#1A1A1A] border border-[#262626] rounded-xl"
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </header>
            <div
                className={`fixed inset-0 z-[70] transition-all duration-500 ${
                    isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 delay-500"
                }`}
            >
                {/* Оверлей (задний фон) */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
                        isMobileMenuOpen ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Сама панель меню */}
                <div
                    className={`absolute top-0 right-0 w-[80%] max-w-[300px] h-full bg-[#0F0F0F] border-l border-[#262626] p-8 shadow-2xl transition-transform duration-500 ease-out ${
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex justify-between items-center mb-12">
                        <span className="text-[#999999] font-bold uppercase tracking-widest text-xs">Navigation</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-white bg-[#1A1A1A] p-2 rounded-full hover:bg-[#E50000] transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-lg font-medium transition-all duration-300 transform ${
                                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                                } ${
                                    checkActive(link.href) ? "text-[#E50000]" : "text-white hover:text-[#E50000] hover:translate-x-2"
                                }`}
                                style={{ transitionDelay: isMobileMenuOpen ? `${100 + (navLinks.indexOf(link) * 50)}ms` : '0ms' }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* --- SEARCH OVERLAY --- */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[60] bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col items-center justify-start pt-16 md:pt-24 px-4 overflow-y-auto pb-10 transition-all animate-in fade-in duration-300">
                    <button
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(""); setResults([]); }}
                        className="absolute top-6 right-6 text-[#999999] hover:text-white transition-colors p-3 bg-[#1A1A1A] rounded-full border border-[#262626] hover:bg-[#E50000] hover:border-[#E50000]"
                    >
                        <X size={24} />
                    </button>

                    <div className="w-full max-w-5xl space-y-10">
                        {/* Кнопки переключения All / Movies / Shows */}
                        <div className="flex py-6 justify-center">
                            <div className="bg-[#141414] border border-[#262626] p-1.5 rounded-2xl flex gap-1 shadow-2xl">
                                <SearchTabButton
                                    active={searchType === 'all'}
                                    onClick={() => setSearchType('all')}
                                    icon={<LayoutGrid size={18} />}
                                    label="All"
                                />
                                <SearchTabButton
                                    active={searchType === 'movie'}
                                    onClick={() => setSearchType('movie')}
                                    icon={<Clapperboard size={18} />}
                                    label="Movies"
                                />
                                <SearchTabButton
                                    active={searchType === 'tv'}
                                    onClick={() => setSearchType('tv')}
                                    icon={<Tv size={18} />}
                                    label="Shows"
                                />
                            </div>
                        </div>

                        {/* Поле ввода */}
                        <div className="relative group max-w-3xl mx-auto">
                            <form onSubmit={handleSearchSubmit}>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder={`Search ${searchType === 'all' ? 'everything' : searchType === 'movie' ? 'movies' : 'TV shows'}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#262626] focus:border-[#E50000] py-6 text-2xl md:text-4xl font-bold text-white outline-none transition-all placeholder:text-[#333333] text-center"
                                />
                            </form>
                            {isSearching && (
                                <div className="absolute right-0 bottom-6 animate-pulse">
                                    <Loader className="animate-spin text-[#E50000]" size={28} />
                                </div>
                            )}
                        </div>

                        {/* Результаты */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                            {results.length > 0 ? (
                                results.map((item) => {
                                    // Определяем тип для ссылки (если это поиск 'all', берем из item.media_type)
                                    const finalType = item.media_type || (searchType === 'tv' ? 'tv' : 'movie');
                                    const linkPrefix = finalType === 'tv' ? 'Shows' : 'Movies';

                                    return (
                                        <Link
                                            key={`${item.id}-${finalType}`}
                                            href={`/${linkPrefix}/${item.id}`}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-[#141414] border border-[#262626] hover:bg-[#1A1A1A] hover:border-[#E50000]/50 transition-all group relative overflow-hidden"
                                        >
                                            <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-[#262626] shadow-lg">
                                                {item.poster_path ? (
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                                        alt={item.title || item.name || ""}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-[#4C4C4C] font-bold">NO POSTER</div>
                                                )}
                                                {/* Иконка типа в углу постера */}
                                                <div className="absolute top-1 right-1 p-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10">
                                                    {finalType === 'movie' ? <Clapperboard size={12} className="text-white" /> : <Tv size={12} className="text-[#E50000]" />}
                                                </div>
                                            </div>

                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="text-white font-bold text-lg truncate group-hover:text-[#E50000] transition-colors leading-tight">
                                                    {item.title || item.name}
                                                </span>
                                                <div className="flex items-center gap-3 text-[#999999] text-xs mt-2">
                                                    <div className="flex items-center gap-1 text-[#FFAD49] font-bold">
                                                        ★ <span>{item.vote_average?.toFixed(1)}</span>
                                                    </div>
                                                    <span className="opacity-30">|</span>
                                                    <span className="font-medium">
                                                        {(item.release_date || item.first_air_date)?.split('-')[0] || "TBA"}
                                                    </span>
                                                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#E50000] font-bold uppercase tracking-tighter">View →</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : searchQuery.length > 2 && !isSearching && (
                                <div className="col-span-full text-center py-20 animate-in fade-in zoom-in duration-300">
                                    <p className="text-[#4C4C4C] text-lg font-medium">Nothing found for "{searchQuery}"</p>
                                    <p className="text-[#262626] text-sm mt-1">Try checking for typos or change categories</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Вспомогательный компонент для кнопок табов в поиске
function SearchTabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                active
                    ? "bg-[#E50000] text-white shadow-[0_0_20px_rgba(229,0,0,0.3)]"
                    : "text-[#999999] hover:text-white hover:bg-[#1A1A1A]"
            }`}
        >
            {icon} {label}
        </button>
    );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                active ? "bg-[#1A1A1A] text-white" : "text-[#BFBFBF] hover:text-white hover:bg-[#1A1A1A]"
            }`}
        >
            {label}
        </Link>
    );
}