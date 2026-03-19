import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "StreamVibe",
    description: "Watch movies and shows on demand",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="bg-[#0F0F0F] antialiased">
        {children}
        </body>
        </html>
    );
}
