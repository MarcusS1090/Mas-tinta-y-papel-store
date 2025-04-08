import Image from "next/image";
import { toast } from "react-hot-toast";
import { XCircleIcon } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { useState } from "react";
import Button from "@/components/ui/button";
import { Input } from "@nextui-org/react";

import { Product } from "@/types";

interface CartItemProps {
    data:Product & {orderQuantity: number};//incluye la cantidad seleccionada
};

const CartItem: React.FC<CartItemProps> = ({ data }) => {
    const cart = useCart();

    const [quantity, setQuantity] = useState<number>(data.orderQuantity); // Cantidad inicial
    const [error, setError] = useState<string | null>(null); // Error inicial

    const incrementQuantity = () => {
        if (quantity < data.quantity) {
            setQuantity((prevQuantity) => {
                const newQuantity = prevQuantity + 1; // Calcula el nuevo valor
                cart.updateItem(data.id, newQuantity); // Usa el nuevo valor
                return newQuantity; // Actualiza el estado
            });
            setError(null); // Restablece el error
        } else {
            setError("Lo sentimos, no tenemos esa cantidad en stock"); // Muestra el error
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => {
                const newQuantity = prevQuantity - 1; // Calcula el nuevo valor
                cart.updateItem(data.id, newQuantity); // Usa el nuevo valor
                return newQuantity; // Actualiza el estado
            });
            setError(null); // Restablece el error
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            setQuantity(1);
            setError("La cantidad debe ser al menos 1.");
        } else if (value > data.quantity) {
            setQuantity(data.quantity);
            setError("No puedes añadir más de la cantidad disponible en stock.");
        } else {
            setQuantity(value);
            setError(null);
            cart.updateItem(data.id, value); // Actualiza la cantidad en el carrito
        }
    };

    const onRemove = () => {
        cart.removeItem(data.id);
    };

    return (
        <li className="flex py-4 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 lg:left-full top-0 pl-5">
                    <IconButton onClick={onRemove} icon={<XCircleIcon size={20} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold text-black">{data.name}</p>
                    </div>

                    <div className="mt-1 flex text-lg">
                        <p className="text-gray-500">{data.color.name}</p>
                        <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                            {data.size.name}
                        </p>
                    </div>
                    <Currency value={data.price} />
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Cantidad</h3>
                    <div className="flex items-center space-x-2 mt-2">
                        <Button
                            disabled={quantity <= 1}
                            onClick={decrementQuantity}
                            className="w-5 h-5 flex text-black rounded-full items-center justify-center bg-pink-200 hover:bg-pink-300"
                        >
                            -
                        </Button>
                        <Input
                            className="w-16 h-6 text-center text-black border-none focus:ring-0"
                            type="number"
                            value={quantity.toString()}
                            onChange={handleQuantityChange}
                            placeholder="cantidad"
                        />
                        <Button
                            onClick={incrementQuantity}
                            className="w-5 h-5 flex text-black rounded-full items-center justify-center bg-pink-200 hover:bg-pink-300"
                            disabled={quantity >= data.quantity}
                        >
                            +
                        </Button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </li>
    );
};

export default CartItem;