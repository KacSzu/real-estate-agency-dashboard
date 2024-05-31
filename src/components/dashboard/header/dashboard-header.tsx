"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function DashboardHeader() {
  const { data: session } = useSession();
  const emailFallback = session?.user?.email?.slice(0, 2);
  return (
    <header className="fixed inset-0 z-20 bg-background px-4 h-14 flex justify-between items-center border-b border-gray-300">
      <nav className="flex items-center">
        <Image src={"/logo.png"} alt="logo" width={32} height={32} />
      </nav>
      <div className="ml-4 text-lg font-semibold flex gap-2">
        <Avatar>
          <AvatarFallback className="uppercase">{emailFallback}</AvatarFallback>
        </Avatar>
        <button onClick={() => signOut()}>Log out</button>
      </div>
    </header>
  );
}

export default DashboardHeader;
