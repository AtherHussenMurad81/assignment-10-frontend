import React from "react";

const CourseSkeleton = () => {
  return (
    <div className="border p-4 rounded shadow animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-300 rounded"></div>

      {/* Title */}
      <div className="h-5 bg-gray-300 rounded w-3/4 mt-4"></div>

      {/* Description */}
      <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>

      {/* Price */}
      <div className="h-5 bg-gray-300 rounded w-1/4 mt-4"></div>

      {/* Button */}
      <div className="flex gap-2 mt-4">
        <div className="h-10 w-28 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
