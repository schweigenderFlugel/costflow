import { Hero } from "@/components/landing/hero/hero";
import { Features } from "@/components/landing/features/features";
import { HowItWorks } from "@/components/landing/how-it-works/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { Contact } from "@/components/landing/contact";
import { Navbar5 } from "@/components/landing/navbar";

export const metadata = {
  title: "Inicio",
};

const Page = () => {
  return (
    <div>
      <Navbar5 />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Contact />
    </div>
  );
};

export default Page;
