import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const datas = await res.json();
      console.log(datas);

      if (res.ok) {
        alert(datas.message);

        const role = datas.role;
        if (role === "admin") navigate("/admin");
        else if (role === "doctor") navigate("/doctor");
        else if (role === "patient") navigate("/patient");

      } else {
        alert(datas.message);
      }
    } catch (err) {
      console.log(err);
      alert("Login failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Login Container */}
      <div className="flex w-full max-w-4xl md:h-[400px] bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 bg-[#314158] items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center px-4">
            Hello Welcome !
          </h1>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
              Login
            </button>
          </form>
                   {/* Login Link */}
          <p className="mt-4 text-center text-gray-700">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#1D293D] font-semibold cursor-pointer hover:underline"
            >
              Regsiter
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
