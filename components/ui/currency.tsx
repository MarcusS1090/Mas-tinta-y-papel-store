"use client";

import { useEffect, useState } from "react";

export const formatter = new Intl.NumberFormat("es-CO", {
    style: 'currency',
    currency: "COP"
}); 

interface CurrencyProps {
    value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({value}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    if (!isMounted) {
        return null
    }
    return ( 
        <h1 className="font-semibold">
            {formatter.format(Number(value))}
        </h1> 
    );
}

export default Currency;