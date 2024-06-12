"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { ImSpinner } from "react-icons/im";
import { LoginFormSchema } from "@/lib/schema";

function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "test@test.pl",
      password: "testte",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", { ...values, redirect: false });
      if (res?.error) {
        setIsLoading(false);
        form.setValue("password", "");
        toast.error("Wrong email or password");
      } else {
        setIsLoading(false);
        router.push("/dashboard");
        form.reset();
        toast.success("Login successful.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="disabled:cursor-not-allowed"
                    disabled={isLoading}
                    placeholder="email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="disabled:cursor-not-allowed"
                    disabled={isLoading}
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="w-full disabled:cursor-not-allowed"
            type="submit"
          >
            {isLoading ? (
              <ImSpinner className="animate-spin text-xl " />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default LoginForm;
