"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";
import { usePathname } from "next/navigation";
import { UserButton } from '@clerk/nextjs';

import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'





const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-500"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
]

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}


const Sidebar = ({
    apiLimitCount = 0,
    isPro = false
}: SidebarProps) => {
    const pathname = usePathname();

    const { signOut } = useClerk();
    const router = useRouter()
    return (
        <div className="space-y-2 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-1 flex-1">
                <Link href='/dashboard' className="flex items-center pl-3 mb-10">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="Logo"
                            src="/logo.png"
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>Genius</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => {
                        return <>
                            <Link href={route.href}
                                key={route.href}
                                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                    pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                    {route.label}
                                </div>
                            </Link>
                        </>
                    })}

                    <div className={cn("text-sm group flex p-3 w-full justify-start font-medium text-zinc-400 cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition")}>
                        <div className="flex items-center flex-1 ">
                            <div className={cn("h-5 w-5 mr-3 ")}>
                                <LogOut />
                            </div>
                            <button onClick={() => signOut(() => router.push("/"))}>
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <FreeCounter
                isPro={isPro}
                apiLimitCount={apiLimitCount}
            />

        </div>
    )
};

export default Sidebar;