import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import GoogleIcon from "../Share/GoogleIcon";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");

    // 🔐 PASSWORD VALIDATION
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    createUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then(() => navigate(from, { replace: true }))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl ">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            {/* Name */}
            <label className=" font-bold text-xl">Name</label>
            <input
              type="text"
              name="displayName"
              required
              className="input font rounded-full h-12"
              placeholder="Name"
            />

            {/* Photo URL */}
            <label className=" font-bold text-xl">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="input rounded-full h-12"
              placeholder="Photo URL"
            />

            {/* Email */}
            <label className=" font-bold text-xl">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input rounded-full h-12"
              placeholder="Email"
            />

            {/* Password */}
            <label className="font-bold text-xl">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="input rounded-full h-12 w-full pr-14"
                placeholder="Password"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:animate-pulse">
              Register
            </button>
          </fieldset>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogIn}
          className="btn bg-white rounded-full text-black border mt-3"
        >
          <GoogleIcon />
          Login with Google
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
