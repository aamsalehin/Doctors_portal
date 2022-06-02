import React, { useState } from "react";
import AppointmentBanner from "./AppointmentBanner";
import AppointmentBook from "./AppointmentBook";
function Appointment() {
  const [selected, setSelected] = useState(new Date());
  return (
    <div>
      <AppointmentBanner
        mode="single"
        selected={selected}
        setSelected={setSelected}
      ></AppointmentBanner>
      {selected ? (
        <AppointmentBook selected={selected}></AppointmentBook>
      ) : (
        <h2 className="text-center py-4 text-red-500 bg-red-200 font-bold">
          Please select a day
        </h2>
      )}
    </div>
  );
}

export default Appointment;
