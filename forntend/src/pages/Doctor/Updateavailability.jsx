import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorLayout from "../../Components/Doctorlayout";
import { serverURL } from "../../services/serverURL";
import { toast } from "react-toastify";

function UpdateAvailability() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [availability, setAvailability] = useState({
    days: [],
    timeSlots: []
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const defaultTimeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const fetchUser = async () => {
    try {
      const res = await fetch(`${serverURL}/auth/authCheck`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAvailability = async () => {
    try {
      const res = await fetch(`${serverURL}/doctors/profile/me`, {
        credentials: "include",
      });
      const data = await res.json();
      
      if (res.ok && data.availability) {
        setAvailability({
          days: data.availability.days || [],
          timeSlots: data.availability.timeSlots || []
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchAvailability();
  }, []);

  // Toggle day selection
  const handleDayToggle = (day) => {
    if (availability.days.includes(day)) {
      setAvailability({
        ...availability,
        days: availability.days.filter(d => d !== day)
      });
    } else {
      setAvailability({
        ...availability,
        days: [...availability.days, day]
      });
    }
  };

  // Toggle time slot selection
  const handleTimeSlotToggle = (slot) => {
    if (availability.timeSlots.includes(slot)) {
      setAvailability({
        ...availability,
        timeSlots: availability.timeSlots.filter(s => s !== slot)
      });
    } else {
      setAvailability({
        ...availability,
        timeSlots: [...availability.timeSlots, slot]
      });
    }
  };

  // Select all days
  const selectAllDays = () => {
    setAvailability({ ...availability, days: [...daysOfWeek] });
  };

  // Select weekdays only
  const selectWeekdays = () => {
    setAvailability({ 
      ...availability, 
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] 
    });
  };

  // Clear all days
  const clearAllDays = () => {
    setAvailability({ ...availability, days: [] });
  };

  // Select all time slots
  const selectAllTimeSlots = () => {
    setAvailability({ ...availability, timeSlots: [...defaultTimeSlots] });
  };

  // Clear all time slots
  const clearAllTimeSlots = () => {
    setAvailability({ ...availability, timeSlots: [] });
  };

  // Save availability - Update doctor profile with new availability
  const handleSave = async () => {
    if (availability.days.length === 0) {
      alert("Please select at least one day");
      return;
    }

    if (availability.timeSlots.length === 0) {
      alert("Please select at least one time slot");
      return;
    }

    setSaving(true);

    try {
      // Update the doctor document with new availability
      const res = await fetch(`${serverURL}/doctors/profile/me`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Availability updated successfully!");
        navigate("/doctor");
      } else {
        toast.error(data.message || "Failed to update availability");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DoctorLayout user={user}>
        <div className="p-6 flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="text-gray-500 mt-4">Loading...</p>
          </div>
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout user={user}>
      <div className="p-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Update Availability</h1>
          <p className="text-gray-600">Set your available days and time slots for appointments</p>
        </div>

        <div className="max-w-5xl bg-white rounded-xl shadow-sm p-8">
          
          {/* Available Days Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Available Days</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectWeekdays}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  Weekdays
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={selectAllDays}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  All Days
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={clearAllDays}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    availability.days.includes(day)
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Selected: {availability.days.length} day{availability.days.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Time Slots Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Time Slots</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAllTimeSlots}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Select All
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={clearAllTimeSlots}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {defaultTimeSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleTimeSlotToggle(slot)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    availability.timeSlots.includes(slot)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Selected: {availability.timeSlots.length} slot{availability.timeSlots.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Preview Section */}
          {(availability.days.length > 0 || availability.timeSlots.length > 0) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-sm font-semibold text-blue-800 mb-3">Preview</h3>
              
              {availability.days.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-blue-700 mb-1">Available Days:</p>
                  <p className="text-sm text-blue-900">{availability.days.join(", ")}</p>
                </div>
              )}

              {availability.timeSlots.length > 0 && (
                <div>
                  <p className="text-xs text-blue-700 mb-1">Time Slots:</p>
                  <p className="text-sm text-blue-900">{availability.timeSlots.join(", ")}</p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/doctor")}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || availability.days.length === 0 || availability.timeSlots.length === 0}
              className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Availability
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </DoctorLayout>
  );
}

export default UpdateAvailability;