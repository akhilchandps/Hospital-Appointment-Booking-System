import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Listen to route changes
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/authCheck", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUser(data);
        else setUser(null);
      } catch (err) {
        setUser(null);
      }
    };
    authCheck();
  }, [location]); 

  const handleLogout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  };

  return (
  <header className="bg-[#314158] text-white p-4 flex justify-between items-center">
    <h1
      className="font-bold text-lg cursor-pointer"
      onClick={() => navigate("/")}
    >
      Hospital App
    </h1>

    <div className="flex gap-4 items-center">
      {/* Not logged in → single button */}
      {!user && (
        <button
          onClick={() => navigate("/register")}
          className="bg-[#155DFC] px-4 py-1 font-light rounded hover:bg-[#51A2FF] transition"
        >
          Create Account
        </button>
      )}

      {/* Logged in */}
      {user && (
        <>
          <span className="text-gray-300">
            Hi, {user.name} ({user.role})
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </header>
  );
}

export default Header;