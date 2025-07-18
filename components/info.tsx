"use client";
import { Product } from "@/types";

import { ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import { useState, MouseEventHandler } from "react";

interface InfoProps {
    data:Product;
}


const Info:React.FC<InfoProps> = ({data}) => {
    const cart = useCart();

    const [quantity, setQuantity] = useState<number>(1); // Cantidad inicial
    const [error, setError] = useState<string | null>(null); // Error inicial

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1); // Incrementa la cantidad
        setError(null); // Restablece el error
    }

    const decrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity - 1); // Decrementa la cantidad
        setError(null); // Restablece el error
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            setQuantity(1);
            setError("La cantidad debe ser al menos 1");
        } else if (value > data.quantity) {
            setQuantity(data.quantity);
            setError("Lo sentimos, no tenemos esa cantidad en stock");
        } else {
            setQuantity(value);
            setError(null);
        }
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        cart.addItem({
            ...data,
            orderQuantity: quantity,
        });

        setQuantity(1); // Restablece la cantidad a 1 después de agregar al carrito
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
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-y-4 sm:gap-x-3">
                <h2 className="text-2xl font-semibold text-black mb-2 sm:mb-0">
                    Cantidad:
                </h2>
                <div className="flex items-center space-x-2 justify-center">
                    <Button
                        disabled={quantity <= 1}
                        onClick={decrementQuantity}
                        className="
                            p-2
                            flex
                            text-black
                            rounded-full
                            items-center
                            justify-center
                            bg-pink-200
                            hover:bg-pink-300">
                                -
                    </Button>
                    <Input 
                        className="
                            flex
                            justify-center
                            items-center
                            w-16
                            text-center
                            border
                            border-purple-300
                            rounded-md
                            focus: outline-none
                            focus: ring-blue-500"
                        onChange={handleQuantityChange}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        value={quantity.toString()} // Asegúrate de que sea una cadena
                        min={1}
                        max={data.quantity}
                        type="number"
                        placeholder="Cantidad"
                    />
                    <Button
                        disabled={quantity >= data.quantity}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            incrementQuantity();
                        }}
                        className="
                            p-2
                            flex
                            text-black
                            rounded-full
                            items-center
                            justify-center
                            bg-pink-200
                            hover:bg-pink-300"
                    >
                        +
                    </Button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                
                <Button
                    onClick={onAddToCart}
                    className={cn(
                                " content-center rounded-full border-2 border-pink-300 bg-pink-600 w-full sm:w-auto h-auto flex items-center justify-center gap-x-2 transition ease-in-out delay-200 hover:-translate-y-2 hover:scale-125 duration-300",
                            )}>
                    Añadir al carrito
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    );
}

export default Info;