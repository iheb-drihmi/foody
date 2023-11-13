"use client";
import {
  AboutUs,
  Chef,
  FindUs,
  Footer,
  Gallery,
  Header,
  Intro,
  Laurels,
  // SpecialMenu,
  // Navbar,
  Products,
  SpecialMenu,
} from "@/components/container";

import CommonListing from "@/components/CommonListing";

export default function HomePage() {
  return (
    <div>
      <Intro />
      <Products filter limit={4} />
      <SpecialMenu />
      <Gallery />
      <Chef />
      <Laurels />
      <FindUs />
      <Footer />
    </div>
  );
}
