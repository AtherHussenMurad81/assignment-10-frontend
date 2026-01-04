import React from "react";

const NoFOund = () => {
  return (
    <div
      data-aos="fade-up"
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* Icon */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-700">
        No Courses Available
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-gray-500">
        We couldn’t find any courses right now. Please check back later or try
        adjusting your filters.
      </p>
    </div>
  );
};

export default NoFOund;
