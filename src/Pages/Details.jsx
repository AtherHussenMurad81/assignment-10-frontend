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

  // fetch single course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/all-course/${id}`);
        setCourse(res.data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);
  console.log(course);
  const handleEnroll = async () => {
    // login check
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to enroll this course",
      });
      navigate("/login");
      return;
    }

    // enroll data
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
    };
    console.log(enrollData);

    try {
      const res = await axios.post("http://localhost:3000/enroll", enrollData);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Course Enrolled Successfully", "success");
        navigate("/my-enroll");
      } else {
        Swal.fire("Info", "Already Enrolled", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Enrollment Failed", "error");
    }
  };

  if (loading) {
    return <p className="text-center text-3xl mt-10">Loading...</p>;
  }

  if (!course) {
    return <p className="text-center text-red-500">Course not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course Image */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-80 object-cover rounded"
        />

        {/* Course Details */}
        <div>
          <h2 className="text-3xl font-bold mb-3">{course.title}</h2>
          <p className="mb-3">{course.description}</p>
          <p className="mb-2">💲 Price: ${course.price}</p>
          <p className="mb-2">📂 Category: {course.category}</p>
          <p className="mb-2">⏱ Duration: {course.duration} Weeks</p>
          {course.instructor && (
            <div className="flex items-center mt-4 mb-4">
              <img
                src={course.instructor.photo}
                alt={course.instructor.name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <p>👨‍🏫 Instructor: {course.instructor.name}</p>
            </div>
          )}

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
