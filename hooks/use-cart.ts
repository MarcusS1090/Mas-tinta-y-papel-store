import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';

export interface CartOrder extends Product {
    orderQuantity: number;
}

type CartStore = {
    items: CartOrder[];
    addItem: (data: CartOrder) => void;
    updateItem: (id: string, quantity: number) => void; // Nuevo método
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: CartOrder) => {
            const currentItems: CartOrder[] = get().items;
            const existingItem: CartOrder | undefined = currentItems.find((item) => item.id === data.id);
            const availableStock: number = data.quantity - (existingItem ? existingItem.orderQuantity : 0);
            
            if (existingItem) {
                if (availableStock >= data.orderQuantity) {
                    existingItem.orderQuantity += data.orderQuantity;
                    set({ items: [...currentItems] });
                    toast.success(`Añadido ${data.orderQuantity} al producto existente`);
                } else if (availableStock > 0) {
                    existingItem.orderQuantity += availableStock;
                    set({ items: [...currentItems] });
                    toast.success(`Añadido ${availableStock} a este producto, máximo stock alcanzado`);
                } else {
                    toast.error("Ya tienes toda la cantidad disponible de este producto en el carrito 🤨");
                }
            } else {
                set({ items: [...currentItems, data] });
                toast.success("Producto añadido al carrito. 🥳");
            }
        },
        updateItem: (id: string, quantity: number) => {
            const currentItems: CartOrder[] = get().items;
            const itemToUpdate = currentItems.find((item) => item.id === id);

            if (itemToUpdate) {
                if (quantity <= itemToUpdate.quantity) {
                    itemToUpdate.orderQuantity = quantity;
                    set({ items: [...currentItems] });
                    toast.success("Cantidad actualizada correctamente.");
                } else {
                    toast.error("No puedes exceder el stock disponible.");
                }
            } else {
                toast.error("El producto no existe en el carrito.");
            }
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] });
            toast.success('Producto eliminado del carrito. 😔');
        },
        removeAll: () => set({ items: [] }),
    }), {
        name: 'inventario-carrito',
        storage: createJSONStorage(() => localStorage)
    })
);

export default useCart;