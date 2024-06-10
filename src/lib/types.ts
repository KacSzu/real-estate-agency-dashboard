import { Image, Property } from "@prisma/client";

export interface PropertyWithImagesType extends Property {
  images: Image[];
}
