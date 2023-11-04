"use client";

import { Product } from "@/types";

import { Expand, ShoppingCart } from "lucide-react"
import Image from "next/image";

import IconButton from "@/components/ui/icon-button";

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({data}) => {
    return (
        <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
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
                            onClick={() => {}}
                            icon={<Expand size={50} className="text-gray-600" />}
                        />
                        <IconButton
                            onClick={() => {}}
                            icon={<ShoppingCart size={50} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            {/* Descripcion */}
            <div>
                <p className="font-semibold text-2xl">
                    {data.name}
                </p>
                <p className="text-lg text-gray-500">
                    {data.category?.name}
                </p>
            </div>
            {/* Precios */}
            <div className="flex items-center justify-center">
                <Currency value={data?.price}
            </div>
        </div>
    );
}

export default ProductCard;