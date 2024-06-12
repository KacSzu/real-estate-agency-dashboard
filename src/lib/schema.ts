import { z } from "zod";

export const NewPropertyFormSchema = z.object({
  files: z.array(z.instanceof(File)).optional(),
  city: z.string().min(1, { message: "City is required" }),
  title: z.string().min(2, { message: "Title is required" }),
  type: z.enum(["Villa", "Home", "Flat"], { message: "Type is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({ message: "Price must be postive number" })
      .positive({ message: "Price must be a positive number" })
  ),
  numberBedrooms: z.preprocess(
    (val) => Number(val),
    z
      .number({ message: "Price must be postive number" })
      .positive({ message: "Number of bedrooms must be a positive number" })
  ),
  numberBathrooms: z.preprocess(
    (val) => Number(val),
    z
      .number({ message: "Price must be postive number" })
      .positive({ message: "Number of bathrooms must be a positive number" })
  ),
  description: z.string().min(1, { message: "Description is required" }),
});
export const NewUserFormSchema = z
  .object({
    email: z
      .string()
      .min(1, "This field can't be empty")
      .email("This is not a valid email."),
    password: z
      .string()
      .min(6, "Password has to be at least 6 characters long")
      .max(50),
    confirmPassword: z
      .string()
      .min(6, "Confirm password has to be at least 6 characters long")
      .max(50),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const ContactFormSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().min(1, "E-mail is required"),
  phone_number: z.string().min(1, "Phone number is required"),
});
export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, "This field can't be empty")
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, "Password has to be at least 6 characters long")
    .max(50),
});
