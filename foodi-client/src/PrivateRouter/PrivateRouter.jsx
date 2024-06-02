import React, { Children, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "../components/Loading";

export default function PrivateRouter({children}) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if(loading) return <Loading />;

  if(user) {
    return children;
  }

  return (
    <Navigate to="/signup" state={{ from: location }} replace/>
  )
}
