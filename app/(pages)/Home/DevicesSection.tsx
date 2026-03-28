import {Smartphone, Tablet, Monitor, Laptop, Gamepad2, RectangleGoggles,} from 'lucide-react';

const devices = [
    { title: "Smartphones", icon: <Smartphone className="text-red-600" />, desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store" },
    { title: "Tablet", icon: <Tablet className="text-red-600" />, desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store" },
    { title: "Smart TV", icon: <Monitor className="text-red-600" />, desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store" },
    { title: "Laptops", icon: <Laptop className="text-red-600" />, desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store" },
    { title: "Gaming Consoles", icon: <Gamepad2 className="text-red-600" />, desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store" },
    { title: "VR Headsets", icon: <RectangleGoggles className="text-red-600 rounded-sm" />, desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store" },
];

export default function DevicesSection() {
    return (
        <section className="bg-[#0F0F0F] px-4 md:px-10 lg:px-20 py-2">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">We Provide you streaming experience across various devices.</h2>
                <p className="text-[#999999] max-w-[1000px]">With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {devices.map((device, i) => (
                    <div key={i} className="relative p-[1px] rounded-xl bg-gradient-to-br from-[#262626] to-transparent">
                        <div className="bg-[#0F0F0F] p-8 rounded-xl h-full border border-[#262626] bg-gradient-to-tr from-[#E50000]/5 to-transparent">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[#141414] border border-[#262626] rounded-lg">
                                    {device.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white">{device.title}</h3>
                            </div>
                            <p className="text-[#999999] text-sm leading-relaxed">{device.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}