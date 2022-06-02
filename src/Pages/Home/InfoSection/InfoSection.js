import React from "react";

import clock from "../../../assets/icons/clock.svg";
import location from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
import InfoCard from "../../../Components/InfoCard/InfoCard";

function InfoSection() {
  return (
    <div className="grid py-16 px-12 lg:px-0  grid-cols-1 gap-5 md:grid-cols-3">
      <InfoCard
        bg_class="bg-secondary "
        title="Opening Hours"
        description="Lorem Ipsum is simply dummy text of the pri"
        img={clock}
      ></InfoCard>
      <InfoCard
        title="Visit Our Location"
        description="Lorem Ipsum is simply dummy text of the pri"
        bg_class="bg-accent text-white"
        img={location}
      ></InfoCard>
      <InfoCard
        title="Contact Us Now"
        description="Lorem Ipsum is simply dummy text of the pri"
        bg_class="bg-primary"
        img={phone}
      ></InfoCard>
    </div>
  );
}

export default InfoSection;
