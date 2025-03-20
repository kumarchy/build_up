import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and signin
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // Signup request
        const response = await axios.post(
          "http://localhost:3000/api/user/signup",
          formData
        );
        if (response.data.success) {
          setFormData({
            name: "",
            email: "",
            password: "",
          });
        }
        alert(response.data.message);
        setIsSignup(false);
      } else {
        // Signin request
        const response = await axios.post(
          "http://localhost:3000/api/user/signin",
          { email: formData.email, password: formData.password }
        );
        if (response.data.success) {
          const user = response.data.data.user;
          localStorage.setItem("user", JSON.stringify(user)); // Save user info
          localStorage.setItem("token", response.data.data.token); // Save token (optional)

          setFormData({
            name: "",
            email: "",
            password: "",
          });
        }
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "An error occurred"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  dark:bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center rounded-lg border-gray-500 gap-8 p-4 pl-8 pr-8 bg-white"
      >
        <div className="w-40">
          <img src="/buildUp.png" alt="" />
            {/* {isSignup ? "Signup" : "Signin"} */}
        </div>

        <div className="flex flex-col gap-4 p-4">
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name} // Bind value to formData
            onChange={handleChange}
            className="p-2 sm:w-[300px] outline-none border border-gray-500"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email} // Bind value to formData
          onChange={handleChange}
          className="p-2 sm:w-[300px] outline-none border border-gray-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password} // Bind value to formData
          onChange={handleChange}
          className="p-2 sm:w-[300px] outline-none border border-gray-500"
        />
        <button
          type="submit"
          className="p-2 w-full outline-none hover:bg-zinc-900 transition-all duration-300 delay-100 border hover:text-white border-gray-500"
        >
          {isSignup ? "Signup" : "Signin"}
        </button>
        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-sm text-blue-500 cursor-pointer mt-2"
        >
          {isSignup
            ? "Already have an account? Signin here"
            : "Don't have an account? Signup here"}
        </p>
        </div>
      
      </form>
    </div>
  );
};

export default Signup;