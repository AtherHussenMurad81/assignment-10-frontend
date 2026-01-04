import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Spinner from "../Share/Spinner";

const MyCourse = () => {
  const { user } = useContext(AuthContext);
  const [myCourse, setMyCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses
  const fetchMyCourses = () => {
    if (!user?.email) return;
    setLoading(true);
    axios
      .get(
        `https://assignment-10-server-seven-taupe.vercel.app/my-course?email=${user.email}`
      )
      .then((res) => {
        setMyCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyCourses();
  }, [user]);

  // Delete course
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This course will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://assignment-10-server-seven-taupe.vercel.app/my-course/${_id}`
          )
          .then(() => {
            Swal.fire("Deleted!", "Your course has been deleted.", "success");
            fetchMyCourses();
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (myCourse.length === 0) {
    return (
      <p className="text-center text-2xl mt-10 text-gray-400">
        No courses found!
      </p>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        My Courses ({myCourse.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myCourse.map((course) => {
          const { _id, title, image, category, description, created_by } =
            course;

          return (
            <div
              key={_id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Course Image */}
              <figure className="h-48 overflow-hidden relative">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full uppercase shadow">
                  {category}
                </span>
              </figure>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Created by: {created_by}
                </p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {description}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-2 mt-4">
                  <Link
                    to={`/course/${_id}`}
                    className="btn btn-sm bg-gradient-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white rounded-full"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/dash-board/update-course/${_id}`}
                    className="btn btn-sm bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-full"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourse;
