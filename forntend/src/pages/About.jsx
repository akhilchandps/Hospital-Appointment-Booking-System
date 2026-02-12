import React from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MediCare</h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Your trusted partner in healthcare, connecting patients with the best doctors for over a decade
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Our Mission */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize healthcare accessibility by connecting patients with qualified healthcare professionals through our innovative digital platform. We strive to make quality healthcare available to everyone, anywhere, anytime.
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the leading healthcare platform that empowers patients with seamless access to world-class medical services, while supporting healthcare providers with cutting-edge technology and tools.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600">Making healthcare accessible to thousands</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">500+</div>
              <p className="text-gray-600 font-medium">Qualified Doctors</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">10K+</div>
              <p className="text-gray-600 font-medium">Happy Patients</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">50K+</div>
              <p className="text-gray-600 font-medium">Appointments</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">24/7</div>
              <p className="text-gray-600 font-medium">Support Available</p>
            </div>

          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Founded in 2014, MediCare began with a simple yet powerful idea: to bridge the gap between patients and healthcare providers through technology. What started as a small team of passionate individuals has grown into a comprehensive healthcare platform serving thousands of patients daily.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                We recognized that finding the right doctor and booking appointments was often a frustrating and time-consuming process. Our founders, having experienced these challenges firsthand, set out to create a solution that would make healthcare more accessible, efficient, and patient-centered.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Today, MediCare is proud to be at the forefront of digital healthcare innovation, partnering with hundreds of qualified doctors and serving thousands of patients across multiple cities. Our commitment to quality, accessibility, and patient satisfaction remains stronger than ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Value 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Trust & Integrity</h3>
              <p className="text-gray-600">
                We maintain the highest standards of trust and integrity in all our interactions, ensuring patient safety and data security.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Patient-Centered Care</h3>
              <p className="text-gray-600">
                Every decision we make prioritizes the well-being and satisfaction of our patients, putting their needs first.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously embrace new technologies and ideas to improve healthcare delivery and patient experience.
              </p>
            </div>

            {/* Value 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We believe quality healthcare should be accessible to everyone, regardless of their location or background.
              </p>
            </div>

            {/* Value 5 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the doctors we partner with to the service we provide.
              </p>
            </div>

            {/* Value 6 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Compassion</h3>
              <p className="text-gray-600">
                We approach every patient interaction with empathy, understanding, and genuine care for their well-being.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Thousands of Satisfied Patients
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Experience the future of healthcare with MediCare. Book your appointment today.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 shadow-xl"
          >
            Get Started Now
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

export default About;