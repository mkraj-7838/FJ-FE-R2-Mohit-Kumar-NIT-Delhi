"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Menu } from "lucide-react";

function Header() {
    // State to manage mobile menu visibility
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Define menu items with their respective routes and icons
    const headerMenu = [
        { id: 1, name: "Ride", icon: "/taxi.png", route: "/" },
        { id: 2, name: "History", icon: "/box.png", route: "/history" },
    ];

    return (
        <div className="p-5 pb-3 pl-10 border-b-4 border-gray-300 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-black text-black dark:text-white">
            {/* Left: Logo and Desktop Menu */}
            <div className="flex items-center gap-24">
                {/* Logo */}
                <Image src="/logo.png" width={150} height={70} alt="logo" />

                {/* Desktop Menu (Hidden on small screens) */}
                <div className="hidden md:flex gap-6 items-center">
                    {headerMenu.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-2 items-center cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
                            onClick={() => router.push(item.route)}
                        >
                            <Image src={item.icon} width={17} height={17} alt={item.name} />
                            <h2 className="text-[20px] font-medium">{item.name}</h2>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: User Button + Mobile Menu Toggle */}
            <div className="flex items-center gap-5">
                {/* User profile button */}
                <UserButton />

                {/* Hamburger Menu Button (Visible only on small screens) */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Menu (Visible when isOpen is true) */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white dark:bg-black shadow-md p-5 flex flex-col items-center gap-4 md:hidden">
                    {headerMenu.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-2 items-center cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
                            onClick={() => {
                                setIsOpen(false);
                                router.push(item.route);
                                if (item.name === "Ride") window.location.reload(); // Refresh page when selecting "Ride"
                            }}
                        >
                            <Image src={item.icon} width={17} height={17} alt={item.name} />
                            <h2 className="text-[14px] font-medium">{item.name}</h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Header;
