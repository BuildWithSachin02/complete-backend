import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/auth.Slice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await dispatch(login(formData)).unwrap();
      alert("login is successfully");
      navigate("/home");
    } catch (err) {
      alert(err.messsage);
    }
  };

  return (
    <div className="signup-container mt-5">
      <div className="d-flex justify-content-center mt-5 flex-column align-items-center">
        <h4>Login</h4>

        <form onSubmit={handleSubmit} style={{ width: "350px" }}>
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
            Login
          </button>
        </form>

        <div>
          <p className="mt-2">
            If you are not register so goto to the{" "}
            <Link to="/signup">SignUp page!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
