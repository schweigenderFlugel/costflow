import Image from "next/image";
import { Navbar5 } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero/hero";
import { Features } from "@/components/landing/features/features";
import { HowItWorks } from "@/components/landing/how-it-works/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { Contact } from "@/components/landing/contact";

export default function Home() {
  return (
    <div>
      <Navbar5 />
      <Hero/>
      <Features/>
      <HowItWorks/>
      <Pricing/>
      <Contact/>
    </div>
  );
}
