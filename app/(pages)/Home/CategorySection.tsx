import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { getMovieCategories } from "@/lib/tmdb"; // Импортируем нашу функцию

export default async function CategorySection() {
    const categories = await getMovieCategories();
    if (!categories || categories.length === 0) {
        return <div className="text-white text-center py-20">Failed to load categories. Check API Key.</div>;
    }

    return (
        <section className="w-full py-20 bg-[#0F0F0F]">
            <div className="container mx-auto px-4 md:px-16">

                {/* Заголовок */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-4 text-left">Explore our wide variety of categories</h2>
                        <p className="text-[#999999]">Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</p>
                    </div>

                    {/* Навигация (Стрелки) */}
                    <div className="hidden md:flex items-center gap-4 bg-[#0F0F0F] border border-[#262626] p-3 rounded-xl">
                        <button className="p-3 bg-[#1A1A1A] rounded-lg text-white hover:bg-[#262626]"><ArrowLeft size={20}/></button>
                        <div className="flex gap-1"><div className="w-6 h-1 bg-[#E50000] rounded-full"></div><div className="w-3 h-1 bg-[#333333] rounded-full"></div></div>
                        <button className="p-3 bg-[#1A1A1A] rounded-lg text-white hover:bg-[#262626]"><ArrowRight size={20}/></button>
                    </div>
                </div>

                {/* Сетка категорий */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-[#1A1A1A] border border-[#262626] p-5 rounded-2xl group cursor-pointer hover:border-[#4C4C4C] transition-all">

                            {/* Сетка 2x2 из живых данных TMDB */}
                            <div className="grid grid-cols-2 gap-2 mb-4 relative">
                                {cat.images.map((src, idx) => (
                                    <div key={idx} className="relative aspect-[4/5] rounded-lg overflow-hidden">
                                        <Image
                                            src={src}
                                            alt="Movie"
                                            fill
                                            className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                ))}
                                {/* Эффект градиентного наложения сверху */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-white font-medium">{cat.name}</span>
                                <ArrowRight className="text-[#4C4C4C] group-hover:text-white" size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}