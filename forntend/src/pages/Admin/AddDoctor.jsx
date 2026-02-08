import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



function AddDoctor() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        specialization: "",
        email: "",
        password: "",
    });

    console.log(form);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/doctors", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);


            if (res.ok) {
                alert("Doctor added successfully");

                setForm({
                    name: "",
                    specialization: "",
                    email: "",
                    password: "",
                });
                navigate("/admin");

            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Something went wrong");
        }
    };

    return (
  <div className="min-h-screen bg-gray-100 px-4">

    <div className="max-w-6xl mx-auto pt-6">
      <button
        onClick={() => navigate("/admin")}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        ← Back to Dashboard
      </button>
    </div>

    <div className="flex items-center justify-center mt-6">

      <form
        className="bg-white w-full max-w-lg p-6 rounded-xl shadow-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Add Doctor
        </h1>

        <input
          type="text"
          placeholder="Doctor Name"
          className="w-full py-3 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075F5A]"
          onChange={e => setForm({ ...form, name: e.target.value })}
          value={form.name}
          required
        />

        <input
          type="text"
          placeholder="Specialization"
          className="w-full py-3 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075F5A]"
          onChange={e => setForm({ ...form, specialization: e.target.value })}
          value={form.specialization}
          required
        />

        <input
          type="email"
          placeholder="Doctor Email"
          className="w-full py-3 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075F5A]"
          onChange={e => setForm({ ...form, email: e.target.value })}
          value={form.email}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full py-3 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075F5A]"
          onChange={e => setForm({ ...form, password: e.target.value })}
          value={form.password}
          required
        />

        <button className="bg-[#314158] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
          Add Doctor
        </button>

      </form>

    </div>
  </div>

    )
}

export default AddDoctor
