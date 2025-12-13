import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Courses from "../Pages/Courses";
import Login from "../LogIn/Login";
import Register from "../Register/Register";
import PrivateRoute from "./PrivateRoute";
import Details from "../Pages/Details";
import AddCourse from "../Pages/AddCourse.jsx";
import Profile from "../Pages/Profile.jsx";
import UpdateProfile from "../Pages/UpdateProfile.jsx";
import MyCourse from "../Pages/MyCourse.jsx";
import MyEnroll from "../Pages/MyEnroll.jsx";
import DashBoardLayout from "../dashBoardLayout/DashBoardLayout.jsx";
import UpdateCourse from "../Pages/UpdateCourse.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "courses", element: <Courses /> },
      {
        path: "course/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      { path: "auth/login", element: <Login /> },
      { path: "auth/register", element: <Register /> },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Dashboard Routes
  {
    path: "/dash-board",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <MyCourse /> },
      { path: "add-course", element: <AddCourse /> },
      { path: "my-enroll", element: <MyEnroll /> },
      {
        path: "update-course/:id",
        element: <UpdateCourse />,
      },
    ],
  },
]);
