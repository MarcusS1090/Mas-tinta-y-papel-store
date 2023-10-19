"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
                rounded-[39px]
                shadow
            "
        >
            {routes.map((route) => (
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
            ))}
        </nav>
    );
}

export default MainNav;