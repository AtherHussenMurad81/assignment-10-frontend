import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const Profile = () => {
  const { user, signOutUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-800">
            {user?.displayName || "No Name Found"}
          </h2>

          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        {/* User Info */}

        {/* Actions */}
        <div className="mt-6 flex justify-around">
          <button
            onClick={signOutUser}
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-800 transition "
          >
            Logout
          </button>
          <Link
            to="/updateProfile"
            className="px-6 ml-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
