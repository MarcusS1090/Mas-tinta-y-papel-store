"use client";

import { cn } from "@/lib/utils";
import { Category} from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

import {
    ChatIcon,
    ChevronDownIcon,
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
    isMobile?: boolean; // Nueva prop
}

const MainNav: React.FC<MainNavProps> = ({
    data,
    isMobile
}) => {

    const pathname = usePathname();

    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }));

    return ( 
        <NextUIProvider>
            <nav
                className={cn(
                    "flex items-center space-x-4 lg:space-x-6",
                    isMobile ? "flex-col items-start space-x-0 space-y-2" : ""
                )}
            >
                <Dropdown >
                    <DropdownTrigger>
                        <Button
                            className={cn(
                                "text-white hover:text-black transition-colors",
                                isMobile ? "text-xl" : "text-lg font-medium"
                            )}
                            variant="faded"
                        >
                            Categorias
                            <ChevronDownIcon className="w-6 h-6 ml-1"/>
                        </Button>
                    </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions" className={cn(
                            "bg-rose-200 rounded-md shadow-lg p-2",
                            isMobile ? "w-full" : ""
                        )}>
                            {routes.map((route) => (
                                <DropdownItem
                                key={route.href}
                                >
                                    <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "block w-full text-left px-4 py-2 transition-colors hover:text-black font-medium",
                                        route.active ? "text-black" : "text-white",
                                        isMobile ? "text-xl" : "text-base"
                                    )}
                                    >
                                    {route.label}
                                    </Link>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                </Dropdown>
                <Link href="https://wa.me/message/QFCXC6OV7NEQA1" 
                    className={cn(
                        "flex items-center text-white hover:text-black transition-colors",
                        isMobile ? "text-xl" : "text-lg font-medium"
                    )}>
                        Contactanos
                        <ChatIcon className="w-6 h-6 ml-1"/>
                </Link>
            </nav>
        </NextUIProvider>
    );
}

export default MainNav;