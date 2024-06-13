import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import HomepageHero from "@/components/homepage/homepage-hero";
import HomepageOurAgents from "@/components/homepage/homepage-our-agents";
import HomepagePropertiesDisplay from "@/components/homepage/properties-display/homepage-properties-display";
import HomepageServices from "@/components/homepage/homepage-services";
import HomepageWhyUs from "@/components/homepage/homepage-why-us";

export default function Home() {
  return (
    <>
      <Header />
      <HomepageHero />
      <HomepagePropertiesDisplay />
      <HomepageOurAgents />
      <HomepageWhyUs />
      <HomepageServices />
      <Footer />
    </>
  );
}
