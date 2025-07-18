import React from "react";

import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getCategory from "@/actions/get-category";

import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";

import Filter from "@/app/(routes)/category/[categoryId]/components/filter";
import MobilFilters from "@/app/(routes)/category/[categoryId]/components/mobil-Filters";

import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";


export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string
    }
}

const CategoryPage:React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {
    const resolvedParams = await Promise.resolve(params);
    const resolvedSearchParams = await Promise.resolve(searchParams);

    const products = await getProducts({
        categoryId: resolvedParams.categoryId,
        colorId: resolvedSearchParams.colorId,
        sizeId: resolvedSearchParams.sizeId
    });
    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(resolvedParams.categoryId);

    return (  
        <div className="bg-white">
            <Container>
                <Billboard 
                    data={category.billboard}
                />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        {/*Añadiendo los filtros para los mobiles */}
                        <MobilFilters sizes={sizes} colors={colors} />
                        <div className="hidden lg:block">
                            <Filter 
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                            <Filter 
                                valueKey="colorId"
                                name="Colors"
                                data={colors}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard 
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CategoryPage;