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
