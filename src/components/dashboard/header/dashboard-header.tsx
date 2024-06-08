"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { HiBars3, HiOutlineTableCells } from "react-icons/hi2";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DASHBOARD_NAV_LINKS } from "../aside/dashboard-aside";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function DashboardHeader() {
  const isMobile = useIsMobile("767");
  const { data: session } = useSession();
  const emailFallback = session?.user?.email?.slice(0, 2);

  return (
    <header className="fixed inset-0 z-20 bg-background px-4 h-14 flex justify-between items-center border-b border-gray-300">
      <nav className="flex items-center">
        {isMobile ? (
          <Sheet>
            <SheetTrigger>
              <span className="text-2xl cursor-pointer">
                <HiBars3 />
              </span>
            </SheetTrigger>
            <SheetContent className="p-8">
              <ul className="space-y-2 divide-y">
                {DASHBOARD_NAV_LINKS.map((link, i) => (
                  <li key={i} className="py-2">
                    <Link href={link.href}>
                      <SheetClose className="flex gap-2 items-center text-xl ">
                        <span className="text-3xl">{link.icon}</span>
                        <span> {link.label}</span>
                      </SheetClose>
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        ) : (
          <Image src={"/logo.png"} alt="logo" width={32} height={32} />
        )}
      </nav>
      <div className="ml-4 text-lg font-semibold flex gap-3">
        <Avatar>
          <AvatarFallback className="uppercase">{emailFallback}</AvatarFallback>
        </Avatar>
        <Button onClick={() => signOut()}>Log out</Button>
      </div>
    </header>
  );
}

export default DashboardHeader;
