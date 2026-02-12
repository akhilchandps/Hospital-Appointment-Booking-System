import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { serverURL } from "../services/serverURL";
import { toast } from "react-toastify";

function DoctorSidebar({ user, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${serverURL}/auth/logout`, {
        credentials: "include"
      });
      navigate("/login");
      toast.success("Logout successfully!");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error(data.message || "failed");

    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: "/doctor",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: "Dashboard",
    },
    {
      path: "/doctor/appointments",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "My Appointments",
    },
    {
      path: "/doctor/profile",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "View Profile",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#1D293D]">

      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">MediCare</h2>
              <p className="text-gray-400 text-xs">Doctor Panel</p>
            </div>
          </div>

          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Welcome Message */}
      {user && (
        <div className="px-6 py-4 border-b border-gray-700">
          <p className="text-gray-400 text-sm">Welcome back,</p>
          <p className="text-white font-semibold">{user.name || "Doctor"} 👋</p>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive(item.path)
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-700">

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-lg bg-gray-800">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : "D"}
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{user.name || "Doctor"}</p>
              <p className="text-gray-400 text-xs">{user.email || "doctor@medicare.com"}</p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </div>

    </div>
  );
}

export default DoctorSidebar;