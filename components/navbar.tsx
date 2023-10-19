import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/container";

import logo from "../public/logo.png"
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";

const Navbar = async () => {

    const categories = await getCategories();
    
    return ( 
        <div className="
            h-[175px]
            bg-purple-300
            shadow 
            border-b
        ">
            <Container>
                <div className="relative px-4 sm:px-9 lg:px-8 flex items-center w-[1403px] h-[161px]">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2 ">
                        <Image 
                            src={logo}
                            alt="logo"
                            quality={100}
                            className="w-[154px] h-[114px]"
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