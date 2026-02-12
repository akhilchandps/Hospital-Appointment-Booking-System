import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import Regsiter from './pages/Auth/Regsiter'
import Patientdashboard from './pages/Patient/Patientdashboard'
import MyAppointments from './pages/Patient/MyAppointments'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import AdminDoctors from './pages/Admin/AdminDoctors'
import Header from './Components/Header'
import Home from './pages/Home'
import Doctordashboard from './pages/Doctor/Doctordashboard'
import AdminAppointments from './pages/Admin/AdminAppointments'
import ProtectedRoute from './Components/ProtectedRoute'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from './pages/About'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import UpdateAvailability from './pages/Doctor/Updateavailability'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='register' element={<Regsiter />} />
        <Route path='/about' element={<About />} />


        {/* doctor */}

        <Route path="/doctor" element={<ProtectedRoute requiredRole="doctor"><Doctordashboard /></ProtectedRoute>} />
        <Route path="/doctor/appointments" element={<ProtectedRoute requiredRole="doctor"><DoctorAppointments /></ProtectedRoute>} />
        <Route path="/doctor/profile" element={<ProtectedRoute requiredRole="doctor"><DoctorProfile /></ProtectedRoute>} />
        <Route path="/doctor/availability" element={<ProtectedRoute requiredRole="doctor"><UpdateAvailability /></ProtectedRoute>} />



        {/* patient */}

        <Route path="/patient" element={<ProtectedRoute requiredRole="patient"><Patientdashboard /></ProtectedRoute>} />
        <Route path="/patient/appointments" element={<ProtectedRoute requiredRole="patient"><MyAppointments /></ProtectedRoute>} />

        {/* //admin */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /> </ProtectedRoute>} />
        <Route path="/admin/add-doctor" element={<ProtectedRoute requiredRole="admin"><AddDoctor /></ProtectedRoute>} />
        <Route path="/admin/doctors" element={<ProtectedRoute requiredRole="admin"><AdminDoctors /></ProtectedRoute>} />
        <Route path="/admin/appointments" element={<ProtectedRoute requiredRole="admin"><AdminAppointments /></ProtectedRoute>} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  )
}

export default App
