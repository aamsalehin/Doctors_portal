import React from "react";
import Hero from "./Hero/Hero";
import image from "../../../src/assets/images/chair.png";
import InfoSection from "./InfoSection/InfoSection";
import ServiceSection from "./ServiceSection/ServiceSection";

function Home() {
  return (
    <>
      <Hero image={image}></Hero>
      <InfoSection></InfoSection>
      <ServiceSection></ServiceSection>
    </>
  );
}

export default Home;
