import axios from "axios";
import React, { use, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../Context/AuthContext";

const TopInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  useEffect(() => {
    // AOS init
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    axios
      .get("http://localhost:3000/all-course")
      .then((res) => {
        const instructorData = res.data.map((course) => ({
          name: course.instructor?.name,
          photo: course.instructor?.photo || user?.photoURL,
        }));

        setInstructors(instructorData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <div className="my-16">
      {/* Title Animation */}
      <h2 data-aos="fade-down" className="text-center text-4xl font-bold mb-10">
        Top Instructors
      </h2>

      {/* Instructor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {instructors.map((instructor, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={instructor.photo}
              alt={instructor.name}
              className="w-24 h-24 rounded-full border-4 border-indigo-500 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {instructor.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopInstructor;
