import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

import auth from "../../firebase.init";

function AppointmentModal({ treatment, selected, setTreatment, refetch }) {
  const date = format(selected, "PP");
  const [user, loading, error] = useAuthState(auth);
  const { _id, name, slots } = treatment;
  const hanleBooking = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    const booking = {
      treatmentId: _id,
      treatment: name,
      date: date,
      slot: slot,
      patientEmail: user.email,
      patientName: user.displayName,
      phone: event.target.phone.value,
    };
    fetch("http://localhost:4000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          refetch();
          toast.success(
            `Your appointment booked on ${booking.date} at ${booking.slot}`
          );
        } else {
          toast.error(
            `you have already boooked appointment for ${booking.treatment}`
          );
        }
      });

    setTreatment(null);
  };
  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            for="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg text-secondary text-center font-bold my-5">
            Take appointment for :{name}
          </h3>
          <form onSubmit={hanleBooking} className="grid grid-cols-1 gap-5">
            <input
              name="date"
              type="text"
              placeholder="Type here"
              value={date}
              disabled
              className="input input-bordered w-full"
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              name="name"
              type="text"
              disabled
              value={user?.displayName}
              className="input input-bordered w-full"
            />
            <input
              name="email"
              type="email"
              disabled
              value={user?.email}
              className="input input-bordered w-full"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />

            <button
              type="submit"
              className="btn  btn-secondary fw-bold text-white"
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AppointmentModal;
