"use client";

import React, { useState } from 'react';

const comparisonData = [
    { feature: "Price", basic: "$9.99/Month", standard: "$12.99/Month", premium: "$14.99/Month" },
    {
        feature: "Content",
        basic: "Access to a wide selection of movies and shows, including some new releases.",
        standard: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
        premium: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing"
    },
    { feature: "Devices", basic: "Watch on one device simultaneously", standard: "Watch on Two device simultaneously", premium: "Watch on Four device simultaneously" },
    { feature: "Free Trail", basic: "7 Days", standard: "7 Days", premium: "7 Days" },
    { feature: "Cancel Anytime", basic: "Yes", standard: "Yes", premium: "Yes" },
    { feature: "HDR", basic: "No", standard: "Yes", premium: "Yes" },
    { feature: "Dolby Atmos", basic: "No", standard: "Yes", premium: "Yes" },
    { feature: "Ad - Free", basic: "No", standard: "Yes", premium: "Yes" },
    { feature: "Offline Viewing", basic: "No", standard: "Yes, for select titles.", premium: "Yes, for all titles." },
    { feature: "Family Sharing", basic: "No", standard: "Yes, up to 5 family members.", premium: "Yes, up to 6 family members." }
];

type Plan = 'basic' | 'standard' | 'premium';

export default function ComparisonTable() {
    const [activePlan, setActivePlan] = useState<Plan>('standard');

    const plans: { id: Plan; label: string }[] = [
        { id: 'basic', label: 'Basic' },
        { id: 'standard', label: 'Standard' },
        { id: 'premium', label: 'Premium' }
    ];

    return (
        <section className="container mx-auto px-4 md:px-10 lg:px-16 py-16 md:py-24 text-white">
            <div className="mb-10 md:mb-20">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Compare our plans and find the right one for you
                </h2>
                <p className="text-[#999999] text-sm md:text-lg max-w-5xl leading-relaxed">
                    StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that's right for you.
                </p>
            </div>

            {/* --- MOBILE TABS (visible only on mobile) --- */}
            <div className="flex md:hidden justify-center mb-8">
                <div className="inline-flex p-2 bg-[#0F0F0F] border border-[#262626] rounded-xl w-full">
                    {plans.map((plan) => (
                        <button
                            key={plan.id}
                            onClick={() => setActivePlan(plan.id)}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                activePlan === plan.id ? 'bg-[#1F1F1F] text-white shadow-lg' : 'text-[#999999]'
                            }`}
                        >
                            {plan.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="border border-[#262626] rounded-2xl overflow-hidden bg-[#0F0F0F]">
                {/* --- DESKTOP TABLE --- */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="text-left p-6 text-xl font-bold border-b border-r border-[#262626] bg-[#0F0F0F] w-1/4">Features</th>
                            <th className="p-6 text-xl font-bold border-b border-r border-[#262626] bg-[#0F0F0F]">Basic</th>
                            <th className="p-6 text-xl font-bold border-b border-r border-[#262626] bg-[#0F0F0F]">
                                <div className="flex items-center justify-center gap-2">
                                    Standard
                                    <span className="bg-[#E50000] text-[10px] uppercase px-2 py-0.5 rounded-sm">Popular</span>
                                </div>
                            </th>
                            <th className="p-6 text-xl font-bold border-b border-[#262626] bg-[#0F0F0F]">Premium</th>
                        </tr>
                        </thead>
                        <tbody>
                        {comparisonData.map((row, idx) => (
                            <tr key={idx} className="group hover:bg-[#141414] transition-colors">
                                <td className="p-6 text-[#999999] font-medium border-b border-r border-[#262626]">{row.feature}</td>
                                <td className="p-6 text-[#999999] text-center border-b border-r border-[#262626]">{row.basic}</td>
                                <td className="p-6 text-[#999999] text-center border-b border-r border-[#262626]">{row.standard}</td>
                                <td className="p-6 text-[#999999] text-center border-b border-[#262626]">{row.premium}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* --- MOBILE VIEW (Simplified Grid) --- */}
                <div className="md:hidden p-6 grid grid-cols-2 gap-y-10 gap-x-6">
                    {comparisonData.map((row, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                            <span className="text-[#999999] text-sm font-medium">{row.feature}</span>
                            <span className="text-white text-sm font-semibold leading-relaxed">
                                {activePlan === 'basic' ? row.basic : activePlan === 'standard' ? row.standard : row.premium}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}