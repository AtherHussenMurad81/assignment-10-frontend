import React, { useContext } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const About = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">About Me</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Hi! I’m {user?.displayName}, a passionate MERN Stack Developer
            dedicated to building responsive, user-friendly web applications
            with clean and maintainable code.
          </p>
        </div>
      </section>

      {/* About Details */}
      <section className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src={user?.photoURL}
            alt=""
            className="rounded-xl shadow-xl w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Who I Am</h2>
          <p className="mb-4">
            I am a self-motivated web developer who loves solving problems and
            creating interactive web applications. My main expertise is in the
            MERN stack (MongoDB, Express.js, React, Node.js), but I also enjoy
            learning new technologies and improving my skills continuously.
          </p>
          <p className="mb-4">
            I focus on clean, modular, and scalable code while ensuring the user
            experience is seamless. Collaboration and teamwork are key values in
            my workflow, and I love contributing to projects that make a
            positive impact.
          </p>
          <p>
            My goal is to deliver high-quality software solutions that help
            businesses and individuals thrive in the digital world.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className=" py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "React.js",
              "Node.js",
              "Express.js",
              "MongoDB",
              "JavaScript",
              "HTML5 & CSS3",
              "Tailwind CSS",
              "Responsive Design",
              "Git & GitHub",
            ].map((skill) => (
              <div
                key={skill}
                className="p-6 rounded-xl shadow-lg text-center font-semibold hover:scale-105 transform transition-all"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">My Mission</h2>
        <p className="max-w-3xl mx-auto text-lg mb-4">
          My mission is to deliver web solutions that are not only visually
          appealing but also functional, fast, and accessible. I aim to create
          experiences that users love and that help businesses grow.
        </p>
        <p className="max-w-3xl mx-auto text-lg">
          I believe in lifelong learning and continuous improvement, and I am
          always exploring new technologies and best practices to bring the best
          results to every project.
        </p>
      </section>

      {/* Social Links */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Connect With Me</h2>
          <div className="flex justify-center gap-6 text-3xl">
            <a
              href="https://github.com/AtherHussenMurad81"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/hussenmurad/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
