import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Spinner from "../../Shared/Spinner/Spinner";

function Users() {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () => {
    return fetch("http://localhost:4000/users", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const makeAdmin = (email) => {
    fetch(`http://localhost:4000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("You are not an admin to di it!");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Made admin successfully");
          refetch();
        }
      });
  };
  const makeUser = (email) => {
    fetch(`http://localhost:4000/user/user/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("You are not an admin to di it!");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Made admin successfully");
          refetch();
        }
      });
  };
  return (
    <div className="text-white">
      <h3 className="text-center text-2xl font-bold text-secondary">Users</h3>
      <div class="overflow-x-auto px-5">
        <table class="table table-hover w-full">
          <thead className="bg-gray-600">
            <tr className="bg-gray-600 text-white">
              <th className="bg-gray-600">#</th>
              <th className="bg-gray-600">Email</th>
              <th className="bg-gray-600">Make Admin</th>
              <th className="bg-gray-600">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="bg-gray-600 text-white">
                <th className="bg-gray-600">{index + 1}</th>
                <td className="bg-gray-600">{user.email}</td>
                <td className="bg-gray-600">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => makeUser(user.email)}
                      className="btn btn-xs btn-warning text-white font-bold"
                    >
                      Make user
                    </button>
                  ) : (
                    <button
                      onClick={() => makeAdmin(user.email)}
                      className="btn btn-xs btn-success text-white font-bold"
                    >
                      Make admin
                    </button>
                  )}
                </td>
                <td className="bg-gray-600">
                  <button className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
