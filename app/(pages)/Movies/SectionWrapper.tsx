// app/components/SectionWrapper.tsx
interface SectionWrapperProps {
    children: React.ReactNode;
    label?: string; // Текст для красного значка (например, "Movies")
}

export default function SectionWrapper({ children, label }: SectionWrapperProps) {
    return (
        <section className="relative border border-[#262626] rounded-xl p-6 md:p-10 lg:p-12">
            {label && (
                <div className="absolute -top-4 left-6 md:left-10 bg-[#E50000] text-white px-6 py-3 rounded-md text-sm font-semibold uppercase tracking-wider">
                    {label}
                </div>
            )}
            {children}
        </section>
    );
}