"use client";

import { useState,useEffect } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import Summary from "@/app/(routes)/cart/components/summary";
import CartItem from "@/app/(routes)/cart/components/cart-item";

const CartPage = () => {
    const cart = useCart();
    //const [isMounted, setIsMounted] = useState(false);

    //useEffect(() => {
    //    setIsMounted(false);
    //},[]);

    //if (!isMounted) {
    //    return null;
    //}

    return (  
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-balck">
                        Carrito de compras
                    </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cart.items.length === 0 && 
                                
                            <p className="lg:text-2xl font-light text-neutral-500">
                                No tienes Productos en tu carrito </p>}
                            <ul>
                                {cart.items.map((item) => (
                                    <CartItem 
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </ul>
                        </div>
                        <Summary />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CartPage;