import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg"
import { serverURL } from "../services/serverURL";

function Home() {
  const navigate = useNavigate();
  
  // YOUR ORIGINAL STATE - exact same
  const [userRole, setUserRole] = useState(null);

  // YOUR ORIGINAL FUNCTION - exact same
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${serverURL}/auth/authCheck`, {
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

  // YOUR ORIGINAL FUNCTION - exact same
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
    <div className="w-full min-h-screen">
      <Header />

      {/* Hero Section - Enhanced Design */}
      <div className="relative">
        <div
          className="relative h-[600px] md:h-[700px] bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${img1})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Book Appointment With{" "}
                <span className="text-teal-400">Trusted Doctors</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
                Your health, our priority
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookNow}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Now
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/30 transition-all duration-300"
                >
                  Register
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">500+</p>
                  <p className="text-sm text-gray-300 mt-1">Doctors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">10k+</p>
                  <p className="text-sm text-gray-300 mt-1">Patients</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p className="text-sm text-gray-300 mt-1">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We connect you with top-rated doctors and provide the best healthcare experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Trusted Doctors</h3>
              <p className="text-gray-600">
                Trusted and verified doctors with proven expertise
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Easy online booking with instant confirmation
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                24/7 support for patients anytime you need
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Secure Data</h3>
              <p className="text-gray-600">
                Secure health data management and privacy
              </p>
            </div>

          </div>

          {/* About Section with Image */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              
              {/* Left Content */}
              <div className="p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Your Health Journey Starts Here
                </h2>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  We connect you with top-rated doctors in your area, provide easy appointment scheduling, 
                  and ensure your health is always in good hands.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Trusted and verified doctors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Easy online booking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">24/7 support for patients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Secure health data management</span>
                  </li>
                </ul>

                <button
                  onClick={handleBookNow}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 w-max"
                >
                  Get Started
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Right Image */}
              <div className="h-full min-h-[400px]">
                <img 
                  src={img2} 
                  alt="Doctors" 
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to book your appointment?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust us with their healthcare
          </p>
          <button
            onClick={handleBookNow}
            className="bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 shadow-xl"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 MediCare. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default Home;