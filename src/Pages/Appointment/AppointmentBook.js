import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../Shared/Spinner/Spinner";

import AppointmentCard from "./AppointmentCard";
import AppointmentModal from "./AppointmentModal";

function AppointmentBook({ selected }) {
  const date = format(selected, "PP");
  // const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);
  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery(["repoData", date], () =>
    fetch(`http://localhost:4000/available?date=${date}`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  // useEffect(() => {
  //   fetch(`http://localhost:4000/available?date=${date}`).then((res) =>
  //     res.json().then((data) => setServices(data))
  //   );
  // }, [date]);

  return (
    <div>
      <h4 className="text-center text-secondary font-bold my-16">
        Available appintments on {date}
      </h4>
      <div className=" my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <AppointmentCard
            setTreatment={setTreatment}
            service={service}
            key={service._id}
          ></AppointmentCard>
        ))}
      </div>
      {treatment && (
        <AppointmentModal
          setTreatment={setTreatment}
          selected={selected}
          refetch={refetch}
          treatment={treatment}
        ></AppointmentModal>
      )}
    </div>
  );
}

export default AppointmentBook;
