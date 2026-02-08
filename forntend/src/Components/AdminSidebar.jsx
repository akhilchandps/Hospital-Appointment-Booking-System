import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // fetch logged in user
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/authCheck", {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
      }
    } catch (err) {
      console.log("Failed to fetch user", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-64 bg-[#1D293D] text-white min-h-screen p-6 flex flex-col justify-between">

      {/* Top Section */}
      <div>

        {/* Admin header */}
        <h1
          className="text-2xl font-bold mb-2 cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          Admin Panel
        </h1>

        {/* Logged user */}
        <p className="text-sm text-gray-300 mb-6">
          👤 Welcome {user?.name || "Loading..."}!
        </p>

        {/* Navigation buttons */}
        <button
          onClick={() => navigate("/admin")}
          className="w-full text-left p-3 mb-2 rounded hover:bg-indigo-700 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/admin/add-doctor")}
          className="w-full text-left p-3 mb-2 rounded hover:bg-indigo-700 transition"
        >
          Add Doctor
        </button>

        <button
          onClick={() => navigate("/admin/doctors")}
          className="w-full text-left p-3 mb-2 rounded hover:bg-indigo-700 transition"
        >
          View Doctors
        </button>

        <button
          onClick={() => navigate("/admin/appointments")}
          className="w-full text-left p-3 mb-2 rounded hover:bg-indigo-700 transition"
        >
          All Appointments
        </button>

      </div>

    </div>
  );
}

export default AdminSidebar;
