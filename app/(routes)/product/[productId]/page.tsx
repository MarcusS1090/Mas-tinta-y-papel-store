import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";

import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";
import {useState} from "react";
import useCart from "@/hooks/use-cart";

interface ProductPageProps {
    params: {
        productId: string;
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    const resolvedParams = await Promise.resolve(params);

    const product = await getProduct(resolvedParams.productId);

    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id
    })

    return ( 
        <div className="bg-gray-100">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/*Galeria de productos */}
                        <Gallery images={product.images}/>
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0" >
                            {/* Informacion */}
                            <Info data={product}/>
                        </div>
                    </div>
                    <hr className="my-10"/>
                    <ProductList 
                        title="Productos relacionados que te pueden gustar"
                        items={suggestedProducts}
                    />
                </div>
            </Container>
        </div>
    );
}

export default ProductPage;