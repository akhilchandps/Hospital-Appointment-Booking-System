import React, { useState } from "react";
import DoctorSidebar from "./DoctorSidebar";
import { serverURL } from "../services/serverURL";

function DoctorLayout({ children, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-40 h-16 flex items-center px-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg 
            className="w-6 h-6 text-gray-700" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        <h1 className="ml-4 text-lg font-bold text-gray-800">Doctor Panel</h1>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg z-30">
        <DoctorSidebar user={user} />
      </div>

      {/* Sidebar for Mobile - Slide in from left */}
      <div
        className={`
          lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <DoctorSidebar user={user} onClose={closeSidebar} />
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <div className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <main className="w-full">
          {children}
        </main>
      </div>

    </div>
  );
}

export default DoctorLayout;