import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Overview = () => {
  // Dashboard data
  const data = [
    { name: "Total Courses", value: 12 },
    { name: "Enrolled Students", value: 45 },
    { name: "Pending Tasks", value: 3 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {data.map((item) => (
          <div key={item.name} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Histogram / Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Dashboard Stats</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4ade80" /> {/* green bar */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
