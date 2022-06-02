import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import Spinner from "../Shared/Spinner/Spinner";

function RequireAdmin({ children }) {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const location = useLocation();
  if (loading || adminLoading) {
    return <Spinner></Spinner>;
  }
  if (!user || !admin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
export default RequireAdmin;
