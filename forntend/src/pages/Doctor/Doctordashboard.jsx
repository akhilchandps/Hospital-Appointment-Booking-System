import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorSidebar from "../../Components/DoctorSidebar";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Fetch logged-in user info
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/authCheck", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setUser(data);
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  // Fetch doctor's appointments (for summary boxes)
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:3000/appointments/doctor", {
        credentials: "include",
      });
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchAppointments();
  }, []);


  // Calculate total patients (unique)
  const totalPatients = [...new Set(appointments.map(a => a.patientId?._id))].length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DoctorSidebar user={user} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#075F5A]">
          Doctor Dashboard
        </h1>

        {/* Summary Boxes */}
        <div className="flex gap-6 mb-6">
          <div className="flex-1 bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-600">Total Appointments</h2>
            <p className="text-3xl font-bold mt-2 text-[#075F5A]">{appointments.length}</p>
          </div>

          <div className="flex-1 bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-600">Total Patients</h2>
            <p className="text-3xl font-bold mt-2 text-[#075F5A]">{totalPatients}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DoctorDashboard;
