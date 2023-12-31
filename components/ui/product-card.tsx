"use client";

import { Product } from "@/types";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";

import { Expand, ShoppingCart } from "lucide-react"
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({data}) => {

    const router = useRouter();

    const cart = useCart();

    const previewModal = usePreviewModal();

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        previewModal.onOpen(data);
    };

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        cart.addItem(data);
    };

    return (
        <div 
        onClick={handleClick}
        className="
            bg-gray-100
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
            duration-300 ">
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
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={25} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            {/* Descripcion */}
            <div>
                <p className="font-semibold text-2xl ">
                    {data.name}
                </p>
                <p className="text-lg text-gray-500 ">
                    {data.category?.name}
                </p>
            </div>
            {/* Precios */}
            <div className="flex items-center justify-center">
                <Currency value={data?.price} />
            </div>
        </div>
    );
}

export default ProductCard;