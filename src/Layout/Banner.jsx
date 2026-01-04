import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Banner = () => {
  const slides = [
    {
      img: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg", // Web development (laptop coding)
      title: "Learn Web Development",
    },
    {
      img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg", // MERN stack (developer workspace)
      title: "Master MERN Stack",
    },
    {
      img: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg", // UI/UX (design workspace)
      title: "UI/UX Design Courses",
    },
    {
      img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", // Project based (team project)
      title: "Project-Based Learning",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const handleAllCourses = () => {
    window.location.href = "/courses"; // Replace with your actual route
  };

  return (
    <div className="relative border border-2 w-screen h-screen overflow-hidden mx-auto">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Slide Image */}
          <img
            src={slide.img}
            alt={slide.title}
            className="w-screen h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Centered Text + Button */}
          <div className="absolute z-20 inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-6">
              {slide.title}
            </h1>
            <button
              onClick={handleAllCourses}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition transform hover:scale-105"
            >
              See All Courses
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute z-30 left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-30 right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute z-30 bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              current === i ? "bg-white w-5" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
