"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Pago Completado.🥳");
            removeAll();
        }

        if (searchParams.get("canceled")) {
            toast.error("El pago fue cancelado.");
        }
    }, [searchParams, removeAll]);

    // Calcula el precio total considerando la cantidad de cada producto
    const totalPrice = items.reduce((total, item) => {
        return total + item.price * item.orderQuantity; // Multiplica el precio por la cantidad
    }, 0);

    const onCheckout = async () => {
        if (items.length === 0) {
            toast.error("El carrito está vacío.");
            return;
        }

        setLoading(true);
        try {
            console.log("URL de la API:", `${process.env.NEXT_PUBLIC_API_URL}/checkout`);
            console.log("Datos enviados:", items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.orderQuantity,
            })));
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                cartItems: items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.orderQuantity,
                })),
                
            });

            if (response.data?.url) {
                window.location.href = response.data.url; // Redirige al enlace de checkout
            } else {
                throw new Error("No se recibió una URL de redirección.");
            }
        } catch (error) {
            console.error("Error en el checkout:", error.response?.data || error.message);
            toast.error("Algo salió mal, intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
            ml-10
            mt-16
            rounded-lg
            bg-gray-50
            px-4
            py-6
            sm:p-6
            lg:col-span-5
            lg:mt-0
            lg:p-8
        "
        >
            <h2 className="text-lg font-medium text-gray-900">Suma del pedido</h2>
            <div className="mt-6 space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                        <p className="text-sm text-gray-700">
                            {item.name} x {item.orderQuantity}
                        </p>
                        <p className="text-sm text-gray-900">
                            <Currency value={item.price * item.orderQuantity} />
                        </p>
                    </div>
                ))}
            </div>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">Total del pedido</div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button
                disabled={items.length === 0 || isLoading}
                onClick={onCheckout}
                className={cn(
                    "w-full mt-6 bg-pink-600 p-2 rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:text-black hover:scale-110 duration-300",
                )}
            >
                {isLoading ? "Procesando..." : "Pagar"}
            </Button>
        </div>
    );
};

export default Summary;