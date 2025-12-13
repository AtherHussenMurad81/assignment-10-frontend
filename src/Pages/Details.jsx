import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single course
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/all-course/${id}`)
      .then((res) => {
        setCourse(res.data.result || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Enroll handler
  const handleEnroll = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to enroll this course",
      });
      navigate("/login");
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Enrolled Successfully!",
      text: `You have enrolled in ${course.title}`,
    });
  };

  // Loading state
  if (loading) {
    return (
      <p className="text-center text-4xl mt-10">Loading course details...</p>
    );
  }

  // No course found
  if (!course) {
    return (
      <p className="text-center text-2xl mt-10 text-red-500">
        Course not found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course Image */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-80 object-cover rounded shadow"
        />

        {/* Course Info */}
        <div>
          <h2 className="text-3xl font-bold mb-3">{course.title}</h2>

          <p className="text-gray-600 mb-4">{course.description}</p>

          <p className="text-xl font-semibold mb-2">
            💲 Price: ${course.price}
          </p>

          <p className="mb-2">
            📂 Category:{" "}
            <span className="font-medium">{course.category || "N/A"}</span>
          </p>

          <p className="mb-4">
            ⏱ Duration:{" "}
            <span className="font-medium">
              {course.duration ? `${course.duration} Weeks` : "N/A"}
            </span>
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={course.instructor?.photo}
              alt={course.instructor?.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">
                👨‍🏫 {course.instructor?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                {course.instructor?.email}
              </p>
            </div>
          </div>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
