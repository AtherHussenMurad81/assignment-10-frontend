import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MyEnroll = () => {
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .post(
        "https://assignment-10-server-seven-taupe.vercel.app/my-enrolled-courses",
        { email: user.email }
      )
      .then((res) => {
        setEnrolledCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // Prepare chart data: number of courses per category
  const chartData = enrolledCourses.reduce((acc, course) => {
    const existing = acc.find((c) => c.category === course.category);
    if (existing) {
      existing.count += 1;
      existing.totalPrice += course.price;
    } else {
      acc.push({
        category: course.category,
        count: 1,
        totalPrice: course.price,
      });
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <p className="text-center text-2xl mt-10">Loading enrolled courses...</p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>

      {enrolledCourses.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Course Name</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Duration</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {enrolledCourses.map((course, index) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{course.title}</td>
                    <td className="border px-4 py-2">{course.category}</td>
                    <td className="border px-4 py-2">
                      {course.duration} Weeks
                    </td>
                    <td className="border px-4 py-2">${course.price}</td>
                    <td className="border px-4 py-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">
                        {course.status || "Enrolled"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recharts Bar Chart */}
          <div className="w-full h-96">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Courses per Category
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4f46e5" name="Number of Courses" />
                <Bar
                  dataKey="totalPrice"
                  fill="#f59e0b"
                  name="Total Price ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default MyEnroll;
