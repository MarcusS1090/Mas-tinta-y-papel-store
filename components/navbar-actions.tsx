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
    <div className="ml-auto flex items-center gap-x-2 lg:gap-x-4">
        <Button 
            onClick={() => router.push("/cart")}
            className={cn(
                            "p-3 flex items-center rounded-full bg-pink-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
                        )}>
            <ShoppingCartIcon
                size={20} // Tamaño base para pantallas grandes
                strokeWidth={1.5}
                color="white"
                aria-label="Carrito de compras"
                data-testid="cart-icon"                
                className="text-pink-200 lg:size-8 sm:size-4" // Tamaño para pantallas grandes
            />
            <span className="ml-1 mx-1 text-lg font-bold text-white lg:mx-2 lg:text-xl">
                {cart.items.length}
            </span>
        </Button>
    </div>
)
}

export default NavbarActions;