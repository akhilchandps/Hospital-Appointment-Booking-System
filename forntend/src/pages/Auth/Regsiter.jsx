import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const datas = await res.json();
      if (res.ok) {
        alert("User registered successfully");
        navigate("/login");
      } else {
        alert(datas.message);
      }
    } catch (err) {
      console.log(err);
      alert("Registration failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Left Side */}
        <div className="hidden md:flex w-1/2 bg-[#314158] items-center justify-center p-8">
          <h1 className="text-5xl font-bold text-white text-center">
            Join Us!
          </h1>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-700"
                onChange={e => setData({ ...data, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-700"
                onChange={e => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-700"
                onChange={e => setData({ ...data, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="bg-[#1D293D] hover:bg-[#1D293D] text-white py-2 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-gray-700">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#1D293D] font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;
