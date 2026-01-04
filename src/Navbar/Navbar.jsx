import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
// import DashBoard from "../Pages/DashBoard";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  const { user, signOutUser } = use(AuthContext);
  const links = [
    <li key="home">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
            : "px-3 py-2"
        }
      >
        Home
      </NavLink>
    </li>,

    <li key="courses">
      <NavLink
        to="/courses"
        className={({ isActive }) =>
          isActive
            ? "bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
            : "px-3 py-2"
        }
      >
        Courses
      </NavLink>
    </li>,
    <li key="dash-board">
      <NavLink
        to="/dash-board"
        className={({ isActive }) =>
          isActive
            ? "bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
            : "px-3 py-2"
        }
      >
        DashBoard
      </NavLink>
    </li>,
    <li key="dash-board">
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? "bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
            : "px-3 py-2"
        }
      >
        Profile
      </NavLink>
    </li>,
    <li key="'about">
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
            : "px-3 py-2"
        }
      >
        About
      </NavLink>
    </li>,
    <li key="'Contact">
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
            : "px-3 py-2"
        }
      >
        Contact us
      </NavLink>
    </li>,
    // <li className="mt-3">
    //   <Link to={"/profile"}>Profile</Link>
    // </li>,
  ];

  return (
    <div className="bg-base-100 shadow-sm sticky">
      <div className="navbar max-w-11/12 mx-auto  bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl ">
            Online Learning Platform
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-3">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle"
          />

          {user ? (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 border-2 border-gray-300 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                {/* <li>
                <Link to={"/my-course"}>My Course</Link>
              </li>

              <li>
                <Link to={"/my-enroll"}>My Enroll</Link>
              </li> */}

                <li>
                  <button
                    onClick={signOutUser}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/auth/login"}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
            >
              {" "}
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
