import { userContext } from "@/App";
import NavbarComponent from "@/components/NavbarComponent";
import SidebarComponent from "@/components/SidebarComponent";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(userContext);

  return !access_token ? (
    <Navigate to="/" />
  ) : (
    <div className="w-[100vw] h-[100vh]">
      <NavbarComponent />
      <SidebarComponent />
    </div>
  );
};

export default HomePage;
