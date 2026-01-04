import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../Context/AuthContext";
import Spinner from "../Share/Spinner";

const TopInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // AOS init
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    axios
      .get("https://assignment-10-server-seven-taupe.vercel.app/all-course")
      .then((res) => {
        const allInstructors = res.data
          .map((course) => course.instructor)
          .filter(Boolean); // remove null/undefined

        // remove duplicates by name/email
        const uniqueInstructors = [];
        const map = new Map();

        for (const instructor of allInstructors) {
          if (!map.has(instructor.email)) {
            map.set(instructor.email, true);
            uniqueInstructors.push(instructor);
          }
        }

        setInstructors(uniqueInstructors);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (instructors.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">No instructors found.</p>
    );
  }

  return (
    <div className="my-16">
      {/* Title Animation */}
      <h2 data-aos="fade-down" className="text-center text-4xl font-bold mb-10">
        Top Instructors
      </h2>

      {/* Instructor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-11/12 mx-auto px-4">
        {instructors.map((instructor, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={instructor.photo || "https://via.placeholder.com/150"}
              alt={instructor.name}
              className="w-24 h-24 rounded-full border-4 border-indigo-500 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {instructor.name || "Unknown"}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopInstructor;
