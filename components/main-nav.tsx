"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input, NextUIProvider } from "@nextui-org/react";

import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";


import {
    ChatIcon,
    ChevronDownIcon,
    SearchIcon,
    ShoppingCartIcon
} from "@heroicons/react/outline";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";


interface MainNavProps {
    data: Category[];
}




const MainNav: React.FC<MainNavProps> = ({
    data
}) => {
        const pathname = usePathname();

    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }));


    return ( 
        <NextUIProvider>
            <div className="
                border border-black
                container
                lg:w-[550px]
                h-[70px]
                mx-auto
                bg-zinc-300
                bg-opacity-0
                my-3
                flex
                items-center
                transition
                ease-in-out
                delay-150
                hover:-translate-y-1
                hover:scale-110
                duration-300
            ">
                <div className=" 
                    bg-pink-600
                    top-[1px]
                    w-[600px]
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
                        type="text" />  
                </div>
                <div className="container lg:w-14 lg:h-14 bg-pink-600 rounded-[30px] mx-2 shadow-inner border-2 border-rose-200">
                    <Button isIconOnly variant="ghost" aria-label="Search">
                        <SearchIcon className="lg:w-10 lg:h-10 relative shadow my-1 mx-1 text-pink-300"/>
                    </Button>
                </div>
            </div>
            <div className="w-30 h-[60px] bg-zinc-300 bg-opacity-0 border border-black absolute flex right-32 top-3 items-center">
                <div className="w-16 h-16 bg-pink-600 rounded-[30px] shadow-inner border-2 mx-1 border-rose-200">
                <Link href="https://instagram.com/mas_tintaypapel?igshid=MzRlODBiNWFlZA==" 
                    className="
                    flex
                    ">
                        <IoLogoInstagram className="w-16 h-12 mt-1 mx-auto text-pink-200"/>
                </Link>
                </div>
                <div className="w-16 h-16 bg-pink-600 rounded-[30px] shadow-inner border-2 mx-1 py-0 border-rose-200">
                <Link href="https://wa.me/message/QFCXC6OV7NEQA1" 
                    className="
                    flex
                    ">
                    <IoLogoWhatsapp className="w-16 h-12 mt-1 mx-auto text-pink-200"/>
                </Link>
                </div>
            </div>
            <div className="
                border border-black
                container
                w-[570px]
                h-[70px]
                py-1
                mx-auto
                my-auto
                transition
                ease-in-out
                delay-150
                hover:-translate-y-1
                hover:scale-110
                duration-300
            ">
            <nav
                className="
                    border
                    container
                    lg:mx-4
                    py-2
                    w-auto
                    h-auto
                    flex
                    items-center
                    space-x-4
                    lg:space-x-2
                    bg-rose-200
                    bg-opacity-70
                    rounded-[35px]
                    shadow
                "
            >
                <Link href="/" className="
                                flex
                                text-white
                                lg:text-[30px]
                                hover:text-black
                                mx-2
                                ml-2
                                ">
                        <h1>Inicio</h1>
                </Link>
                <Dropdown >
                    <DropdownTrigger>
                        <Button
                            className="
                                text-white
                                lg:text-[30px]
                                hover:text-black
                                mx-2
                                "
                            variant="faded"
                        >
                            Categorias
                            <ChevronDownIcon className="lg:w-8 lg:h-8"/>
                        </Button>
                    </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions" className="
                            static
                            box-decoration-slice
                            transition
                            ease-in-out
                            delay-150
                            hover:-translate-y-1
                            hover:scale-110
                            duration-300 
                            divide-y
                            divide-solid
                            divide-white
                            mx-auto
                            mt-0
                            py-10
                            lg:w-auto
                            lg:h-auto
                            bg-rose-200 
                            lg:rounded-[45px]
                            ">
                            {routes.map((route) => (
                                <DropdownItem
                                key={route.href}
                                >
                                    <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "text-sm transition-colors hover:text-black text-[30px] mx-3 font-medium ",
                                        route.active ? "text-black" : "text-white"
                                    )}
                                    >
                                    {route.label}
                                    </Link>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                </Dropdown>
                <Link href="https://wa.me/message/QFCXC6OV7NEQA1" 
                    className="
                    flex
                    text-white
                    lg:text-[30px]
                    hover:text-black
                    ">
                        <h1>Contactanos</h1>
                        <ChatIcon className="lg:w-8 lg:h-8 lg:mr-2 lg:mt-1 lg:mx-1"/>
                </Link>
                <Link href="https://wa.me/message/QFCXC6OV7NEQA1" 
                    className="
                    flex
                    text-white
                    lg:text-[30px]
                    hover:text-black
                    ">
                        <ShoppingCartIcon className="lg:w-8 lg:h-8 lg:mr-2 lg:mt-1 lg:mx-1"/>
                </Link>
                
            </nav>
            </div>
        </NextUIProvider>
    );
}

export default MainNav;