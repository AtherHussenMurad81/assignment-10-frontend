import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;
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
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="displayName"
              required
              className="input rounded-full"
              placeholder="Name"
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="input rounded-full"
              placeholder="Photo URL"
            />

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

            {/* ❌ Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600">
              Register
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
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
