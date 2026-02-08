import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all appointments
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:3000/appointments/admin", {
        credentials: "include",
      });

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch appointments");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Top header */}
        <div className="flex justify-between items-center mb-6">

          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold text-[#075F5A]">
            All Appointments
          </h1>

          <div></div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading appointments...
          </p>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md">

              <thead className="bg-[#1D293D] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Doctor</th>
                  <th className="py-3 px-4 text-left">Patient</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Time Slot</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((appt) => (
                    <tr key={appt._id} className="border-b hover:bg-gray-50">

                      <td className="py-3 px-4">
                        {appt.doctorId?.name || "-"}
                      </td>

                      <td className="py-3 px-4">
                        {appt.patientId?.name || "-"}
                      </td>

                      <td className="py-3 px-4">{appt.date}</td>

                      <td className="py-3 px-4">{appt.timeSlot}</td>

                      <td
                        className={`py-3 px-4 font-semibold ${
                          appt.status === "pending"
                            ? "text-yellow-500"
                            : appt.status === "accepted"
                            ? "text-green-600"
                            : appt.status === "cancelled"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {appt.status}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminAppointments;
