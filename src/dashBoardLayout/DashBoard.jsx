import React from "react";
import { FaHome } from "react-icons/fa";
import { MdGolfCourse, MdDownloadDone } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { NavLink, Outlet } from "react-router";

const DashBoard = () => {
  const linkClass = ({ isActive }) =>
    `is-drawer-close:tooltip is-drawer-close:tooltip-right
     flex items-center gap-3 rounded px-3 py-2 transition
     ${isActive ? "bg-green-500 text-white" : "hover:bg-base-300"}`;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content */}
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
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
          <div className="px-4 text-xl font-bold">Dashboard</div>
        </nav>

        {/* Page content */}
        <div className="p-4">
          <Outlet /> {/* renders current child route */}
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow p-2">
            <li>
              <NavLink to="/dash-board" className={linkClass}>
                <MdGolfCourse />
                <span className="is-drawer-close:hidden">My Course</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dash-board/add-course" className={linkClass}>
                <IoMdAdd />
                <span className="is-drawer-close:hidden">Add Course</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dash-board/enroll" className={linkClass}>
                <MdDownloadDone />
                <span className="is-drawer-close:hidden">My Enroll</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={linkClass}>
                <FaHome />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
