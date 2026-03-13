"use client";

import React from 'react';

interface DescriptionSectionProps {
    overview: string;
}

export default function DescriptionSection({ overview }: DescriptionSectionProps) {
    return (
        <div className="bg-[#1A1A1A] border border-[#262626] p-8 md:p-10 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#999999] font-medium text-lg">Description</h3>
            </div>
            <p className="text-white leading-relaxed text-sm md:text-base opacity-90">{overview}</p>
        </div>
    );
}
