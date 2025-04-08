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
                    w-[550px]
                    h-[63px]
                    py-3
                    rounded-[30px]
                    shadow-inner
                    border-2
                    border-rose-200
                    text-white
                    lg:text-[30px]">
                    <Input
                        isClearable
                        onClear={() => {}}
                        type="text"
                        id="default-search"
                        {...form.register('search')}
            />  
                <div className="z-10 rounded-[30px] border-pink-300 bg-pink-500 inline-block mx-1 border-x-2">
                    <Button isIconOnly variant="ghost" aria-label="Search" type="submit">
                        <SearchIcon className="lg:w-8 lg:h-8 flex my-2 mx-2 text-pink-200"/>
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default NavbarSearch;