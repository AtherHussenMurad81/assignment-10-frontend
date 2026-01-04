import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Footer = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  return (
    <footer className="bg-gray-900 text-gray-300 p-10 sm:flex sm:justify-between sm:items-start gap-8">
      {/* Services */}
      <nav className="flex flex-col gap-2">
        <h6 className="text-lg font-bold text-white mb-2">Services</h6>
        <a href="#branding" className="hover:text-white transition-colors">
          Branding
        </a>
        <a href="#design" className="hover:text-white transition-colors">
          Design
        </a>
        <a href="#marketing" className="hover:text-white transition-colors">
          Marketing
        </a>
        <a href="#advertisement" className="hover:text-white transition-colors">
          Advertisement
        </a>
      </nav>

      {/* Company */}
      <nav className="flex flex-col gap-2">
        <h6 className="text-lg font-bold text-white mb-2">Company</h6>
        <Link to="/about" className="hover:text-white transition-colors">
          About us
        </Link>
        <a href="#contact" className="hover:text-white transition-colors">
          Contact
        </a>
        <Link to="courses" className="hover:text-white transition-colors">
          Jobs
        </Link>
      </nav>

      {/* Legal */}
      <nav className="flex flex-col gap-2">
        <h6 className="text-lg font-bold text-white mb-2">Legal</h6>
        <Link href="/about" className="hover:text-white transition-colors">
          Terms of use
        </Link>
        <Link href="/about" className="hover:text-white transition-colors">
          Privacy policy
        </Link>
        <Link href="/about" className="hover:text-white transition-colors">
          Cookie policy
        </Link>
      </nav>

      {/* Social Icons */}
      <div className="flex gap-4 mt-6 sm:mt-0">
        <a
          href="https://github.com/AtherHussenMurad81"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors text-xl"
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.02c-3.2.7-3.88-1.55-3.88-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a10.9 10.9 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.59.23 2.76.11 3.05.74.81 1.18 1.85 1.18 3.11 0 4.42-2.69 5.39-5.25 5.67.42.36.8 1.08.8 2.18v3.23c0 .3.2.65.79.54A11.53 11.53 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/hussenmurad/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-500 transition-colors text-xl"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.09h4.56V24H.22V8.09zM7.91 8.09h4.37v2.17h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.56v-6.89c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.64V24H7.91V8.09z" />
          </svg>
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-600 transition-colors text-xl"
          aria-label="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
