"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { countries, Country } from './CountryData';

export default function CustomPhoneInput() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className="space-y-3">
            <label className="block text-white text-sm font-medium">Phone Number</label>
            <div className="relative flex items-center h-[58px] bg-[#141414] border border-[#262626] rounded-xl focus-within:border-[#E50000] transition-all">

                <div
                    ref={buttonRef}
                    className="flex items-center justify-center gap-3 h-full px-4 cursor-pointer hover:bg-[#1F1F1F] rounded-l-xl transition-colors border-r border-[#262626] select-none active:bg-[#262626]"
                    onClick={toggleDropdown}
                >
                    <div className="relative w-7 h-5 overflow-hidden rounded-sm shadow-sm border border-[#262626]">
                        <img
                            src={`https://flagcdn.com/${selectedCountry.code}.svg`}
                            alt={selectedCountry.flag}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <ChevronDown
                        size={16}
                        className={`text-[#999999] transition-transform duration-300 pointer-events-none ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>

                <div className="flex items-center flex-1 px-4 gap-2">
                    <span className="text-[#999999] font-medium select-none">{selectedCountry.dial}</span>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter Phone Number"
                        className="bg-transparent border-none outline-none text-white w-full placeholder:text-[#666666] h-full font-sans"
                    />
                </div>

                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-[75px] left-0 w-full sm:w-[280px] bg-[#141414] border border-[#262626] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 py-2 animate-in fade-in zoom-in-95 duration-200"
                    >
                        <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                            {countries.map((c) => (
                                <div
                                    key={c.code}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCountry(c);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-[#1F1F1F] cursor-pointer transition-colors active:bg-[#262626]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-6 h-4 overflow-hidden rounded-[2px] border border-[#262626]">
                                            <img
                                                src={`https://flagcdn.com/${c.code}.svg`}
                                                alt={c.flag}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <span className="text-white text-sm font-semibold">{c.name}</span>
                                    </div>
                                    <span className="text-[#999999] text-sm">{c.dial}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #262626; border-radius: 10px; }
            `}</style>
        </div>
    );
}