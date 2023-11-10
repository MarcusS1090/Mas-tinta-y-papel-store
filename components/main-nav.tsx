"use client";

import { cn } from "@/lib/utils";
import { Category} from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input, NextUIProvider } from "@nextui-org/react";

import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";

import { useEffect, useState } from "react"

import {
    ChatIcon,
    ChevronDownIcon,
    SearchIcon,
} from "@heroicons/react/outline";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";

import NavbarActions from "./navbar-actions";
import axios from "axios";
import NavbarSearch from "./ui/navbar-search";

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
                lg:w-[560px]
                h-[70px]
                mx-auto
                my-2
                flex
                items-center
                transition
                ease-in-out
                delay-150
                hover:-translate-y-1
                hover:scale-110
                duration-300
            ">
                <NavbarSearch />
            </div>
            <div className="w-30 h-[60px] absolute flex md:right-10 top-3 items-center">
                <div className="
                w-14
                h-14
                bg-pink-600
                rounded-[30px]
                shadow-inner
                border-2
                mx-1
                border-rose-200
                transition
                ease-in-out
                delay-150
                hover:-translate-y-1
                hover:scale-110
                duration-300">
                <Link href="https://instagram.com/mas_tintaypapel?igshid=MzRlODBiNWFlZA==" 
                    className="
                    flex
                    ">
                        <IoLogoInstagram className="w-10 h-11 mt-1 mx-auto text-pink-200"/>
                </Link>
                </div>
                <div className="
                w-14
                h-14
                bg-pink-600
                rounded-[30px]
                shadow-inner
                border-2
                mx-1
                py-0
                border-rose-200
                transition
                ease-in-out
                delay-150
                hover:-translate-y-1
                hover:scale-110
                duration-300">
                <Link href="https://wa.me/message/QFCXC6OV7NEQA1" 
                    className="
                    flex
                    ">
                    <IoLogoWhatsapp className="w-10 h-10 mt-1 mx-auto text-pink-200"/>
                </Link>
                </div>
            </div>
            <div className="
                container
                w-[570px]
                h-[70px]
                py-2
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
                    py-1
                    w-auto
                    h-auto
                    flex
                    items-center
                    space-x-4
                    lg:space-x-2
                    bg-rose-200
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
                                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300
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
                                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300
                                "
                            variant="faded"
                        >
                            Categorias
                            <ChevronDownIcon className="lg:w-10 lg:h-10"/>
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
                                        "text-sm transition-colors hover:text-black text-[30px] mx-0 px-1 font-medium ",
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
                    ml-2
                    flex
                    text-white
                    lg:text-[30px]
                    hover:text-black
                    transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300
                    ">
                        <h1>Contactanos</h1>
                        <ChatIcon className="lg:w-8 lg:h-8 lg:mr-2 lg:mt-1 lg:mx-1"/>
                </Link>
                        <NavbarActions />               
            </nav>
            </div>
        </NextUIProvider>
    );
}

export default MainNav;