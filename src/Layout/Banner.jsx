import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Banner = () => {
  const [teach, setTeach] = useState([]); // State
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  // Fetch courses
  useEffect(() => {
    axios
      .get("http://localhost:3000/all-course")
      .then((res) => {
        setTeach(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Assuming instructor.photo is an image, not a video
  const images = teach.map((item) => item.instructor?.photo);
  // console.log(images);
  // console.log(teach);
  // Auto-play carousel
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images]);

  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (images.length === 0)
    return <p className="text-center mt-10">No images found</p>;

  return (
    <div className="relative w-full">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl shadow-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full shrink-0 relative">
              <img
                src={src}
                alt={`Instructor ${i}`}
                className="w-full h-[60vh] object-cover brightness-90 rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                current === i ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
