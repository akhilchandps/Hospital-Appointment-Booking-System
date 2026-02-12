import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { serverURL } from "../services/serverURL";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // YOUR ORIGINAL STATE - exact same
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // YOUR ORIGINAL FUNCTION - authCheck
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await fetch(`${serverURL}/auth/authCheck`, {
          credentials: "include",
        });

        const data = await res.json();
        res.ok ? setUser(data) : setUser(null);
      } catch {
        setUser(null);
      }
    };

    authCheck();
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // YOUR ORIGINAL FUNCTION - handleLogout
  const handleLogout = async () => {
    await fetch(`${serverURL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    toast.success("Logout successfully!");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="font-bold text-xl text-gray-800 hidden sm:block">MediCare</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              <button
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-teal-600 font-medium transition"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/about")}
                className="text-gray-700 hover:text-teal-600 font-medium transition"
              >
                About
              </button>
            </nav>

            {/* User Section */}
            {!user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-700 hover:text-teal-600 font-medium transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Create Account
                </button>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(user.name)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform ${menuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu - ONLY Dashboard and Sign Out */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded capitalize">
                        {user.role}
                      </span>
                    </div>

                    {/* Menu Items - ONLY Dashboard */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          if (user.role === "patient") navigate("/patient");
                          else if (user.role === "doctor") navigate("/doctor");
                          else if (user.role === "admin") navigate("/admin");
                          setMenuOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition flex items-center gap-3 text-gray-700"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-medium">Dashboard</span>
                      </button>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left hover:bg-red-50 transition flex items-center gap-3 text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Sign out</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            
            {/* Navigation Links */}
            <button
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/about");
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition font-medium"
            >
              About
            </button>


            <div className="border-t border-gray-200 pt-3 mt-3"></div>

            {!user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="w-full text-gray-700 hover:text-teal-600 py-2.5 rounded-lg font-medium transition text-left px-4"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg font-medium transition"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                {/* User Info */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>

                {/* Menu Items - ONLY Dashboard */}
                <button
                  onClick={() => {
                    if (user.role === "patient") navigate("/patient");
                    else if (user.role === "doctor") navigate("/doctor");
                    else if (user.role === "admin") navigate("/admin");
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium">Dashboard</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Sign out</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </header>
  );
}

export default Header;