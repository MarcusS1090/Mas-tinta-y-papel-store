"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";

import { cn } from "@/lib/utils";

import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X, XCircle } from "lucide-react";


import { useState } from "react";
import Filter from "./filter";

interface MobilFiltersProps {
    sizes: Size[];
    colors: Color[];
}
const MobilFilters:React.FC<MobilFiltersProps> = ({
    sizes,
    colors
}) => {

    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (  
        <>
            <Button 
                className={cn(
                    "flex items-center gap-x-2 lg:hidden text-grey-80  text-xl transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200 ",
                    "p-1 text-grey-80 rounded-lg border border-pink-600 mb-5",
                )}
                onClick={onOpen}
                >
                Filtros
                <Plus size={20} />
            </Button>
            <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                    {/* posicion de el modal */}
                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className="
                        relative
                        ml-auto
                        flex
                        h-full
                        w-full
                        max-w-xs
                        flex-col
                        overflow-y-auto
                        bg-white
                        py-4
                        pb-6
                        shadow-xl">
                            {/* boton de cierre */}
                            <div className="flex items-center justify-end px-4">
                            <IconButton icon={<XCircle size={20}/>} onClick={onClose}/>
                            </div>
                            {/* Reenderizando los filtros */}
                            <div className="p-4">
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
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}

export default MobilFilters;