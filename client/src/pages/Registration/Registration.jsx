import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

const Registration = () => {
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post(
        "http://localhost:8800/api/auth/register",
        inputs);
      alert("Registration successful!");
    } catch (err) {
      setErr(err.response?.data || "An error occurred.");
    }
  };
  
  console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Habit Forge</h1>
          <h2>Forge Better Habits, Build a Better You.</h2>
          <p>
          Build consistency, join challenges, and track progress—all in one place.
          Start forging better habits today!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Gender"
              name="gender"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;