import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "../Share/Spinner";

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
      .get(
        "https://assignment-10-server-seven-taupe.vercel.app/popular-courses"
      )
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  // console.log(courses);

  const handleViewDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl md:text-5xl w-11/12 mx-auto text-center mb-5 p-2 md:p-10">
        Popular Courses: {courses.length}
      </h2>

      <div className="grid max-w-11/12 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-4 rounded shadow hover:shadow-lg transition-transform transform hover:scale-108 hover:duration-2000"
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
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
