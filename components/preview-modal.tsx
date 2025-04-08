"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Modal from "@/components/ui/modal";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import { useState } from "react";
import Button from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import useCart from "@/hooks/use-cart";

const PreviewModal = () => {
    const previewModal = usePreviewModal();
    const product = usePreviewModal((state) => state.data);

    const cart = useCart();
    const [quantity, setQuantity] = useState<number>(1); // Cantidad inicial
    const [error, setError] = useState<string | null>(null); // Error inicial

    if (!product) {
        return null;
    }

    const incrementQuantity = () => {
        setError(null); // Limpia errores
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, product.quantity)); // No exceder el stock
    };

    const decrementQuantity = () => {
        setError(null);
        if (quantity > 1) {
            setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // No permitir cantidades menores a 1
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);

        if (isNaN(value) || value < 1) {
            setQuantity(1); // Restablece a 1 si el valor es inválido
            setError("La cantidad debe ser al menos 1");
        } else if (value > product.quantity) {
            setQuantity(product.quantity); // No permitir cantidades mayores al stock
            setError("Lo sentimos, no tenemos esa cantidad en stock");
        } else {
            setQuantity(value); // Actualiza la cantidad si es válida
            setError(null);
        }
    };

    const addToCart = () => {
        cart.addItem({
            ...product,
            orderQuantity: quantity,
        })
        
        if (quantity > product.quantity) {
            toast.error("Lo sentimos, no tenemos esa cantidad en stock");
            return;
        }

        // Aquí puedes agregar la lógica para añadir al carrito
        toast.success("Producto agregado al carrito");
    };

    return (
        <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                    <Gallery images={product.images} />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                    <Info data={product} />
                </div>
            </div>
        </Modal>
    );
};

export default PreviewModal;