import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import { serverURL } from "../../services/serverURL";
import { toast } from "react-toastify";

function PatientDashboard() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [booking, setBooking] = useState({
    doctorId: "",
    date: "",
    timeSlot: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch doctors
  const getDoctors = async () => {
    try {
      const res = await fetch(`${serverURL}/doctors`, { credentials: "include" });
      const data = await res.json();
      if (res.ok) setDoctors(data);
    } catch (err) {
      console.log("Failed to fetch doctors", err);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // Handle doctor selection
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    setBooking({ ...booking, doctorId, timeSlot: "" });

    if (doctorId) {
      const doctor = doctors.find(d => d._id === doctorId);
      setSelectedDoctor(doctor);
    } else {
      setSelectedDoctor(null);
    }
  };

  // Book appointment
  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${serverURL}/appointments`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Appointment booked successfully!");

        // Reset form
        setBooking({ doctorId: "", date: "", timeSlot: "" });
        setSelectedDoctor(null);

        // Navigate to appointments page
        navigate("/patient/appointments");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book an Appointment</h1>
          <p className="text-gray-600">Schedule your visit with our specialists</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate("/patient/appointments")}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">My Appointments</p>
              <p className="text-xs text-gray-500">View all appointments</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/patient/profile")}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">My Profile</p>
              <p className="text-xs text-gray-500">View profile</p>
            </div>
          </button>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleBooking} className="space-y-6">

            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <select
                  required
                  value={booking.doctorId}
                  onChange={handleDoctorChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition appearance-none bg-white"
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} — {doc.specialization}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Availability Display */}
            {selectedDoctor && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-3">Doctor Availability</h3>

                {/* Available Days */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-blue-700 mb-2">Available Days:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor.availability?.days?.length > 0 ? (
                      selectedDoctor.availability.days.map(day => (
                        <span key={day} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {day}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-blue-600">Not specified</span>
                    )}
                  </div>
                </div>

                {/* Available Time Slots */}
                <div>
                  <p className="text-xs font-medium text-blue-700 mb-2">Available Time Slots:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedDoctor.availability?.timeSlots?.length > 0 ? (
                      selectedDoctor.availability.timeSlots.map(slot => (
                        <span key={slot} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {slot}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-blue-600">Not specified</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="date"
                  required
                  value={booking.date}
                  onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Time Slot Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <select
                  required
                  value={booking.timeSlot}
                  onChange={(e) => setBooking({ ...booking, timeSlot: e.target.value })}
                  disabled={!selectedDoctor}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select Time Slot</option>
                  {selectedDoctor?.availability?.timeSlots?.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {!selectedDoctor && (
                <p className="text-xs text-gray-500 mt-1">Please select a doctor first</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Booking...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Book Appointment
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default PatientDashboard;