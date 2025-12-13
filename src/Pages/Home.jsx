import React, { useEffect } from "react";
import AllCourse from "../Layout/AllCourse";
import PopularCourses from "../Layout/PopularCourses";
import AOS from "aos";
import "aos/dist/aos.css";
import WhyChoose from "../Layout/WhyChoose";
import Banner from "../Layout/Banner";
import TopInstractor from "./TopInstractor";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="max-w-11/12 mx-auto p-4">
      {/* Popular Courses Section */}
      <Banner></Banner>
      <PopularCourses />

      {/* Why Choose This Course Section */}
      <TopInstractor></TopInstractor>
      <WhyChoose></WhyChoose>
    </div>
  );
};

export default Home;
