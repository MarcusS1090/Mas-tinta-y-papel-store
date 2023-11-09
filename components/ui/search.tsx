"use client";

import { Product } from "@/types";
import { useSearchParams, useRouter ,  usePathname} from "next/navigation";


interface MainNavProps {
    data: Product[];
}

const Search:React.FC<MainNavProps> = ({data}, { placeholder }: {placeholder:string}) => {

    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const handleSearch = (search: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (search) {
            params.set('query', search);
        } else {
            params.delete('query');
        }
        replace(`${product}?${params.toString()}`);
    }  

    return (  
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
        </div>
    );
}

export default Search;