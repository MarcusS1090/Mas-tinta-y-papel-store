"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

import Container from "@/components/ui/container";
import logo from "../public/logo.png";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import { Category } from "@/types";
import NavbarSearch from "@/components/ui/navbar-search";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";

export const revalidate = 0;

interface NavbarProps {
    categories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-purple-300 shadow border-b">
            <Container>
                <div className="relative px-4 sm:px-9 lg:px-8 flex h-16 items-center justify-between lg:h-20">
                    <Link href="/" className="flex gap-x-2">
                        <Image 
                            src={logo}
                            alt="logo"
                            quality={100}
                            className="h-16 w-auto lg:h-24"
                        />
                    </Link>
                    {/* Desktop View */}
                    <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-x-6 lg:flex-grow">
                        <NavbarSearch />
                        <div className="flex items-center gap-x-2">
                            <Link href="https://instagram.com/mas_tintaypapel?igshid=MzRlODBiNWFlZA==" className="flex">
                                <IoLogoInstagram className="w-8 h-auto text-pink-200"/>
                            </Link>
                            <Link href="https://wa.me/message/QFCXC6OV7NEQA1" className="flex">
                                <IoLogoWhatsapp className="w-8 h-auto text-pink-200"/>
                            </Link>
                        </div>
                        <MainNav data={categories} />
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:gap-x-4">
                        <NavbarActions />
                    </div>
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-white focus:outline-none"
                    >
                        <MenuIcon size={24} />
                    </button>
                </div>
                {/* Mobile Menu Content */}
                {isOpen && (
                    <div className="lg:hidden px-4 pb-4">
                        <div className="flex flex-col items-center space-y-4 mb-4">
                            <NavbarSearch />
                            <div className="flex items-center gap-x-4">
                                <Link href="https://instagram.com/mas_tintaypapel?igshid=MzRlODBiNWFlZA==" className="flex items-center justify-center p-2 rounded-full bg-pink-600 transition hover:scale-110">
                                    <IoLogoInstagram className="w-6 h-6 text-pink-200"/>
                                </Link>
                                <Link href="https://wa.me/message/QFCXC6OV7NEQA1" className="flex items-center justify-center p-2 rounded-full bg-pink-600 transition hover:scale-110">
                                    <IoLogoWhatsapp className="w-6 h-6 text-pink-200"/>
                                </Link>
                            </div>
                        </div>
                        <MainNav data={categories} isMobile={true} />
                        <div className="mt-4 flex justify-center w-full">
                            <NavbarActions />
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Navbar;