import React from "react";

function AppointmentCard({ service, setTreatment }) {
  const { name, slots } = service;
  return (
    <>
      <div className="card  bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="fw-bold text-xl text-center text-secondary">{name}</h2>
          <p className="text-center">
            {slots.length > 0 ? (
              slots[0]
            ) : (
              <span className="text-red-500">no slot availvle</span>
            )}
          </p>
          <div className="card-actions justify-center">
            <label
              disabled={slots.length === 0}
              onClick={() => setTreatment(service)}
              htmlFor="my-modal-3"
              className="btn text-uppercase fw-bold text-white modal-button btn-secondary"
            >
              Book Appointment
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentCard;
