import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router"; // react-router-dom
import Swal from "sweetalert2";

const MyCourse = () => {
  const { user } = useContext(AuthContext);
  const [myCourse, setMyCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses of the logged-in user
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
      text: "You won't be able to revert this!",
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
            fetchMyCourses(); // Refresh list
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (loading) {
    return (
      <p className="text-center text-2xl mt-10">Loading your courses...</p>
    );
  }

  if (myCourse.length === 0) {
    return <p className="text-center text-2xl mt-10">No courses found!</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl text-center mb-6">
        My Courses: {myCourse.length}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myCourse.map((course) => {
          const { _id, title, image, category, description, created_by } =
            course;

          return (
            <div
              key={_id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="badge text-xs badge-secondary rounded-full">
                  {category}
                </div>
                <div className="text-xs text-secondary mt-1">
                  Created by: {created_by}
                </div>
                <p className="line-clamp-2 mt-2">{description}</p>
                <div className="card-actions justify-between mt-4 flex flex-col gap-2">
                  <Link
                    to={`/course/${_id}`}
                    className="btn btn-sm bg-gradient-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white w-full rounded-full"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/dash-board/update-course/${_id}`} // pass course ID
                    className="btn btn-sm bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white w-full rounded-full"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white w-full rounded-full"
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
