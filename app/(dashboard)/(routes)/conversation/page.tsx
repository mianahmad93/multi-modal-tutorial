// "use client"
// import axios from 'axios';
// import * as z from "zod";
// import Heading from '@/components/heading';
// import { MessageSquare } from 'lucide-react';
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

// import { useRouter } from 'next/navigation';
// import { cn } from "@/lib/utils"


// import { ChatCompletionRequestMessage } from "openai";
// import { useForm } from 'react-hook-form';
// import { formSchema } from "./constants";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState, useRef } from 'react';
// import { Loader } from '@/components/loader';
// import { Empty } from '@/components/ui/empty';
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import { UserAvatar } from '@/components/user-avatar';
// import { BotAvatar } from '@/components/bot-avatar';

// import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
// import { NextResponse } from 'next/server';
// import { useProModal } from '@/hooks/use-pro-modal';


// const MODEL_NAME = "gemini-1.0-pro";
// const API_KEY = "AIzaSyBn9sHZg9e-g4Iw9NBiAM7wxDLcttIfwVU";

// const ConversationPage = () => {
//     const proModal = useProModal();
//     const [userInput, setUserInput] = useState("");
//     const chatHistory = useRef([]);
//     const genAI = useRef(new GoogleGenerativeAI(API_KEY));
//     const model = useRef(genAI.current.getGenerativeModel({ model: MODEL_NAME }));



//     const generationConfig = {
//         temperature: 0.9,
//         topK: 1,
//         topP: 1,
//         maxOutputTokens: 2048,
//     };
//     const safetySettings = [
//         {
//             category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//         {
//             category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//         {
//             category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//         {
//             category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//     ];
//     const router = useRouter();
//     const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             prompt: ""
//         }
//     });

//     const isloading = form.formState.isSubmitting;

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         try {
//             const chat = model.current.startChat({
//                 generationConfig,
//                 safetySettings,
//                 history: chatHistory.current,
//             });



//             const result = await chat.sendMessage(values.prompt);
//             const response = result.response;

//             chatHistory.current = [...chatHistory.current, { role: "user", parts: [{ text: values.prompt }] }];
//             chatHistory.current.push({ role: "model", parts: [{ text: response.text() }] });



//             // ..............................................................
//             // const userMessage: ChatCompletionRequestMessage = {
//             //     role: "user",
//             //     content: values.prompt,
//             // };
//             // const newMessages = [...messages, userMessage];

//             // const response = await axios.post("/api/conversation", { messages: newMessages });
//             setMessages((current) => [...current, { content: values.prompt, role: "user" }, { content: response.candidates[0].content.parts[0].text }]);
//             form.reset();


//         } catch (error: any) {
//             // TODO: Open Pro Modal
//             if (error?.response?.status === 403) {
//                 proModal.onOpen();
//             }
//             console.log(error);
//         } finally {
//             router.refresh()
//         }
//     }


//     return (
//         <div>
//             <Heading
//                 title='Conversation'
//                 description='Our most advanced conversation model.'
//                 icon={MessageSquare}
//                 iconColor='text-violet-500'
//                 bgColor='bg-violet-700/10'
//             />
//             <div className='px-4 lg:px-8'>
//                 <div>
//                     <Form  {...form}>
//                         <form
//                             onSubmit={form.handleSubmit(onSubmit)}
//                             className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
//                         >
//                             <FormField
//                                 name="prompt"
//                                 render={({ field }) => (
//                                     <FormItem className="col-span-12 lg:col-span-10">
//                                         <FormControl className="m-0 p-0">
//                                             <Input
//                                                 required
//                                                 className="border-0  outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                                                 disabled={isloading}
//                                                 placeholder="How do I calculate the radius of a circle?"
//                                                 {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             <Button className="col-span-12 lg:col-span-2 w-full" disabled={isloading} type='submit'>
//                                 Generate
//                             </Button>

//                         </form>
//                     </Form>
//                 </div>

//                 <div className="space-y-4 mt-4">

//                     {isloading && (
//                         <div className='p-8 rounded-lg  w-full flex items-center justify-center bg-muted'>
//                             <Loader />
//                         </div>
//                     )}

//                     {messages.length === 0 && !isloading && (
//                         <Empty label="No Conversation started." />
//                     )}


//                     <div className='flex flex-col-reverse gap-y-4'>
//                         {messages.map((message) => {
//                             return <>
//                                 <div key={message.content}
//                                     className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
//                                     {message.role == "user" ? <UserAvatar /> : <BotAvatar />}
//                                     <p className='text-sm' style={{ fontFamily: ' sans-serif', textAlign: "justify" }}>
//                                         {message.content}
//                                     </p>
//                                 </div>
//                             </>
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ConversationPage;

"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";

import { formSchema } from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";


const ConversationPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/conversation', { messages: newMessages });
            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong")
            }
        }
        finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Conversation"
                description="Our most advanced conversation model."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="How do I calculate the radius of a circle?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started." />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.content}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                                )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;

