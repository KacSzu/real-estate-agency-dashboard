import Header from "@/components/header/header";
import HomepageBestProperties from "@/components/homepage/best-properties/homepage-best-properties";
import HomepageHero from "@/components/homepage/hero/homepage-hero";
import HomepageWhyUs from "@/components/homepage/why-us/homepage-why-us";

export default function Home() {
  return (
    <>
      <Header />
      <HomepageHero />
      <HomepageBestProperties />
      <HomepageWhyUs />
    </>
  );
}
