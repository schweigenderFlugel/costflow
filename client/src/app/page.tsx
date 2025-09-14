import { Hero } from "@/components/landing/hero/hero";
import { Features } from "@/components/landing/features/features";
import { HowItWorks } from "@/components/landing/how-it-works/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { Contact } from "@/components/landing/contact";
import { Navbar5 } from "@/components/landing/navbar";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata.home();

const Page = () => {
  return (
    <>
      <Navbar5 />
      <main className="!scroll-smooth" data-scroll-behavior="smooth">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Contact />
      </main>
    </>
  );
};

export default Page;
