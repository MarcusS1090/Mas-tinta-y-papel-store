import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/container";

import logo from "../public/logo.png"

import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";

export const revalidate = 0;

const Navbar = async () => {

    const categories = await getCategories();
    
    return ( 
        <div className="
            h-38
            bg-purple-300
            shadow 
            border-b
        ">
            <Container>
            
                <div 
                    className="
                        relative
                        xl:right-0 lg:right-10
                        pb-3
                        mx-auto
                        xl:px-28 lg:px-2 
                        flex
                        items-center
                        xl:w-[1150px] lg:w-[900px] md:w-auto sm:w-auto
                        lg:h-[150px]
                        xl:gap-x-0 lg:gap-x-4
                        "
                    >
                        <Link href="/" className="ml-0">
                            <Image 
                                src={logo}
                                alt="logo"
                                quality={100}
                                className="
                                    xl:w-44 lg:w-28
                                "
                            />
                        </Link>
                        <MainNav
                            data={categories}
                        />
                </div>
            </Container>
        </div>
    );
}

export default Navbar;