"use client";

import { Product } from "@/types";

import Image from "next/image";
import { ChangeEvent, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import { useState } from "react";

import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import Button from "./button";
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const [quantity, setQuantity] = useState<number>(1); // Cantidad inicial
    const [error, setError] = useState<string | null>(null); // Error inicial
    const router = useRouter();

    const cart = useCart();
    const previewModal = usePreviewModal();

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    };

    const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);

        if (isNaN(value) || value < 1) {
            setQuantity(1); // Restablece a 1 si el valor es inválido
            setError("La cantidad debe ser al menos 1");
        } else if (value > data.quantity) {
            setQuantity(data.quantity); // No permitir cantidades mayores al stock
            setError("Lo sentimos, no tenemos esa cantidad en stock");
        } else {
            setQuantity(value); // Actualiza la cantidad si es válida
            setError(null);
        }
    };

    const onAddToCart = () => {
        const order = {
            ...data,
            orderQuantity: quantity,
        };

        cart.addItem(order);
    };

    const incrementQuantity = () => {
        setError(null); // Limpia de errores
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, data.quantity)); // No exceder el stock
    };

    const decrementQuantity = () => {
        setError(null);

        if (quantity > 1) {
            setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // No permitir cantidades menores a 1
        }
    };

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    };

    return (
        <div
            onClick={handleClick}
            className="
            bg-white
            group
            cursor-pointer
            rounded-xl
            space-x-auto
            border
            p-3
            space-y-4
            transition
            ease-in-out
            delay-150
            hover:-translate-y-1
            hover:scale-110
            duration-300 "
        >
            {/* Imagenes y acciones de estas */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt="Image"
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={25} className="text-gray-600" />}
                        />
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart();
                            }}
                            icon={<ShoppingCart size={25} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            {/* Descripcion */}
            <div>
                <p className="font-semibold text-2xl ">{data.name}</p>
                <p className="text-lg text-gray-500 ">{data.category?.name}</p>
            </div>
            {/* Precios */}
            <div className="flex items-center justify-center">
                <Currency value={data?.price} />
            </div>
            {/* Cantidad */}
            <div className="flex flex-col items-center justify-center space-y-2">
                <h2 className="text-sm font-medium text-gray-700">Cantidad</h2>
                <div className="flex items-center space-x-2">
                    <Button
                        disabled={quantity <= 1}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            decrementQuantity();
                        }}
                        className="
                            w-5
                            h-5
                            flex
                            text-black
                            rounded-full
                            items-center
                            justify-center
                            bg-pink-200
                            hover:bg-pink-300"
                    >
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
                        onChange={handleQuantity}
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
                            w-5
                            h-5
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
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default ProductCard;