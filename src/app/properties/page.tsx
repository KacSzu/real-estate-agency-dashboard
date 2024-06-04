import Header from "@/components/header/header";
import PropertiesDisplay from "@/components/properties/properties-display";
import prisma from "@/lib/db";

async function fetchProperties() {
  const properties = await prisma.property.findMany({
    include: {
      images: true,
    },
  });

  return properties;
}
export default async function PropertiesHome() {
  const properties = await fetchProperties();
  return (
    <>
      <Header />
      <PropertiesDisplay properties={properties} />
    </>
  );
}
