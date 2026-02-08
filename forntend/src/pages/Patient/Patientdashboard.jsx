import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientLayout from "../../Components/PatientLayout";

function PatientDashboard() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [booking, setBooking] = useState({
    doctorId: "",
    date: "",
    timeSlot: "",
  });

  // Fetch doctors
  const getDoctors = async () => {
    try {
      const res = await fetch("http://localhost:3000/doctors", { credentials: "include" });
      const data = await res.json();
      if (res.ok) setDoctors(data);
    } catch (err) {
      console.log("Failed to fetch doctors", err);
    }
  };

  // Fetch patient appointments
  const getAppointments = async () => {
    try {
      const res = await fetch("http://localhost:3000/appointments/myappo", { credentials: "include" });
      const data = await res.json();
      if (res.ok) setAppointments(data);
    } catch (err) {
      console.log("Failed to fetch appointments", err);
    }
  };

  useEffect(() => {
    getDoctors();
    getAppointments();
  }, []);

  // Book appointment
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Appointment booked ✅");
        setBooking({ doctorId: "", date: "", timeSlot: "" });
        getAppointments(); // Refresh appointments
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to book appointment");
    }
  };

  // Cancel appointment
  const cancelAppointment = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/appointments/${id}/delete`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("Appointment cancelled ✅");
        getAppointments();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to cancel appointment");
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("http://localhost:3000/auth/logout", { credentials: "include" });
    navigate("/login");
  };

  return (
      <div className="flex flex-col md:flex-row gap-6 mt-25 ">
        {/* Booking Form */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Book an Appointment</h2>
          <form onSubmit={handleBooking} className="flex flex-col gap-4">
            <select
              required
              value={booking.doctorId}
              onChange={(e) => setBooking({ ...booking, doctorId: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} — {doc.specialization}
                </option>
              ))}
            </select>

            <input
              type="date"
              required
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Time Slot (e.g., 10:00 AM)"
              required
              value={booking.timeSlot}
              onChange={(e) => setBooking({ ...booking, timeSlot: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition">
              Book Appointment
            </button>
          </form>
        </div>

        {/* My Appointments */}
        <div className="md:w-1/2 h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">My Appointments</h2>

          {appointments.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No appointments found.</p>
          ) : (
            <div className="grid md:grid-cols-1 gap-5">
              {appointments.map((appt) => (
                <div
                  key={appt._id}
                  className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold mb-2">👨‍⚕️ Dr. {appt.doctorId?.name}</h3>
                  <p className="text-gray-600">📅 Date: {appt.date}</p>
                  <p className="text-gray-600">⏰ Slot: {appt.timeSlot}</p>
                  <div className="mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${appt.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                        ${appt.status === "accepted" ? "bg-blue-100 text-blue-700" : ""}
                        ${appt.status === "completed" ? "bg-green-100 text-green-700" : ""}
                        ${appt.status === "cancelled" ? "bg-red-100 text-red-700" : ""}
                      `}
                    >
                      {appt.status}
                    </span>
                  </div>
                  {(appt.status === "pending" || appt.status === "accepted") && (
                    <button
                      onClick={() => cancelAppointment(appt._id)}
                      className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}

export default PatientDashboard;
