import React from "react";
import { FaHome } from "react-icons/fa";
import { MdGolfCourse, MdDownloadDone } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { NavLink, Outlet } from "react-router"; // make sure it's react-router-dom

const DashBoard = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded px-3 py-2 transition 
     ${isActive ? "bg-green-500 text-white" : "hover:bg-base-300"}`;

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle */}
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Drawer content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 px-4">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="text-xl font-bold">Dashboard</div>
        </nav>

        {/* Page content */}
        <main className="flex-1 p-4 bg-gray-50">
          <Outlet /> {/* Render child route */}
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <aside className="flex flex-col min-h-full bg-base-200 w-64 p-2">
          <ul className="menu flex flex-col gap-2 w-full">
            <li>
              <NavLink to="/dash-board/overview" className={linkClass}>
                <MdGolfCourse size={20} />
                <span>Overview</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dash-board" className={linkClass}>
                <MdGolfCourse size={20} />
                <span>My Course</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dash-board/add-course" className={linkClass}>
                <IoMdAdd size={20} />
                <span>Add Course</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dash-board/enroll" className={linkClass}>
                <MdDownloadDone size={20} />
                <span>My Enroll</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={linkClass}>
                <FaHome size={20} />
                <span>Homepage</span>
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashBoard;
