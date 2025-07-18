"use client";

import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
    search: z.string().min(1).max(50),
});

const NavbarSearch = () => {
    const colors = [
        "default"
    ]

    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search:"",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        router.push(`/search/${values.search}`);
    };


    return ( 
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div 
                className="
                    bg-pink-600
                    flex
                    items-center
                    top-0
                    w-full
                    max-w-md
                    h-12 lg:h-10
                    py-1 pl-4 pr-0
                    rounded-[30px]
                    shadow-inner
                    border-2
                    border-rose-200
                    text-white">
                    <Input
                        isClearable
                        onClear={() => {}}
                        type="text"
                        id="default-search"
                        classNames={{
                            inputWrapper: "bg-transparent shadow-none",
                            input: "text-white placeholder-white text-base lg:text-lg pl-0",
                        }}
                        {...form.register('search')}
            />  
                <div className="z-10 h-full w-auto rounded-r-[30px] overflow-hidden">
                    <Button isIconOnly variant="ghost" aria-label="Search" type="submit" className="h-full lg:w-14 w-14 rounded-none px-4 bg-transparent">
                        <SearchIcon className="md:w-20 sm:w-10 md:h-26 sm:h-10 text-pink-200 lg:w-28 lg:h-28"/>
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default NavbarSearch;