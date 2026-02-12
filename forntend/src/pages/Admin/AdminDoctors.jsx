import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../../Components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/serverURL";



function AdminDoctors() {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ORIGINAL FUNCTIONALITY - getDoctors
  const getDoctors = async () => {
    try {
      const res = await fetch(`${serverURL}/doctors`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setDoctors(data);
      } else {
        toast.error("Failed to fetch doctors");
      }

    } catch (err) {
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getAvatarColor = (name) => {
    if (!name) return "bg-gray-300 text-gray-700";
    const colors = [
      "bg-teal-500 text-white",
      "bg-cyan-100 text-cyan-700",
      "bg-pink-100 text-pink-600",
      "bg-purple-100 text-purple-700",
      "bg-green-100 text-green-700",
      "bg-blue-100 text-blue-700",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <AdminLayout>

      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Doctor/Nurse</h1>

          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2">
            <span>+</span>
            <span>Add Doctor / Nurse</span>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="text-gray-500 mt-4">Loading doctors...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && doctors.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-400">
              <svg className="mx-auto h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium">No doctors found</p>
              <p className="text-sm mt-1">Get started by adding your first doctor or nurse</p>
            </div>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 relative"
              >

                {/* Three Dots Menu */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold ${getAvatarColor(doc.name)}`}>
                    {getInitials(doc.name)}
                  </div>
                </div>

                {/* Name */}
                <h2 className="text-center text-lg font-bold text-gray-800 mb-2">
                  {doc.name}
                </h2>

                {/* Specialization Badge */}
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-600 text-white">
                    Doctor
                  </span>
                </div>

                      {/* Card Body */}
                <div className="p-6">
                  
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    
                    {doc.qualification && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-blue-600 font-medium mb-1">Qualification</p>
                        <p className="text-sm text-gray-800 font-semibold truncate">{doc.qualification}</p>
                      </div>
                    )}

                    {doc.experience && (
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs text-purple-600 font-medium mb-1">Experience</p>
                        <p className="text-sm text-gray-800 font-semibold">{doc.experience} years</p>
                      </div>
                    )}

                    {doc.consultationFee && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs text-green-600 font-medium mb-1">Consultation Fee</p>
                        <p className="text-sm text-gray-800 font-semibold">₹{doc.consultationFee}</p>
                      </div>
                    )}

                    {doc.city && (
                      <div className="bg-orange-50 rounded-lg p-3">
                        <p className="text-xs text-orange-600 font-medium mb-1">City</p>
                        <p className="text-sm text-gray-800 font-semibold truncate">{doc.city}</p>
                      </div>
                    )}

                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    
                    {doc.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm text-gray-800 font-medium">{doc.phone}</p>
                        </div>
                      </div>
                    )}

                    {doc.userId?.email && (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm text-gray-800 font-medium truncate">{doc.userId?.email}</p>
                        </div>
                      </div>
                    )}

                    {doc.address && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm text-gray-800 font-medium">{doc.address}</p>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Availability Badge */}
                  {doc.availability?.days?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Availability</p>
                      <div className="flex flex-wrap gap-1">
                        {doc.availability.days.slice(0, 3).map(day => (
                          <span key={day} className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                            {day.substring(0, 3)}
                          </span>
                        ))}
                        {doc.availability.days.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            +{doc.availability.days.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                </div>


            

              </div>
            ))}

          </div>
        )}

      </div>

    </AdminLayout>
  );
}

export default AdminDoctors;