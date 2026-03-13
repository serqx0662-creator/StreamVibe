"use client";

import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

interface ReviewsSectionProps {
    reviews: any[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
    return (
        <div className="bg-[#1A1A1A] border border-[#262626] p-8 md:p-10 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#999999] font-medium text-lg">Reviews</h3>
                <Button variant="outline" className="bg-[#141414] border-[#262626] text-white gap-2 hover:bg-[#262626] text-xs">
                    <Plus size={16}/> Add Your Review
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.slice(0, 2).map((review: any) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}

function ReviewCard({ review }: any) {
    return (
        <Card className="bg-[#141414] border border-[#262626] p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-medium text-white">User Review</h4>
                    <p className="text-xs text-[#666666]">From Movie Portal</p>
                </div>
                <div className="flex items-center gap-1 bg-[#0F0F0F] px-3 py-1.5 rounded-full border border-[#262626]">
                    <div className="flex text-[#E50000]">{renderStars(4.5)}</div>
                    <span className="text-xs font-bold ml-1">4.5</span>
                </div>
            </div>
            <p className="text-[#999999] text-sm leading-relaxed line-clamp-4 italic">
                "{review.overview || "This movie offers an incredible cinematic experience with great visuals."}"
            </p>
        </Card>
    );
}

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-current" : "opacity-30"} />
    ));
};
