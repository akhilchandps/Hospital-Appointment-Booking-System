import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/AdminSidebar";


function AdminDashboard() {
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);

  const loadCounts = async () => {
    try {
      // Get doctors
      const docRes = await fetch("http://localhost:3000/doctors", {
        credentials: "include",
      });
      const doctors = await docRes.json();
      setDoctorCount(doctors.length);

      // Get appointments
      const apptRes = await fetch("http://localhost:3000/appointments/admin", {
        credentials: "include",
      });
      const appointments = await apptRes.json();
      setAppointmentCount(appointments.length);

      // Count unique patients
      const patients = new Set(appointments.map(a => a.patientId?._id));
      setPatientCount(patients.size);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await fetch("http://localhost:3000/auth/logout", { credentials: "include" });
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-100">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
            <h2 className="text-gray-500">Doctors</h2>
            <p className="text-3xl font-bold text-indigo-600">{doctorCount}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
            <h2 className="text-gray-500">Appointments</h2>
            <p className="text-3xl font-bold text-green-600">{appointmentCount}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
            <h2 className="text-gray-500">Patients</h2>
            <p className="text-3xl font-bold text-purple-600">{patientCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
