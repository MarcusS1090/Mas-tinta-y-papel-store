"use- client"

import Button from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

import { useEffect, useState } from "react";

const NavbarActions = () => {


    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


return (
    <div className="ml-auto flex items-center gap-x-4">
        <Button className="flex items-center rounded-full">
            <ShoppingCartIcon 
                size={32}
            />
            <span className="ml-1 mx-2 text-lg font-bold">
                0
            </span>
        </Button>
    </div>
)
}

export default NavbarActions;