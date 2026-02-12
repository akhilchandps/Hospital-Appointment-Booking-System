import React, { useEffect, useState } from "react";
import DoctorLayout from "../../Components/Doctorlayout";
import { serverURL } from "../../services/serverURL";

function DoctorProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
      
      if (res.ok) {
        setProfile(data);
      } else {
        alert("Failed to load profile");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DoctorLayout user={user}>
        <div className="p-6 flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="text-gray-500 mt-4">Loading profile...</p>
          </div>
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout user={user}>
      <div className="p-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">View your professional information</p>
        </div>

        <div className="max-w-4xl">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
            
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profile?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{profile?.name}</h2>
                <p className="text-gray-600">{profile?.specialization}</p>
                <p className="text-sm text-gray-500 mt-1">{profile?.email}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
                <p className="text-gray-800 font-medium">{profile?.phone || "Not provided"}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Qualification</p>
                <p className="text-gray-800 font-medium">{profile?.qualification || "Not provided"}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Experience</p>
                <p className="text-gray-800 font-medium">
                  {profile?.experience ? `${profile.experience} years` : "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Consultation Fee</p>
                <p className="text-gray-800 font-medium">
                  {profile?.consultationFee ? `${profile.consultationFee}` : "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Hospital</p>
                <p className="text-gray-800 font-medium">{profile?.hospitalName || "Not provided"}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">City</p>
                <p className="text-gray-800 font-medium">{profile?.city || "Not provided"}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                <p className="text-gray-800 font-medium">{profile?.address || "Not provided"}</p>
              </div>

            </div>
          </div>

          {/* Availability Card */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Availability</h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-3">Available Days</p>
                <div className="flex flex-wrap gap-2">
                  {profile?.availability?.days?.length > 0 ? (
                    profile.availability.days.map(day => (
                      <span key={day} className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">
                        {day}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No days set</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-3">Time Slots</p>
                <div className="flex flex-wrap gap-2">
                  {profile?.availability?.timeSlots?.length > 0 ? (
                    profile.availability.timeSlots.map(slot => (
                      <span key={slot} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {slot}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No time slots set</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DoctorLayout>
  );
}

export default DoctorProfile;