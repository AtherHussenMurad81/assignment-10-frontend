import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="">
        <Navbar></Navbar>
        <div className="mt-4 min-h-[70vh]">
          <Outlet />
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
