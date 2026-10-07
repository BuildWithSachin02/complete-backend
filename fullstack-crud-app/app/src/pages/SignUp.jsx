import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { singUp } from "../features/auth/auth.Slice";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData,'data is coming')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(singUp(formData)).unwrap();
      alert("Signup successful");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="signup-container mt-5">
      <div className="d-flex justify-content-center mt-5 flex-column align-items-center">
        <h4>Sign Up</h4>

        <form onSubmit={handleSubmit} style={{ width: "350px" }}>
          {/* Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email address</label>
          </div>

          {/* Password */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mt-2">
            Sign Up
          </button>
        </form>

        <div>
          <p className="mt-2">
            If you already registered, go to the <Link to='/'>login page!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
