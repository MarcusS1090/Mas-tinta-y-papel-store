"use client";
import { Product } from "@/types";

import { ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";



interface InfoProps {
    data:Product;
}


const Info:React.FC<InfoProps> = ({data}) => {
    const cart = useCart();

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        cart.addItem(data);
    };

    return (  
        <div>
            <h1 className="text-4xl font-bold text-gray-900">
                {data.name}
            </h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl text-gray-900">
                    <Currency value={data.price} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4 text-2xl">
                    <h3 className="font-semibold text-black">
                        Tamaño:
                        <div>
                            {data?.size?.name}
                        </div>
                    </h3>
                </div>
                <hr className="my-4"/>
                <div className="flex items-center gap-x-4 text-2xl">
                    <h3 className="font-semibold text-black">
                        Color:
                        <div className="h-10 w-10 rounded-full border border-gray-600" style={{backgroundColor: data?.color?.value}}>
                        </div>
                    </h3>
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button
                    onClick={onAddToCart}
                    className={cn(
                                "rounded-full border-2 border-pink-300 bg-pink-600 w-auto h-auto flex items-center gap-x-0 transition ease-in-out delay-200 hover:-translate-y-2 hover:scale-125 duration-300",
                            )}>
                        {/*
                            rounded-full border-2 border-pink-300 bg-pink-600 w-44 h-11 flex items-center gap-x-0 transition
                    ease-in-out
                    delay-200
                    hover:-translate-y-2
                    hover:scale-125
                    duration-300
                        */}
                    Añadir al carrito
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    );
}

export default Info;