"use client";

import React from 'react';

const comparisonData = [
    {
        feature: "Price",
        basic: "$9.99/Month",
        standard: "$12.99/Month",
        premium: "$14.99/Month"
    },
    {
        feature: "Content",
        basic: "Access to a wide selection of movies and shows, including some new releases.",
        standard: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
        premium: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing"
    },
    {
        feature: "Devices",
        basic: "Watch on one device simultaneously",
        standard: "Watch on Two device simultaneously",
        premium: "Watch on Four device simultaneously"
    },
    {
        feature: "Free Trial",
        basic: "7 Days",
        standard: "7 Days",
        premium: "7 Days"
    },
    {
        feature: "Cancel Anytime",
        basic: "Yes",
        standard: "Yes",
        premium: "Yes"
    },
    {
        feature: "HDR",
        basic: "No",
        standard: "Yes",
        premium: "Yes"
    },
    {
        feature: "Dolby Atmos",
        basic: "No",
        standard: "Yes",
        premium: "Yes"
    },
    {
        feature: "Ad - Free",
        basic: "No",
        standard: "Yes",
        premium: "Yes"
    },
    {
        feature: "Offline Viewing",
        basic: "No",
        standard: "Yes, for select titles.",
        premium: "Yes, for all titles."
    },
    {
        feature: "Family Sharing",
        basic: "No",
        standard: "Yes, up to 5 family members.",
        premium: "Yes, up to 6 family members."
    }
];

export default function ComparisonTable() {
    return (
        <section className="container mx-auto px-4 md:px-10 lg:px-16 py-16 md:py-24">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Compare our plans and find the right one for you
                </h2>
                <p className="text-[#999999] text-base md:text-lg max-w-4xl">
                    StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that's right for you.
                </p>
            </div>

            {/* Comparison Table */}
            <div className="bg-[#0F0F0F] border border-[#262626] rounded-xl overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#262626]">
                                <th className="text-left p-6 text-white font-semibold text-lg bg-[#1A1A1A] border-r border-[#262626]">
                                    Features
                                </th>
                                <th className="text-center p-6 text-white font-semibold text-lg bg-[#1A1A1A] border-r border-[#262626]">
                                    Basic
                                </th>
                                <th className="text-center p-6 text-white font-semibold text-lg bg-[#1A1A1A] border-r border-[#262626] relative">
                                    <div className="flex items-center justify-center gap-2">
                                        Standard
                                        <span className="bg-[#E50000] text-white text-xs font-semibold px-2 py-1 rounded">
                                            Popular
                                        </span>
                                    </div>
                                </th>
                                <th className="text-center p-6 text-white font-semibold text-lg bg-[#1A1A1A]">
                                    Premium
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-[#262626] hover:bg-[#1A1A1A]/30 transition-colors"
                                >
                                    <td className="p-6 text-white font-medium border-r border-[#262626] whitespace-nowrap">
                                        {row.feature}
                                    </td>
                                    <td className="p-6 text-[#999999] text-center text-sm border-r border-[#262626]">
                                        {row.basic}
                                    </td>
                                    <td className="p-6 text-[#999999] text-center text-sm bg-[#0A0A0A] border-r border-[#262626]">
                                        {row.standard}
                                    </td>
                                    <td className="p-6 text-[#999999] text-center text-sm">
                                        {row.premium}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-6 p-4">
                    {comparisonData.map((row, index) => (
                        <div key={index} className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-4">
                            <h4 className="text-white font-semibold mb-4">{row.feature}</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <span className="text-[#999999] text-sm">Basic:</span>
                                    <span className="text-white text-sm text-right flex-1 ml-2">{row.basic}</span>
                                </div>
                                <div className="flex justify-between items-start bg-[#0A0A0A] -mx-4 px-4 py-2">
                                    <span className="text-[#999999] text-sm flex items-center gap-2">
                                        Standard
                                        <span className="bg-[#E50000] text-white text-xs px-2 py-0.5 rounded">Popular</span>
                                    </span>
                                    <span className="text-white text-sm text-right flex-1 ml-2">{row.standard}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <span className="text-[#999999] text-sm">Premium:</span>
                                    <span className="text-white text-sm text-right flex-1 ml-2">{row.premium}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
