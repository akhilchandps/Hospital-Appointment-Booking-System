import React, { useEffect, useState } from "react";
import DoctorSidebar from "../../Components/DoctorSidebar";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctor's appointments
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:3000/appointments/doctor", {
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
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:3000/appointments/${id}/status`,
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
      alert("Failed to update status");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DoctorSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#075F5A]">
          My Appointments
        </h1>

        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {appointments.map(appt => (
              <div
                key={appt._id}
                className="bg-white p-4 rounded-lg shadow flex flex-col gap-3"
              >
                <h2 className="font-semibold text-lg text-[#075F5A]">
                  Patient: {appt.patientId?.name || "Unknown"}
                </h2>

                <p>Email: {appt.patientId?.email || "-"}</p>
                <p>Date: {appt.date}</p>
                <p>Time: {appt.timeSlot}</p>

                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      appt.status === "pending"
                        ? "text-yellow-500"
                        : appt.status === "completed"
                        ? "text-green-600"
                        : appt.status === "cancelled"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {appt.status}
                  </span>
                </p>

                {appt.status === "pending" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateStatus(appt._id, "completed")
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(appt._id, "cancelled")
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointments;
