import React, { useEffect, useState } from "react";
import AdminLayout from "../../Components/AdminLayout";
import { serverURL } from "../../services/serverURL";


function AdminDashboard() {
  // ORIGINAL STATE - exact same as your code
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);

  // ORIGINAL FUNCTIONALITY - loadCounts
  const loadCounts = async () => {
    try {
      // Get doctors
      const docRes = await fetch(`${serverURL}/doctors`, {
        credentials: "include",
      });
      const doctors = await docRes.json();
      setDoctorCount(doctors.length);

      // Get appointments
      const apptRes = await fetch(`${serverURL}/appointments/admin`, {
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

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your hospital today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Total Doctors */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Doctors</p>
                <p className="text-3xl font-bold text-gray-800">{doctorCount}</p>
                <p className="text-xs text-gray-500 mt-1">Active physicians</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-800">{appointmentCount}</p>
                <p className="text-xs text-gray-500 mt-1">All scheduled visits</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Patients */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Patients</p>
                <p className="text-3xl font-bold text-gray-800">{patientCount}</p>
                <p className="text-xs text-gray-500 mt-1">Unique patients</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;