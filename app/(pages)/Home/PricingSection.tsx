"use client"
import React, { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

const plans = [
    {
        name: "Basic Plan",
        description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
        monthlyPrice: 9.99,
        yearlyPrice: 119.88,
    },
    {
        name: "Standard Plan",
        description: "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
        monthlyPrice: 12.99,
        yearlyPrice: 155.88,
    },
    {
        name: "Premium Plan",
        description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing.",
        monthlyPrice: 14.99,
        yearlyPrice: 179.88,
    },
];

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
                <div className="max-w-[800px]">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Choose the plan that's right for you
                    </h2>
                    <p className="text-[#999999] text-sm md:text-base">
                        Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!
                    </p>
                </div>

                <div className="flex items-center p-2 bg-black border border-[#262626] rounded-[12px]">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-3 cursor-pointer rounded-[10px] text-sm font-medium transition-all ${
                            billingCycle === 'monthly'
                                ? 'bg-[#1F1F1F] text-white shadow-lg'
                                : 'text-[#999999] hover:text-white'
                        }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-6 py-3 cursor-pointer rounded-[10px] text-sm font-medium transition-all ${
                            billingCycle === 'yearly'
                                ? 'bg-[#1F1F1F] text-white shadow-lg'
                                : 'text-[#999999] hover:text-white'
                        }`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <Card key={index} className="bg-[#1A1A1A] border-[#262626] p-6 md:p-10 rounded-[16px] flex flex-col justify-between hover:border-[#4C4C4C] transition-colors">
                        <CardContent className="p-0">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                                {plan.name}
                            </h3>
                            <p className="text-[#999999] text-sm md:text-base mb-8 leading-relaxed">
                                {plan.description}
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-3xl md:text-4xl font-bold text-white transition-all duration-300">
                                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                                </span>
                                <span className="text-[#999999] text-lg transition-all duration-300">
                                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                                </span>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    variant="ghost"
                                    className="flex-1 bg-[#141414] cursor-pointer text-white border border-[#262626] hover:bg-[#1F1F1F] hover:text-white rounded-[10px] py-6"
                                >
                                    Start Free Trial
                                </Button>
                                <Button
                                    className="flex-1 bg-[#E50000] text-white cursor-pointer hover:bg-[#FF1A1A] rounded-[10px] py-6"
                                >
                                    Choose Plan
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}