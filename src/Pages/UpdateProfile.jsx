import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      setMessage("Profile updated successfully ✅");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Update Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {message && (
            <p className="text-center text-sm text-green-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
