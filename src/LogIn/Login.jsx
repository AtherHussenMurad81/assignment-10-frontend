import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // redirect path
  const from = location.state?.from?.pathname || "/";

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");

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
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl border">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input rounded-full"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              required
              className="input rounded-full"
              placeholder="Password"
            />

            <div>
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>

            {/* ❌ Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600">
              Login
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleLogIn}
          className="btn bg-white rounded-full text-black border"
        >
          Login with Google
        </button>

        <p className="text-center text-sm mt-2">
          New to our website?{" "}
          <Link className="text-blue-500 hover:underline" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
