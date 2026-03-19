import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"; // Убедись, что путь верный
import { Button } from "@/app/components/ui/button";
import { Plus, Minus } from "lucide-react";

const faqs = [
    { id: "01", q: "What is StreamVibe?", a: "StreamVibe is a streaming service that allows you to watch movies and shows on demand." },
    { id: "02", q: "How much does StreamVibe cost?", a: "We offer various plans starting from $9.99/month." },
    { id: "03", q: "What content is available on StreamVibe?", a: "Thousands of movies, TV shows, and exclusive originals." },
    { id: "04", q: "How can I watch StreamVibe?", a: "You can watch through our app on any supported device." },
    { id: "05", q: "How do I sign up for StreamVibe?", a: "Simply click the sign-up button and follow the instructions." },
    { id: "06", q: "What is the StreamVibe free trial?", a: "New users get a 7-day free trial to explore all features." },
    { id: "07", q: "How do I contact customer support?", a: "You can reach us via 24/7 live chat or email." },
    { id: "08", q: "What are the payment methods?", a: "We accept all major credit cards and PayPal." },
];

export default function FAQSection() {
    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-20 ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-[#999999] max-w-[800px]">
                        Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.
                    </p>
                </div>
                <Button className="bg-[#E50000] cursor-pointer hover:bg-[#ff1a1a] text-white px-6 py-6 rounded-lg font-semibold shrink-0">
                    Ask a Question
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
                {faqs.map((faq) => (
                    <Accordion key={faq.id} type="single" collapsible className="w-full">
                        <AccordionItem value={faq.id} className="border-none relative group">
                            <AccordionTrigger className="hover:no-underline py-6 group [&[data-state=open]_.plus]:opacity-0 [&[data-state=open]_.minus]:opacity-100 [&[data-state=closed]_.plus]:opacity-100 [&[data-state=closed]_.minus]:opacity-0">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-5 text-left">
                                        <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#1A1A1A] border border-[#262626] rounded-lg text-white font-bold text-lg">
                                            {faq.id}
                                        </span>
                                        <span className="text-lg md:text-xl text-white font-medium">
                                            {faq.q}
                                        </span>
                                    </div>

                                    <div className="relative w-6 h-6 flex items-center justify-center">
                                        <Plus className="plus w-6 h-6 text-white transition-all duration-300 transform rotate-0 absolute" />
                                        <Minus className="minus w-6 h-6 text-white transition-all duration-300 transform absolute opacity-0" />
                                    </div>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="text-[#999999] pl-[68px] text-base leading-relaxed pb-6">
                                {faq.a}
                            </AccordionContent>

                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#E50000] via-[#E50000]/50 to-transparent" />
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </section>
    );
}