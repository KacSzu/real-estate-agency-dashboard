import LoginForm from "@/components/admin/login-form";
import Header from "@/components/header/header";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <>
      <Header />

      <section className="relative h-screen flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:px-0">
        <div className=" hidden h-full bg-muted lg:flex items-center justify-center">
          <div className="flex justify-center">
            <Image
              className="rounded-xl shadow-xl"
              src="/loginform.jpg"
              alt="Real estate"
              width={475}
              height={525}
            />
          </div>
        </div>
        <div className="flex h-full flex-col justify-around p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to see dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below to sign in
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
