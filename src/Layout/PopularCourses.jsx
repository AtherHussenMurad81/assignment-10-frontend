import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      easing: "fade-up",
      once: false,
      mirror: true,

      // animate only once
    });
  }, []);

  // Fetch courses from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/popular-courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  console.log(courses);

  const handleEnroll = (course) => {
    Swal.fire({
      title: "Enrolled!",
      text: `You have successfully enrolled in ${course.title}`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleViewDetails = (courseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Go there", "success");
      }
    });
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <p className="text-center text-xl mt-10">Loading courses...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl md:text-5xl text-center mb-5 p-2 md:p-10">
        Popular Courses: {courses.length}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={course._id}
            className="border p-4 rounded shadow hover:shadow-lg transition-transform transform hover:scale-108 hover:duration-2000"
            data-aos="fade-up"
            // data-aos="zoom-in"
            data-aos-duration="2000" // stagger animation
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{course.title}</h2>
            <p className="mt-1 text-gray-600">{course.description}</p>
            <p className="mt-2 font-semibold">${course.price}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleViewDetails(course._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
              >
                View Details
              </button>

              <button
                onClick={() => handleEnroll(course)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors cursor-pointer"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
