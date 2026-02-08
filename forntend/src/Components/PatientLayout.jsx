import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PatientLayout({ children, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Nav */}
      <nav className="bg-indigo-600 text-white flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/patient")}>
            Patient Panel
          </h1>
          <Link to="/patient" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/patient/my-appointments" className="hover:underline">
            My Appointments
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}

export default PatientLayout;
