import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorSidebar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-[#1D293D] min-h-screen text-white p-4 flex flex-col justify-between">

      {/* Top Section */}
      <div>

        <h2 className="text-xl font-bold mb-2">
          Doctor Panel
        </h2>

        {/* Logged in doctor */}
        <p className="text-sm text-gray-300 mb-6">
          👤 Welocome {user?.name || "Doctor"}
        !</p>

        {/* Dashboard */}
        <button
          onClick={() => navigate("/doctor")}
          className="text-left w-full p-2 rounded hover:bg-gray-700 transition mb-2"
        >
          Dashboard
        </button>

        {/* Appointments */}
        <button
          onClick={() => navigate("/doctor/appointments")}
          className="text-left w-full p-2 rounded hover:bg-gray-700 transition mb-2"
        >
          My Appointments
        </button>

      </div>

      {/* Logout button (optional) */}
      {onLogout && (
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 p-2 rounded mt-4"
        >
          Logout
        </button>
      )}

    </div>
  );
}

export default DoctorSidebar;
