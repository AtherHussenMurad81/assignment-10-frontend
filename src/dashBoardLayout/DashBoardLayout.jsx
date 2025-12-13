import React from "react";
import DashBoard from "./DashBoard";

const DashBoardLayout = () => {
  return (
    <div>
      {/* DashBoard includes sidebar + Outlet */}
      <DashBoard />
    </div>
  );
};

export default DashBoardLayout;
