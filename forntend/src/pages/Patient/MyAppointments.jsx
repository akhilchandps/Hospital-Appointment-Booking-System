import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import { serverURL } from "../../services/serverURL";
import { toast } from "react-toastify";

function MyAppointments() {
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("active"); // "active" or "cancelled"
  const [loading, setLoading] = useState(true);

  // Fetch patient appointments
  const getAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${serverURL}/appointments/myappo`, { 
        credentials: "include" 
      });
      const data = await res.json();
      if (res.ok) setAppointments(data);
    } catch (err) {
      console.log("Failed to fetch appointments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // Cancel appointment
  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const res = await fetch(`${serverURL}/appointments/${id}/delete`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Appointment cancelled");
        await getAppointments();
      } else {
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to cancel appointment");
    }
  };

  // Filter appointments based on active tab
  const activeAppointments = appointments.filter(
    appt => appt.status === "pending" || appt.status === "accepted" || appt.status === "completed"
  );

  const cancelledAppointments = appointments.filter(
    appt => appt.status === "cancelled"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/patient")}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage all your appointments</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("active")}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === "active"
                    ? "border-b-2 border-teal-600 text-teal-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Active Appointments</span>
                  <span className="ml-2 px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full">
                    {activeAppointments.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("cancelled")}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === "cancelled"
                    ? "border-b-2 border-teal-600 text-teal-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Cancelled History</span>
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                    {cancelledAppointments.length}
                  </span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="text-gray-500 mt-4">Loading appointments...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            
            {/* Active Appointments Tab */}
            {activeTab === "active" && (
              <div>
                {activeAppointments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="mx-auto h-16 w-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium mb-2">No active appointments</p>
                    <button
                      onClick={() => navigate("/patient")}
                      className="text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Book an appointment now
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {activeAppointments.map((appt) => (
                      <div
                        key={appt._id}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                              <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">
                                Dr. {appt.doctorId?.name}
                              </h3>
                              <p className="text-sm text-gray-500">{appt.doctorId?.specialization}</p>
                            </div>
                          </div>
                          
                          {/* Status Badge */}
                          <span
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold
                              ${appt.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                              ${appt.status === "accepted" ? "bg-blue-100 text-blue-700" : ""}
                              ${appt.status === "completed" ? "bg-green-100 text-green-700" : ""}
                            `}
                          >
                            {appt.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{appt.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">{appt.timeSlot}</span>
                          </div>
                        </div>

                        {/* Show cancel button only for pending or accepted */}
                        {(appt.status === "pending" || appt.status === "accepted") && (
                          <button
                            onClick={() => cancelAppointment(appt._id)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel Appointment
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Cancelled Appointments Tab */}
            {activeTab === "cancelled" && (
              <div>
                {cancelledAppointments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="mx-auto h-16 w-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-medium">No cancelled appointments</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {cancelledAppointments.map((appt) => (
                      <div
                        key={appt._id}
                        className="border border-red-200 rounded-lg p-5 bg-red-50"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                              <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">
                                Dr. {appt.doctorId?.name}
                              </h3>
                              <p className="text-sm text-gray-500">{appt.doctorId?.specialization}</p>
                            </div>
                          </div>
                          
                          {/* Status Badge */}
                          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            CANCELLED
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{appt.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">{appt.timeSlot}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyAppointments;