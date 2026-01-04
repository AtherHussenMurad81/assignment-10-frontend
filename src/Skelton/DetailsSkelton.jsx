import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const DetailsSkelton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `https://assignment-10-server-seven-taupe.vercel.app/all-course/${id}`
        );
        setCourse(res.data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to enroll this course",
      });
      navigate("/auth/login");
      return;
    }

    const enrollData = {
      courseId: course._id,
      title: course.title,
      image: course.image,
      category: course.category,
      description: course.description,
      price: Number(course.price),
      duration: course.duration,
      studentEmail: user.email,
      status: "Enrolled",
      instructor: course.instructor.name,
    };

    try {
      const res = await axios.post(
        "https://assignment-10-server-seven-taupe.vercel.app/enroll",
        enrollData
      );

      if (res.data.insertedId) {
        Swal.fire("Success!", "Course Enrolled Successfully", "success");
        navigate("/dash-board/enroll");
      } else {
        Swal.fire("Info", "Already Enrolled", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Enrollment Failed", "error");
    }
  };

  if (loading) {
    return <p className="text-center text-3xl mt-20">Loading course...</p>;
  }

  if (!course) {
    return <p className="text-center text-red-500 mt-20">Course not found</p>;
  }

  return (
    <div
      className="max-w-11/12 mx-auto mt-24 p-4 md:p-8 transition-colors duration-300"
      style={{ height: "calc(100vh - 300px)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Course Image */}
        <div className="relative group overflow-hidden rounded-xl shadow-lg">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
          />

          <p className="absolute bottom-4 left-4  font-bold text-xl drop-shadow-lg">
            {course.category}
          </p>
        </div>

        {/* Course Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {course.title}
            </h1>
            <p className="mb-6">{course.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  ${course.price}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  Price
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {course.duration} Weeks
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  Duration
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {course.category}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  Category
                </p>
              </div>
            </div>

            {/* Instructor */}
            {course.instructor && (
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
                <img
                  src={course.instructor.photo}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {course.instructor.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Instructor
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            className="mt-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition transform hover:scale-105"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsSkelton;
