"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DesktopNav from "./desktop-nav";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { IoMenu } from "react-icons/io5";
import MobileNav from "./mobile-nav";
import Modal from "../ui/modal";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const isMobile = useIsMobile();
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
        className={`w-[80%] h-[80px] bg-white rounded-3xl shadow-xl flex justify-between items-center px-4 transition-opacity duration-300 ${
          isScrolled && !isScrollingUp ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="col-span-2">
          <Link href={"/"}>
            <Image src={"/logo.png"} alt="logo" width={60} height={60} />
          </Link>
        </div>
        {isMobile ? (
          <Modal>
            <Modal.Open opens="mobile-nav">
              <IoMenu className="text-3xl cursor-pointer" />
            </Modal.Open>
            <Modal.Window name="mobile-nav">
              <MobileNav onCloseModal={close} />
            </Modal.Window>
          </Modal>
        ) : (
          <DesktopNav />
        )}
      </div>
    </header>
  );
}

export default Header;
