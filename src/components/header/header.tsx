"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DesktopNav from "./desktop-nav";
import { useIsMobile } from "@/hooks/use-is-mobile";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HiBars3 } from "react-icons/hi2";
import { NAV_LINKS } from "@/lib/constants";
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const isMobile = useIsMobile("1024");
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsScrolled(true);
        setIsScrollingUp(false);
      } else if (currentScrollY <= 50 || currentScrollY < lastScrollY) {
        setIsScrolled(false);
        setIsScrollingUp(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 max-w-5xl xl:max-w-7xl mx-auto ${
        isScrolled && !isScrollingUp ? "h-[10px]" : "h-[100px]"
      }`}
    >
      <div
        className={`w-[80%] h-[80px] bg-white rounded-3xl shadow-md flex justify-between items-center px-4 transition-opacity duration-300 ${
          isScrolled && !isScrollingUp ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="col-span-2">
          <Link href={"/"}>
            <Image src={"/logo.png"} alt="logo" width={60} height={60} />
          </Link>
        </div>
        {isMobile ? (
          <Sheet>
            <SheetTrigger>
              <span className="text-2xl cursor-pointer">
                <HiBars3 />
              </span>
            </SheetTrigger>
            <SheetContent className="p-8">
              <ul className="space-y-2 divide-y">
                {NAV_LINKS.map((link, i) => (
                  <li key={i} className="py-2">
                    <Link href={link.href}>
                      <SheetClose className="flex gap-2 items-center text-xl  ">
                        <span> {link.label}</span>
                      </SheetClose>
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        ) : (
          <DesktopNav />
        )}
      </div>
    </header>
  );
}

export default Header;
