import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

const rows = [
    "/img/bg-image/movies.png",
    "/img/bg-image/movies2.png",
    "/img/bg-image/movies3.png",
    "/img/bg-image/movies4.png",
];

const MarqueeRow = ({ direction = "left", src }: { direction?: "left" | "right", src: string }) => (
    <div className="flex overflow-hidden w-full h-[80px] md:h-[150px] lg:h-[200px] shrink-0">
        <div className={`flex flex-nowrap ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative w-[600px] md:w-[1200px] lg:w-[1800px] h-full shrink-0 mx-1">
                    <Image
                        src={src}
                        alt="Movies Strip"
                        fill
                        unoptimized
                        priority
                        className="object-cover rounded-md md:rounded-xl"
                    />
                </div>
            ))}
        </div>
    </div>
);

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen min-h-[600px] md:min-h-[900px] lg:min-h-[1100px] flex flex-col items-center overflow-hidden bg-[#0F0F0F]">

            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute  left-0 w-full flex flex-col justify-start gap-2 scale-125 md:scale-110 origin-top opacity-30 md:opacity-40">
                    {rows.map((src, idx) => (
                        <MarqueeRow key={idx} direction={idx % 2 === 0 ? "left" : "right"} src={src} />
                    ))}
                </div>

                <div className="absolute bottom-40 left-0 w-full h-[60%] bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent z-10" />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[10%] bg-gradient-to-b from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent" />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="relative z-20 flex flex-col items-center w-full h-full">

                <div className="flex flex-col items-center justify-start pt-[15vh] md:pt-[20vh] pointer-events-none">
                    <div className="relative w-[180px] h-[180px] sm:w-[250px] sm:h-[250px]  md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] aspect-square opacity-60 md:opacity-80">
                        <Image
                            src="/img/icons/Logo2.png"
                            alt="Logo Backdrop"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>


                    <div className="flex flex-col items-center text-center w-full max-w-[1200px] px-4 mt-8 md:mt-12 pointer-events-auto">
                        <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
                            The Best Streaming Experience
                        </h1>

                        <p className="text-[#999999] text-xs sm:text-sm md:text-base lg:text-lg max-w-[800px] leading-relaxed mb-8">
                            StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more.
                            <span className="hidden md:inline"> You can also create your own watchlists, so you can easily find the content you want to watch.</span>
                        </p>

                        <Link href="/Movies" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full bg-[#E50000] hover:bg-[#ff1a1a] cursor-pointer text-white px-10 py-7 rounded-xl font-bold gap-3 shadow-[0_0_20px_rgba(229,0,0,0.4)] transition-all active:scale-95 text-base"
                            >
                                <Play fill="white" size={22} />
                                Start Watching Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#0F0F0F] to-transparent z-20" />
        </section>
    );
}