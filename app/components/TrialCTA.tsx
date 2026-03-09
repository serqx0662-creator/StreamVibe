// components/Movie/TrialCTA.tsx
import Image from "next/image";
import BGimage from "../../public/img/bg-full.png";

export default function TrialCTA() {
    return (
        <section className="relative w-full px-4 lg:px-12 py-10">
            <div className="relative w-full max-w-[1920px] mx-auto min-h-[300px] rounded-3xl overflow-hidden border border-white/5 flex items-center">

                <Image
                    src={BGimage}
                    alt="Movies Background"
                    fill
                    className="object-cover object-center\"
                    priority
                />


                {/* 3. КОНТЕНТ - поверх всего */}
                <div className="relative z-20 w-full flex flex-col lg:flex-row items-center justify-between gap-10 p-8 lg:p-16 text-center lg:text-left">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                            Start your free trial today!
                        </h2>
                        <p className="text-[#BFBFBF] text-sm lg:text-base max-w-xl">
                            This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.
                        </p>
                    </div>

                    <button className="bg-[#E50000] hover:bg-[#ff1a1a] text-white px-10 py-5 rounded-2xl font-semibold transition-all shrink-0 active:scale-[0.98] shadow-lg shadow-red-600/20">
                        Start a Free Trail
                    </button>
                </div>
            </div>
        </section>
    );
}