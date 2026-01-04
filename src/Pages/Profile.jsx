import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const Profile = () => {
  const { user, signOutUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold ">
            {user?.displayName || "Anonymous User"}
          </h2>
          <p className=" text-sm">{user?.email || "Email not provided"}</p>
        </div>

        {/* User Info Section (Optional for future expansion) */}
        <div className="mt-6 space-y-2">
          {/* Example info card */}
          {/* <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">Joined on: 01 Jan 2026</p>
          </div> */}
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={signOutUser}
            className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
          <Link
            to="/updateProfile"
            className="px-6 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-all duration-300"
          >
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
