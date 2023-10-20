"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {NextUIProvider} from "@nextui-org/react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import dropdownIcon from "../public/dropdown-button.svg"
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
} from "@nextui-org/react";
import Image from "next/image";



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
        <div>
            <nav
                className="
                    mx-2
                    mt-12
                    py-2
                    w-auto
                    h-auto
                    flex
                    items-center
                    space-x-4
                    lg:space-x-2
                    bg-rose-200
                    bg-opacity-70
                    rounded-[45px]
                    shadow
                    transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 
                "
            >

                <Dropdown >
                    <DropdownTrigger>
                        <Button
                            className="
                                text-white
                                lg:text-[30px]
                                hover:text-black
                                
                                "
                            variant="faded"
                        >
                            Categorias
                            <ChevronDownIcon className="lg:w-8 lg:h-8"/>
                        </Button>
                    </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions" className="
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
            </nav>
        </div>
        </NextUIProvider>
    );
}

export default MainNav;