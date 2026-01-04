import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";
import CourseSkeleton from "./CourseSkeleton";
import NoFOund from "../Share/NoFOund";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // AOS Init
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Fetch all courses
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://assignment-10-server-seven-taupe.vercel.app/all-course")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Search courses
  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim();
    if (!search_text) return;

    setLoading(true);
    axios.get`https://assignment-10-server-seven-taupe.vercel.app/search?search=${search_text}`()
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // View details
  const handleViewDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading)
    return (
      <p className="text-center text-4xl mt-10" data-aos="fade-up">
        <CourseSkeleton></CourseSkeleton>
      </p>
    );

  return (
    <div className="p-4">
      {/* Title */}
      <h2
        data-aos="fade-down"
        className="text-3xl text-center font-bold p-2 md:p-8 mt-10"
      >
        All Courses Here
      </h2>

      {/* Search */}
      <form
        data-aos="fade-down"
        onSubmit={handleSearch}
        className="mt-5 mb-10 flex gap-2 justify-center"
      >
        <input
          name="search"
          type="search"
          placeholder="Search courses..."
          className="rounded p-2 "
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <p data-aos="fade-up" className="text-center text-xl">
          <NoFOund></NoFOund>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div
              key={course._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="p-4 rounded shadow hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                data-aos="zoom-in"
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded"
              />

              {/* Title */}
              <h2 data-aos="fade-right" className="text-xl font-bold mt-2">
                {course.title}
              </h2>

              {/* Description */}
              <p data-aos="fade-left" className="mt-1">
                {course.description}
              </p>

              {/* Price */}
              <p data-aos="fade-up" className="mt-2 font-semibold">
                ${course.price}
              </p>

              {/* Buttons */}
              <div data-aos="fade-up" className="mt-4 flex gap-2">
                <button
                  onClick={() => handleViewDetails(course._id)}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer hover:transform hover:animate-pulse"
                >
                  View Details
                </button>
                {/* <Link
                  onClick={() => handleEnroll(course)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Enroll Now
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllCourses;
