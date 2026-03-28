"use client";

import React from 'react';
import { Plus, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface SimilarShow {
    id: number;
    overview: string;
    vote_average: number;
    name?: string;
}
interface ReviewsSectionProps {
    reviews: SimilarShow[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
    return (
        <div className="bg-[#1A1A1A] border border-[#262626] p-8 md:p-10 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#999999] font-medium text-lg">Reviews</h3>
                <Button
                    variant="outline"
                    className="bg-[#141414] border-[#262626] text-white hover:text-white gap-2 hover:bg-[#262626] text-xs h-12 px-5 rounded-lg"
                >
                    <Plus size={18}/> Add Your Review
                </Button>
            </div>

            <div className="relative">
                {reviews.length > 0 ? (
                    <>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation={{
                                prevEl: '.reviews-prev',
                                nextEl: '.reviews-next',
                            }}
                            pagination={{
                                el: '.reviews-pagination',
                                clickable: true,
                                renderBullet: (index, className) => {
                                    return `<span class="${className} custom-bullet"></span>`;
                                },
                            }}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                            }}
                            className="pb-16"
                        >
                            {reviews.map((review) => (
                                <SwiperSlide key={review.id}>
                                    <ReviewCard review={review} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="flex justify-center items-center gap-6 mt-10">
                            <Button
                                size="icon"
                                className="reviews-prev flex-shrink-0 bg-[#141414] border border-[#262626] rounded-full w-12 h-12 text-white hover:bg-[#262626] transition-all"
                            >
                                <ArrowLeft size={20} />
                            </Button>

                            <div className="reviews-pagination flex items-center justify-center gap-1.5 min-w-max" />

                            <Button
                                size="icon"
                                className="reviews-next flex-shrink-0 bg-[#141414] border border-[#262626] rounded-full w-12 h-12 text-white hover:bg-[#262626] transition-all"
                            >
                                <ArrowRight size={20} />
                            </Button>
                        </div>
                    </>
                ) : (
                    <p className="text-[#666666] text-sm">No reviews available yet.</p>
                )}
            </div>

            <style jsx global>{`
                .custom-bullet {
                    width: 16px;
                    height: 4px;
                    background: #333333 !important;
                    border-radius: 10px;
                    opacity: 1 !important;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    display: inline-block;
                }
                .swiper-pagination-bullet-active.custom-bullet {
                    width: 24px;
                    background: #E50000 !important;
                }
            `}</style>
        </div>
    );
}

function ReviewCard({ review }: { review: SimilarShow }) {
    const rating = movieRatingToFive(review.vote_average);

    return (
        <Card className="bg-[#141414] border border-[#262626] p-6 md:p-8 rounded-xl space-y-5 h-full min-h-[220px]">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-medium text-white text-lg">Aniket Roy</h4>
                    <p className="text-sm text-[#666666]">From India</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0F0F0F] px-3 py-1.5 rounded-full border border-[#262626]">
                    <div className="flex text-[#E50000]">{renderStars(rating)}</div>
                    <span className="text-sm font-bold ml-1 text-[#999999]">{rating.toFixed(1)}</span>
                </div>
            </div>
            <p className="text-[#999999] text-sm md:text-base leading-relaxed line-clamp-5">
                {review.overview || "This movie offers an incredible cinematic experience with great visuals and emotional depth."}
            </p>
        </Card>
    );
}

const movieRatingToFive = (rating: number) => {
    return rating > 0 ? rating / 2 : 4.5;
};

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
        <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? "fill-[#E50000] text-[#E50000]" : "text-[#333333]"}
        />
    ));
};