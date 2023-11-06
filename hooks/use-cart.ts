import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';
interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);
    
    if (existingItem) {
        return toast('Ya tienes este producto en el carrito.🤨');
    }

    set({ items: [...get().items, data] });
    toast.success('Producto en tu carrito.🥳');
    },
    removeItem: (id: string) => {
    set({ items: [...get().items.filter((item) => item.id !== id)] });
    toast.success('Producto eliminado del carrito.😔');
    },
    removeAll: () => set({ items: [] }),
}), {
name: 'inventario-carrito',
storage: createJSONStorage(() => localStorage)
}));

export default useCart;