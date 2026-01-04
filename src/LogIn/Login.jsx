import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import GoogleIcon from "../Share/GoogleIcon";
import { FaEye, FaRegEyeSlash, FaFacebook } from "react-icons/fa";

const Login = () => {
  const { signInUser, signInWithGoogle, signInWithFacebook } =
    useContext(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Demo credentials autofill & optional auto-login
  const handleDemoLogin = (type) => {
    if (type === "user") {
      const demoUser = {
        email: "murad@nahin.com",
        password: "Nowshad@2024",
      };
      setFormData(demoUser);
      handleAutoLogin(demoUser);
    }
  };

  // Optional: auto-login for demo credentials
  const handleAutoLogin = ({ email, password }) => {
    signInUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Demo Login Successful",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  // Normal form login
  const handleLogIn = (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    signInUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  // Google login
  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then(() => navigate(from, { replace: true }))
      .catch((err) => setError(err.message));
  };

  // Facebook login
  const handleFacebookLogIn = () => {
    signInWithFacebook()
      .then(() => navigate(from, { replace: true }))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="card shadow-2xl w-full max-w-md p-6 rounded-lg ">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogIn} className="space-y-4">
          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered w-full rounded-full h-12"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="font-bold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input input-bordered w-full rounded-full h-12 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute items-center right-4 top-1/2 -translate-y-1/2 "
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link className="text-sm link link-hover">Forgot password?</Link>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex">
            <button className="btn w-[50%] bg-gradient-to-r hover:transform from-pink-500 hover:animate-pulse to-red-600 rounded-full h-12">
              Login
            </button>
            <button
              onClick={() => handleDemoLogin("user")}
              className="btn w-[50%] bg-gradient-to-r from-pink-500 hover:animate-pulse to to-red-600 rounded-full h-12"
            >
              Demo User
            </button>
          </div>
        </form>

        {/* Demo Login */}
        <div className="flex justify-center gap-2 mt-4">
          {/* <button
            onClick={() => handleDemoLogin("admin")}
            className="btn btn-outline btn-sm"
          >
            Demo Admin
          </button> */}
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={handleGoogleLogIn}
            className="btn w-full  rounded-full  flex items-center justify-center gap-2"
          >
            <GoogleIcon /> Login with Google
          </button>
          <button
            onClick={handleFacebookLogIn}
            className="btn w-full  rounded-full bg-blue-600  flex items-center justify-center gap-2"
          >
            <FaFacebook /> Login with Facebook
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          New to our website?{" "}
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
