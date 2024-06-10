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
const formSchema = z.object({
  email: z
    .string()
    .min(1, "This field can't be empty")
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, "Password has to be at least 6 characters long")
    .max(50),
});

function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@test.pl",
      password: "testte",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
                  <Input placeholder="email@example.com" {...field} />
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
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {isLoading ? (
              <ImSpinner className="animate-spin text-xl disabled:cursor-not-allowed" />
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
