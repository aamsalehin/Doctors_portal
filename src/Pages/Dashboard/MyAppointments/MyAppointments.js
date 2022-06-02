import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Spinner from "../../Shared/Spinner/Spinner";

function MyAppointments() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState([]);
  const [user] = useAuthState(auth);

  fetch(`http://localhost:4000/bookings?email=${user.email}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else {
        return res.json();
      }
    })
    .then((data) => setAppointment(data));

  if (appointment.length === 0) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <h4 className="text-center font-bold text-secondary text-2xl ">
        My Appointments
      </h4>
      <>
        <div class="overflow-x-auto px-5">
          <table class="table table-hover w-full">
            <thead className="bg-gray-600">
              <tr className="bg-gray-600 text-white">
                <th className="bg-gray-600">#</th>
                <th className="bg-gray-600">Name</th>
                <th className="bg-gray-600">Email</th>
                <th className="bg-gray-600">date</th>
                <th className="bg-gray-600">Time</th>
                <th className="bg-gray-600">Treatment</th>
              </tr>
            </thead>
            <tbody>
              {appointment.map((ap, index) => (
                <tr className="bg-gray-600 text-white">
                  <th className="bg-gray-600">{index + 1}</th>
                  <td className="bg-gray-600">
                    {ap.patientName ? ap.patientName : "not available"}
                  </td>
                  <td className="bg-gray-600">{ap.patientEmail}</td>
                  <td className="bg-gray-600">{ap.date}</td>
                  <td className="bg-gray-600">{ap.slot}</td>
                  <td className="bg-gray-600">{ap.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}

export default MyAppointments;
