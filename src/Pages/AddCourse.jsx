import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddCourse = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      image: e.target.thumbnail.value, // renamed to match backend
      price: parseFloat(e.target.price.value),
      duration: e.target.duration.value,
      category: e.target.category.value,
      description: e.target.description.value,
      created_by: user?.email || "admin",
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/all-course",
        formData
      );
      Swal.fire("Success", "Course added successfully!", "success");
      e.target.reset(); // reset the form
      console.log(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl md:text-5xl p-1 md:p-8">
        Add Course
      </h2>

      <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
        <div className="card-body p-6 relative">
          <h2 className="text-2xl font-bold text-center mb-6">
            Add New Course
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              required
              className="input w-full rounded-full p-2"
            />
            <input
              type="url"
              name="thumbnail"
              placeholder="Image URL"
              required
              className="input w-full rounded-full p-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              className="input w-full rounded-full p-2"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 3 weeks)"
              required
              className="input w-full rounded-full p-2"
            />
            <select
              name="category"
              required
              className="select w-full rounded-full p-2"
            >
              <option value="">Select Category</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              name="description"
              rows="4"
              placeholder="Course Description"
              required
              className="textarea w-full rounded-2xl p-2"
            />
            <button
              type="submit"
              className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
            >
              Add Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
