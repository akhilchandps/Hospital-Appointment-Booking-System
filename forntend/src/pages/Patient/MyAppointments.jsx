import React, { useState, useEffect } from "react";

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        const res = await fetch(
            "http://localhost:3000/appointments/myappo",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data = await res.json();
        console.log(data);


        if (res.ok) {
            setAppointments(data);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const cancelAppointment = async (id) => {

        const res = await fetch(
            `http://localhost:3000/appointments/${id}/delete`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        const data = await res.json();


        if (res.ok) {
            alert("Cancelled");
            getAppointments();
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    My Appointments
                </h1>

                {appointments.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        No appointments found
                    </div>
                ) : (

                    <div className="grid md:grid-cols-2 gap-5">

                        {appointments.map((appt) => (

                            <div
                                key={appt._id}
                                className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
                            >

                                <h2 className="text-lg font-semibold mb-2">
                                    👨‍⚕️ Dr. {appt.doctorId?.name}
                                </h2>

                                <p className="text-gray-600">
                                    📅 Date: {appt.date}
                                </p>

                                <p className="text-gray-600">
                                    ⏰ Slot: {appt.timeSlot}
                                </p>

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
                                {appt.status === "pending" ||
                                    appt.status === "accepted"
                                    ? (
                                        <button
                                            onClick={() => cancelAppointment(appt._id)}
                                            className="bg-red-500 text-white p-1 rounded mt-2"
                                        >
                                            Cancel
                                        </button>
                                    )
                                    : null}
                            </div>

                        ))}

                    </div>

                )}

            </div>
        </div>
    );
}

export default MyAppointments;
