import qs from "query-string";

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    searchValue?: string;
    isFeatured?: boolean;
    quantity?: number;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            categoryId: query.categoryId,
            colorId: query.colorId,
            sizeId: query.sizeId,
            searchValue: query.searchValue,
            isFeatured: query.isFeatured,
            quantity: query.quantity,
        }
    });

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Error al obtener los productos.");
    }
    const products: Product[] = await res.json();
    return products.map((product) => ({
        ...product,
        quantity: product.quantity ?? 0, // Asegúrate de que quantity esté definido
    }));
}

export default getProducts;