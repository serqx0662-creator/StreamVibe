"use client";

import React, { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

const plans = [
    {
        id: 1,
        name: "Basic Plan",
        description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
        price: "$9.99",
        period: "/month"
    },
    {
        id: 2,
        name: "Standard Plan",
        description: "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
        price: "$12.99",
        period: "/month",
        popular: true
    },
    {
        id: 3,
        name: "Premium Plan",
        description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing.",
        price: "$14.99",
        period: "/month"
    }
];

export default function PricingPlans() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <section className="container mx-auto px-4 md:px-10 lg:px-16 py-16 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Choose the plan that's right for you
                    </h1>
                    <p className="text-[#999999] text-base md:text-lg max-w-3xl">
                        Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center gap-2 bg-[#0F0F0F] border border-[#262626] rounded-lg p-1">
                    <button
                        onClick={() => setBillingPeriod('monthly')}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                            billingPeriod === 'monthly'
                                ? 'bg-[#1A1A1A] text-white'
                                : 'text-[#999999] hover:text-white'
                        }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingPeriod('yearly')}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                            billingPeriod === 'yearly'
                                ? 'bg-[#1A1A1A] text-white'
                                : 'text-[#999999] hover:text-white'
                        }`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card
                        key={plan.id}
                        className="bg-[#1A1A1A] border-[#262626] p-8 rounded-xl hover:border-[#333333] transition-all relative"
                    >
                        {plan.popular && (
                            <div className="absolute top-4 right-4">
                                <span className="bg-[#E50000] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    Popular
                                </span>
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-white mb-3">{plan.name}</h3>
                        <p className="text-[#999999] text-sm mb-6 leading-relaxed min-h-[60px]">
                            {plan.description}
                        </p>

                        <div className="mb-8">
                            <span className="text-4xl font-bold text-white">{plan.price}</span>
                            <span className="text-[#999999] text-lg">{plan.period}</span>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                variant="outline"
                                className="w-full bg-[#0F0F0F] border-[#262626] text-white hover:bg-[#1A1A1A] py-6 rounded-lg"
                            >
                                Start Free Trial
                            </Button>
                            <Button className="w-full bg-[#E50000] hover:bg-[#FF1A1A] text-white py-6 rounded-lg font-semibold">
                                Choose Plan
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
