import { Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const sections = [
        {
            title: "Home",
            links: [
                { name: "Categories", href: "/#categories" },
                { name: "Devices", href: "/#devices" },
                { name: "Pricing", href: "/#pricing" },
                { name: "FAQ", href: "/#faq" }
            ]
        },
        {
            title: "Movies",
            links: [
                { name: "Genres", href: "/Movies#genres" },
                { name: "Trending", href: "/Movies#trending" },
                { name: "New Release", href: "/Movies#new-release" },
                { name: "Popular", href: "/Movies#popular" }
            ]
        },
        {
            title: "Shows",
            links: [
                { name: "Genres", href: "/Shows" },
                { name: "Trending", href: "/Shows" },
                { name: "New Release", href: "/Shows#new-release" },
                { name: "Popular", href: "/Shows#popular" }
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Contact Us", href: "/Support" }
            ]
        },
        {
            title: "Subscription",
            links: [
                { name: "Plans", href: "/Subscription#plans" },
                { name: "Features", href: "/Subscription#features" }
            ]
        },
    ];

    return (
        <footer className="bg-[#0F0F0F] pt-20 pb-10 px-4 lg:px-16 border-t border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">
                {sections.map((section) => (
                    <div key={section.title}>
                        {/* Делаем заголовки тоже кликабельными, если это логично */}
                        <h4 className="text-white font-bold mb-6 cursor-default">
                            {section.title}
                        </h4>
                        <ul className="space-y-4">
                            {section.links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[#999999] hover:text-white text-sm transition-colors block w-fit"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Соцсети */}
                <div>
                    <h4 className="text-white font-bold mb-6">Connect With Us</h4>
                    <div className="flex gap-4">
                        <SocialIcon icon={<Facebook size={20} />} href="https://facebook.com" />
                        <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com" />
                        <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com" />
                    </div>
                </div>
            </div>

            {/* Нижняя часть */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[#999999] text-sm">@2026 StreamVibe, All Rights Reserved</p>
                <div className="flex gap-6 text-[#999999] text-sm">
                    <Link href="/Terms" className="hover:text-white transition-colors">Terms of Use</Link>
                    <Link href="/Privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/Cookie" className="hover:text-white transition-colors">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#1A1A1A] border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#E50000] hover:border-[#E50000] transition-all"
        >
            {icon}
        </a>
    );
}