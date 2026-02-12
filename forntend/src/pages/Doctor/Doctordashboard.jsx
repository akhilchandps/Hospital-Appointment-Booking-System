import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorLayout from "../../Components/Doctorlayout";
import { serverURL } from "../../services/serverURL";

function DoctorDashboard() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
  });
  const [profile, setProfile] = useState(null);

  // Fetch user info
  const fetchUser = async () => {
    try {
      const res = await fetch(`${serverURL}/auth/authCheck`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch doctor profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${serverURL}/doctors/profile/me`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setProfile(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch appointments stats
  const fetchStats = async () => {
    try {
      const res = await fetch(`${serverURL}/appointments/doctor`, {
        credentials: "include",
      });
      const data = await res.json();
      
      if (res.ok) {
        const total = data.length;
        const pending = data.filter(appt => appt.status === "pending").length;
        console.log(pending);
        
        const completed = data.filter(appt => appt.status === "completed").length;
        console.log(completed);
        
        
        setStats({
          totalAppointments: total,
          pendingAppointments: pending,
          completedAppointments: completed,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProfile();
    fetchStats();
  }, []);

  return (
    <DoctorLayout user={user}>
      <div className="p-6">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, Dr. {user?.name}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your appointments today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Total Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Appointments</p>
                <p className="text-3xl font-bold text-gray-800">{stats.pendingAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-800">{stats.completedAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{profile?.name}</h3>
                <p className="text-gray-600">{profile?.specialization}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{profile?.userId?.email}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/doctor/profile")}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              View Full Profile
            </button>
          </div>

          {/* Availability Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Availability</h3>

            <div className="space-y-4 mb-6">
              {/* Available Days */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Available Days</p>
                <div className="flex flex-wrap gap-2">
                  {profile?.availability?.days?.length > 0 ? (
                    profile.availability.days.slice(0, 3).map(day => (
                      <span key={day} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">
                        {day}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Not set</span>
                  )}
                  {profile?.availability?.days?.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                      +{profile.availability.days.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Available Time Slots */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Time Slots</p>
                <div className="flex flex-wrap gap-2">
                  {profile?.availability?.timeSlots?.length > 0 ? (
                    profile.availability.timeSlots.slice(0, 4).map(slot => (
                      <span key={slot} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {slot}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Not set</span>
                  )}
                  {profile?.availability?.timeSlots?.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      +{profile.availability.timeSlots.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/doctor/availability")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Manage Availability
            </button>
          </div>

        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <button
              onClick={() => navigate("/doctor/appointments")}
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition border border-gray-200"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">My Appointments</span>
            </button>

            <button
              onClick={() => navigate("/doctor/profile")}
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition border border-gray-200"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">View Profile</span>
            </button>

            <button
              onClick={() => navigate("/doctor/availability")}
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition border border-gray-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">Set Availability</span>
            </button>

          </div>
        </div>

      </div>
    </DoctorLayout>
  );
}

export default DoctorDashboard;