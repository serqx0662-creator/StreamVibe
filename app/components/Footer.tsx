import { Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const sections = [
        { title: "Home", links: ["Categories", "Devices", "Pricing", "FAQ"] },
        { title: "Movies", links: ["Gernes", "Trending", "New Release", "Popular"] },
        { title: "Shows", links: ["Gernes", "Trending", "New Release", "Popular"] },
        { title: "Support", links: ["Contact Us"] },
        { title: "Subscription", links: ["Plans", "Features"] },
    ];

    return (
        <footer className="bg-[#0F0F0F] pt-20 pb-10 px-4 lg:px-12 border-t border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h4 className="text-white font-bold mb-6">{section.title}</h4>
                        <ul className="space-y-4">
                            {section.links.map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-[#999999] hover:text-white text-sm transition-colors">
                                        {link}
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
                        <SocialIcon icon={<Facebook size={20} />} />
                        <SocialIcon icon={<Twitter size={20} />} />
                        <SocialIcon icon={<Linkedin size={20} />} />
                    </div>
                </div>
            </div>

            {/* Нижняя часть */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[#999999] text-sm">@2023 streamvib, All Rights Reserved</p>
                <div className="flex gap-6 text-[#999999] text-sm">
                    <Link href="#" className="hover:text-white">Terms of Use</Link>
                    <Link href="#" className="hover:text-white">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="w-12 h-12 bg-[#1A1A1A] border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#E50000] hover:border-[#E50000] transition-all">
            {icon}
        </button>
    );
}