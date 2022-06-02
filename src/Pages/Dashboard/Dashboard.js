import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  console.log(admin);
  return (
    <div className="bg-gray-700 rounded">
      <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content  flex flex-col ">
          <h3 className="text-2xl text-center  font-bold text-primary mb-3 mt-5">
            welcome to dashboard
          </h3>
          <Outlet></Outlet>
          {/* <!-- Page content here --> */}
        </div>
        <div class="drawer-side bg-gray-800 rounded">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-50 rounded  text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link
                className="text-white bg-gray-900 mb-1 hover:bg-gray-700"
                to="/dashboard"
              >
                My Appointments
              </Link>
            </li>
            <li>
              <Link
                className="text-white bg-gray-900 mb-1 hover:bg-gray-700"
                to="/dashboard/myprofile"
              >
                My Profile
              </Link>
            </li>
            {admin && (
              <>
                <li>
                  <Link
                    className="text-white bg-gray-900 mb-1 hover:bg-gray-700"
                    to="/dashboard/users"
                  >
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white bg-gray-900 mb-1 hover:bg-gray-700"
                    to="/dashboard/adddoctor"
                  >
                    Add a Doctor
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
