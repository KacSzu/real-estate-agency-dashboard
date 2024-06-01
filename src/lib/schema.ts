import { z } from "zod";

export const NewPropertyFormSchema = z.object({
  files: z.array(z.instanceof(File)).optional(),
  city: z.string().min(1, { message: "City is required" }),
  title: z.string().min(2, { message: "Title is required" }),
  type: z.enum(["Villa", "Home", "Flat"], { message: "Type is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  numberBedrooms: z.string().min(1, { message: "Number bedrooms is required" }),
  numberBathrooms: z
    .string()
    .min(1, { message: "Number bathrooms is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
