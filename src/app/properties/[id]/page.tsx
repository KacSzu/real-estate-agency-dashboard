import Header from "@/components/header/header";
import PropertyDisplay from "@/components/properties/property-display";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

interface IPropertyPage {
  params: {
    id: string;
  };
}

export default async function PropetyPage({ params }: IPropertyPage) {
  const { id: paramsId } = params;
  const propertyId = parseInt(paramsId, 10);

  const property = await prisma.property.findFirst({
    where: { id: propertyId },
    include: { images: true },
  });
  if (!property) notFound();

  return (
    <>
      <Header />
      <PropertyDisplay property={property} />
    </>
  );
}
