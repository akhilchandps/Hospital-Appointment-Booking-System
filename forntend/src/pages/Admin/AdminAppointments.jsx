import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../Components/AdminLayout";
import { toast } from "react-toastify";
import { serverURL } from "../../services/serverURL";


function AdminAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all appointments - ORIGINAL FUNCTIONALITY
  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${serverURL}/appointments/admin`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setAppointments(data);
      } else {
        toast.error("Failed to load appointments");
      }

    } catch (err) {
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const totalAppointments = appointments.length;
  const visitedCount = appointments.filter(a =>   a.status === "accepted" || a.status === "completed").length;
  const waitingCount = appointments.filter(a => a.status === "pending").length;
  const canceledCount = appointments.filter(a => a.status === "cancelled").length;

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name) => {
    if (!name) return "bg-gray-300";
    const colors = [
      "bg-teal-100 text-teal-700",
      "bg-orange-100 text-orange-700",
      "bg-purple-100 text-purple-700",
      "bg-pink-100 text-pink-700",
      "bg-blue-100 text-blue-700",
      "bg-green-100 text-green-700",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <AdminLayout>
      <div className="p-6">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Appointment List</h1>
              <div className="flex flex-wrap gap-4 md:gap-6 mt-2 text-sm text-gray-600">
                <span>TODAY'S TOTAL <span className="font-semibold">({totalAppointments})</span></span>
                <span className="text-gray-400 hidden md:inline">|</span>
                <span>VISITED <span className="font-semibold">({visitedCount})</span></span>
                <span className="text-gray-400 hidden md:inline">|</span>
                <span>WAITING <span className="font-semibold">({waitingCount})</span></span>
                <span className="text-gray-400 hidden md:inline">|</span>
                <span>CANCELED <span className="font-semibold">({canceledCount})</span></span>
              </div>
            </div>

            <button
              onClick={() => navigate("/admin/add-doctor")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 whitespace-nowrap self-start md:self-auto"
            >
              <span>+</span>
              <span>Add Appointment</span>
            </button>
          </div>


        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="text-gray-500 mt-4">Loading appointments...</p>
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                
                <thead className="bg-gray-50">
                  <tr>
                 
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Department
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Serial No
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                      Date
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Created By
                    </th>
                    <th className="px-4 md:px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-12">
                        <div className="text-gray-400">
                          <svg className="mx-auto h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <p className="text-lg font-medium">No appointments found</p>
                          <p className="text-sm mt-1">Get started by creating your first appointment</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appt, index) => (
                      <tr key={appt._id} className="hover:bg-gray-50 transition">
                        
                  
                        {/* Patient */}
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${getAvatarColor(appt.patientId?.name)}`}>
                              {getInitials(appt.patientId?.name)}
                            </div>
                            <span className="font-medium text-gray-900">
                              {appt.patientId?.name || "-"}
                            </span>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="px-4 md:px-6 py-4 text-gray-700 hidden lg:table-cell">
                          {appt.doctorId?.specialty || "General"}
                        </td>

                        {/* Doctor */}
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                              {appt.doctorId?.avatar ? (
                                <img src={appt.doctorId.avatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs font-semibold text-gray-600">
                                  {getInitials(appt.doctorId?.name)}
                                </span>
                              )}
                            </div>
                            <span className="text-gray-700">
                              {appt.doctorId?.name || "-"}
                            </span>
                          </div>
                        </td>

                        {/* Serial No */}
                        <td className="px-4 md:px-6 py-4 text-gray-700 hidden md:table-cell">
                          {String(index + 1).padStart(2, '0')}
                        </td>

                        {/* Date */}
                        <td className="px-4 md:px-6 py-4 text-gray-700 hidden sm:table-cell">
                          {appt.date}
                        </td>

                        {/* Status */}
                        <td className="px-4 md:px-6 py-4">
                          {appt.status === "pending" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                              Waiting
                            </span>
                          )}
                          {(appt.status === "accepted" || appt.status === "completed") && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                              Visited
                            </span>
                          )}
                          {appt.status === "cancelled" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                              Canceled
                            </span>
                          )}
                        </td>

                        {/* Created By */}
                        <td className="px-4 md:px-6 py-4 text-gray-700 hidden lg:table-cell">
                          Admin
                        </td>

                        {/* Actions */}
                        <td className="px-4 md:px-6 py-4">
                          <button className="text-gray-400 hover:text-gray-600 transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                            </svg>
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

export default AdminAppointments;