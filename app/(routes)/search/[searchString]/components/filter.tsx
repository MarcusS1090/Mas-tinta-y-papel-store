"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Color, Size } from "@/types";
import qs from "query-string";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
}

const Filter = ({
    data, name, valueKey
}: FilterProps) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id
        }

        if (current[valueKey] === id) {
            query[valueKey] = null; //unselecting a value
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipNull: true})
        console.log(url);
        router.push(url);
    }


    return ( 
        <div className="mb-8">
            <h3 className="text-lg font-semibold">{name}</h3>
            <hr className="my-4" />
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                        <Button
                            className={cn(
                                "p-1 text-grey-80 rounded-lg border border-pink-600 text-xl transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200",
                                selectedValue === filter.id && "bg-black text-white"
                            )}
                            onClick={() => onClick(filter.id)}
                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filter;
