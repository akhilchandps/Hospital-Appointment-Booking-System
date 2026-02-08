import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../src/images/doctor.png";

function AdminDoctors() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDoctors = async () => {
    try {
      const res = await fetch("http://localhost:3000/doctors", {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setDoctors(data);
      }
    } catch (err) {
      console.log("Failed to fetch doctors", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">

          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold text-[#075F5A]">
            Doctors List
          </h1>

          {/* empty spacer for alignment */}
          <div></div>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading doctors...
          </p>
        )}

        {/* Empty */}
        {!loading && doctors.length === 0 && (
          <p className="text-center text-gray-500">
            No doctors found
          </p>
        )}

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 text-center lg:grid-cols-3 gap-6">

          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <img src={img} alt="" className="w-50 mx-auto mb-3" />

              <h2 className="text-xl font-semibold text-[#075F5A] mb-2">
                {doc.name}
              </h2>

              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {doc.specialization}
              </span>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default AdminDoctors;
