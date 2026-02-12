import React, { useEffect, useState } from "react";
import DoctorLayout from "../../Components/Doctorlayout";
import { serverURL } from "../../services/serverURL";
import { toast } from "react-toastify";

function DoctorAppointments() {
  // ORIGINAL STATE - exact same as your code
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch user info for sidebar
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

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${serverURL}/appointments/doctor`, {
        credentials: "include",
      });
      const data = await res.json();
      setAppointments(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${serverURL}/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      const updated = await res.json();

      if (res.ok) {

        setAppointments(prev =>
          prev.map(appt =>
            appt._id === id ? updated : appt
          )
        );
      } else {
        alert(updated.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  // Helper functions for display
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
    <DoctorLayout user={user}>
      <div className="p-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your patient appointments and update their status</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="text-gray-500 mt-4">Loading appointments...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && appointments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-400">
              <svg className="mx-auto h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">No appointments yet</p>
              <p className="text-sm mt-1">You don't have any appointments scheduled</p>
            </div>
          </div>
        )}

        {/* Appointments Grid */}
        {!loading && appointments.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {appointments.map(appt => (
              <div
                key={appt._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                {/* Patient Info */}
                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${getAvatarColor(appt.patientId?.name)}`}>
                    {getInitials(appt.patientId?.name)}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-gray-800">
                      {appt.patientId?.name || "Unknown Patient"}
                    </h2>
                    <p className="text-sm text-gray-600">{appt.patientId?.email || "-"}</p>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Date:</span>
                    <span className="text-sm">{appt.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Time:</span>
                    <span className="text-sm">{appt.timeSlot}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Status:</span>
                    {appt.status === "pending" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}
                    {appt.status === "completed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Completed
                      </span>
                    )}
                    {appt.status === "cancelled" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Only show for pending */}
                {appt.status === "pending" && (
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => updateStatus(appt._id, "completed")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Complete
                    </button>

                    <button
                      onClick={() => updateStatus(appt._id, "cancelled")}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </DoctorLayout>
  );
}

export default DoctorAppointments;