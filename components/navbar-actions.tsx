"use- client"

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const NavbarActions = () => {


    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if (!isMounted) {

        return null;
    }


return (
    <div className="ml-auto flex items-center gap-x-4">
        <Button 
            onClick={() => router.push("/cart")}
            className={cn(
                            "p-1 flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
                        )}>
            <ShoppingCartIcon 
                size={32}
            />
            <span className="ml-1 mx-2 text-lg font-bold">
                {cart.items.length}
            </span>
        </Button>
    </div>
)
}

export default NavbarActions;