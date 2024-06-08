import { Image, Property } from "@prisma/client";

export interface PropertyWithImagesType extends Property {
  images: Image[];
}

export type Month =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Okt"
  | "Nov"
  | "Dec";
