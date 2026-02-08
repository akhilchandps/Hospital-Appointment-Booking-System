import React from "react";
import { useNavigate } from "react-router-dom";

function PatientSidebar({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-indigo-600 text-white min-h-screen p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <h1
          className="text-2xl font-bold mb-8 cursor-pointer"
          onClick={() => navigate("/patient")}
        >
          Patient Panel
        </h1>

        <button
          onClick={() => navigate("/patient")}
          className="w-full text-left p-3 mb-2 rounded hover:bg-indigo-700 transition"
        >
          🏠 Dashboard
        </button>

        <button
          onClick={() => navigate("/patient/my-appointments")}
          className="w-full text-left p-3 mb-2 rounded hover:bg-indigo-700 transition"
        >
          📅 My Appointments
        </button>
      </div>

      {/* Logout Section */}
      <button
        onClick={onLogout}
        className="w-full text-left p-3 rounded bg-red-500 hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default PatientSidebar;
