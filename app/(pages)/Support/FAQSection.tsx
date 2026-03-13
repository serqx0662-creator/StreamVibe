"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

const faqData = [
    {
        id: 1,
        question: "What is StreamVibe?",
        answer: "StreamVibe is a streaming service that allows you to watch movies and shows on demand."
    },
    {
        id: 2,
        question: "How much does StreamVibe cost?",
        answer: "StreamVibe offers various subscription plans starting from $9.99/month for basic plan, $14.99/month for standard, and $19.99/month for premium."
    },
    {
        id: 3,
        question: "What content is available on StreamVibe?",
        answer: "StreamVibe offers a wide variety of content including movies, TV shows, documentaries, and original content across multiple genres."
    },
    {
        id: 4,
        question: "How can I watch StreamVibe?",
        answer: "You can watch StreamVibe on various devices including smart TVs, smartphones, tablets, computers, and streaming devices."
    },
    {
        id: 5,
        question: "How do I sign up for StreamVibe?",
        answer: "Simply click on the 'Start Free Trial' button, create an account with your email, choose a subscription plan, and start watching."
    },
    {
        id: 6,
        question: "What is the StreamVibe free trial?",
        answer: "StreamVibe offers a 30-day free trial for new users to explore all features and content before committing to a subscription."
    },
    {
        id: 7,
        question: "How do I contact StreamVibe customer support?",
        answer: "You can contact our customer support team through the contact form on this page, via email at support@streamvibe.com, or through our 24/7 live chat."
    },
    {
        id: 8,
        question: "What are the StreamVibe payment methods?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region."
    }
];

export default function FAQSection() {
    const [openId, setOpenId] = useState<number>(1);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? 0 : id);
    };

    return (
        <section className="container mx-auto px-4 md:px-10 lg:px-16 py-16 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[#999999] text-base md:text-lg max-w-3xl">
                        Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about Streamvibe.
                    </p>
                </div>
                <Button className="bg-[#E50000] hover:bg-[#FF1A1A] text-white px-6 py-6 rounded-lg font-semibold whitespace-nowrap">
                    Ask a Question
                </Button>
            </div>

            {/* FAQ Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {faqData.map((faq) => (
                    <div
                        key={faq.id}
                        className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6 md:p-8 transition-all hover:border-[#333333]"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                                <span className="text-white font-bold text-lg bg-[#0F0F0F] border border-[#262626] rounded-lg px-4 py-2 min-w-[60px] text-center">
                                    {String(faq.id).padStart(2, '0')}
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold text-lg mb-3">
                                        {faq.question}
                                    </h3>
                                    {openId === faq.id && (
                                        <p className="text-[#999999] text-sm leading-relaxed mb-4">
                                            {faq.answer}
                                        </p>
                                    )}
                                    {/* Red Line */}
                                    <div className="w-full h-[2px] bg-gradient-to-r from-[#E50000] to-transparent mt-4"></div>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleFAQ(faq.id)}
                                className="bg-[#0F0F0F] border border-[#262626] hover:bg-[#262626] rounded-lg p-2 transition-colors flex-shrink-0"
                            >
                                {openId === faq.id ? (
                                    <Minus size={20} className="text-white" />
                                ) : (
                                    <Plus size={20} className="text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
