"use client"

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import styles from './dashboard.module.css';
import { cn } from "@/lib/utils";
import { ArrowRight, Code, CodeIcon, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import Image from 'next/image';
import conversation from '../dashboard/new.jpg';
import music from '../dashboard/music.jpg';
import image from '../dashboard/image.jpg';
import video from '../dashboard/video.jpg';
import code from '../dashboard/code.jpg';

const DashboardPage = () => {
    const router = useRouter();

    const tools = [
        {
            label: "Conversation",
            icon: MessageSquare,
            color: "text-violet-500",
            bgColor: "bg-violet-500/10",
            href: "/conversation"
        },
        {
            label: "Music Generation",
            icon: Music,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
            href: "/music"
        },
        {
            label: "Image Generation",
            icon: ImageIcon,
            color: "text-pink-700",
            bgColor: "bg-pink-700/10",
            href: "/image"
        },
        {
            label: "Video Generation",
            icon: VideoIcon,
            color: "text-orange-700",
            bgColor: "bg-orange-700/10",
            href: "/video"
        },
        {
            label: "Code Generation",
            icon: Code,
            color: "text-green-700",
            bgColor: "bg-green-700/10",
            href: "/code"
        },

    ]


    const data = [
        {
            label1: "Conversation",
            icon: MessageSquare,
            color: "text-violet-500",
            bgColor: "bg-violet-500/10",
            href: "/conversation",
            src: conversation,
            BgColor: "bg-violet-300",
        },
        {
            label1: "Music Generation",
            icon: Music,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            href: "/music",
            src: music,
            BgColor: "bg-emerald-300",
        },
        {
            label1: "Image Generation",
            icon: ImageIcon,
            color: "text-emerald-700",
            bgColor: "bg-emerald-700/10",
            href: "/image",
            src: image,
            BgColor: "bg-pink-300",
        },
        {
            label1: "Video Generation",
            icon: VideoIcon,
            color: "text-purple-700",
            bgColor: "bg-purple-700/10",
            href: "/video",
            src: video,
            BgColor: "bg-orange-300",
        },
        {
            label1: "Code Generation",
            icon: Code,
            color: "text-blue-900",
            bgColor: "bg-blue-700/20",
            href: "/code",
            src: code,
            BgColor: "bg-green-300",
        },
    ]



    return (
        <div >
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Chat with the smartest AI - Experience the power of AI
                </p>
            </div>
            <div className=" md:px-20 space-y-4 px-4 ">
                {/* {tools.map((tool) => {
                    return <>
                        <Card
                            onClick={() => router.push(tool.href)}
                            key={tool.href}
                            className="p-2 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                                </div>
                                <div className="font-semibold">
                                    {tool.label}
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5" />
                        </Card>
                    </>
                })} */}



                <div className={` ${styles.card_div} gap-4 grid  sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-x-4 lg:w-auto`}>
                    {
                        data.map((item) => {
                            return <>
                                <Card
                                    onClick={() => router.push(item.href)}
                                    key={item.href}
                                    className={cn(` ${styles.tool_card} p-2  sm:px-5   md:max-lg:w-auto m-3 2xl:w-fit lg:w-96    sm:w-72  border-black/10 w-96  items-center hover:shadow-2xl transition cursor-pointer`)}>
                                    <div className="p-5">
                                        <Image className="lg:w-full md:max-lg:w-full rounded justify-center items-center p-2 object-cover" src={item.src} alt="" />
                                    </div>
                                    <div className="px-7 flex mb-3">
                                        <div className={cn("p-2 w-fit rounded-md", item.bgColor)}>
                                            <item.icon className={cn("w-6 h-6", item.color)} />
                                        </div>
                                        <div className="font-semibold px-3 mt-3 ">
                                            {item.label1}
                                        </div>
                                        {/* <ArrowRight className="w-5 h-5 " /> */}
                                    </div>


                                </Card>
                            </>
                        })
                    }
                </div>



            </div>
        </div>
    );
}
export default DashboardPage;
