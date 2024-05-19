import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "../components/Loading";

export default function Main() {
  const { loading } = useContext(AuthContext);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
