import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";

function Home() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Example: fetch current user info
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/authCheck", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUserRole(data.role); // "patient", "doctor", or "admin"
        }
      } catch (err) {
        console.log("Not logged in", err);
      }
    };
    fetchUser();
  }, []);

  const handleBookNow = () => {
    if (!userRole) {
      navigate("/login");
    } else if (userRole === "patient") {
      navigate("/patient");
    } else if (userRole === "doctor") {
      navigate("/doctor");
    } else if (userRole === "admin") {
      navigate("/admin");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center gap-6 w-full h-[700px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <h1
          className="relative text-white font-bold text-4xl md:text-5xl text-center px-4"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
        >
          Book Appointment With Trusted Doctors
        </h1>

        <p className="relative text-white text-lg mdl
:text-2xl italic text-center px-4">
          Your health, our priority
        </p>

        <button
          onClick={handleBookNow}
          className="relative bg-[#1D293D] hover:bg-[#0a796f] transition text-white px-6 py-3 rounded-md font-semibold shadow-lg"
        >
          Book Now
        </button>
      </div>

      {/* About Section */}
      <div className="w-full py-16 px-6 md:px-20 bg-gray-100 flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-700 mb-4">
            We connect you with top-rated doctors in your area, provide easy appointment scheduling, 
            and ensure your health is always in good hands.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Trusted and verified doctors</li>
            <li>Easy online booking</li>
            <li>24/7 support for patients</li>
            <li>Secure health data management</li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <img src={img2} alt="Doctors" className="w-full h-full object-cover rounded-4xl shadow-lg" />
        </div>
      </div>

      {/* Call-to-action Section */}
      <div className="w-full py-12 bg-[#314158] text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to book your appointment?</h2>
        <button
          onClick={handleBookNow}
          className="bg-white text-[#314158] px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
