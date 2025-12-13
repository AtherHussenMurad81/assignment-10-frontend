import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const UpdateCourse = () => {
  const { id } = useParams(); // get course ID from URL
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  // Fetch single course
  useEffect(() => {
    axios
      .get(`http://localhost:3000/all-course/${id}`)
      .then((res) => {
        const courseData = res.data.result;
        setCourse(courseData);
        setFormData({
          title: courseData.title || "",
          category: courseData.category || "",
          description: courseData.description || "",
          image: courseData.image || "",
        });
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/my-course/${id}`, formData)
      .then(() => {
        Swal.fire(
          "Updated!",
          "Course has been updated successfully.",
          "success"
        );
        navigate("/dash-board"); // redirect to dashboard
      })
      .catch((err) => console.error(err));
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-xl font-semibold animate-pulse">
        Loading course data...
      </p>
    );

  return (
    <div
      className="max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg mt-6"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Update Course
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter course title"
            className="input input-bordered w-full focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter course category"
            className="input input-bordered w-full focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input input-bordered w-full focus:ring-2 focus:ring-purple-400 transition"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter course description"
            className="textarea textarea-bordered w-full focus:ring-2 focus:ring-purple-400 transition"
            rows={5}
            required
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white w-full py-3 rounded-lg text-lg font-semibold transition-transform transform hover:-translate-y-1"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
