import React from 'react'
import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import axios from 'axios';

function Update() {
const [students, setStudents] = useState([]);
const [error, setError] = useState('');
const [studentsId, setStudentsId] = useState(null);
const [loading, setLoading] = useState(true);
const [form, setForm] = useState({ 
  FirstName: "",
  LastName: "",
  Email: "",
  PhoneNumber: "",
  Gender: "",
  Birthdate:"" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('http://localhost:5001/api/students');
      setStudents(res.data);
    } catch (err) {
      setError('Failed to fetch students. Please try again later.');
      console.error('Fetch bookings error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStudents = async (id, updatedData) => {
    try {
      setStudentsId(id);
      const res = await axios.put(`http://localhost:5001/api/students/${id}`, updatedData);
      setStudents(students.map((b) => (b._id === id ? res.data : b)));
    } catch (err) {
      console.error('Update booking error:', err);
      setError('Failed to update booking. Please try again.');
    } finally {
      setStudentsId(null);
    }
  };

  useEffect(() => {
      fetchStudents ();
    }, []);
      if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <FiLoader className="animate-spin text-3xl text-blue-600 mb-4" />
          <p className="text-lg text-gray-600">Loading your Students...</p>
        </div>
      );
    }

  return (
    <div><div className="tabel-responsive mt-8">
        <h1 className="text-2xl font-semibold mb-4 text-center"> Update Students List</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">  
                Gender  
                </th>
            </tr>
              </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                  <input
                    type="text"
                    name="FisrtName"
                    placeholder="FisrtName"
                    value={student.FirstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                  <input
                    type="text"
                    name="FisrtName"
                    placeholder="FisrtName"
                    value={student.LastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                  <input
                    type="text"
                    name="FisrtName"
                    placeholder="FisrtName"
                    value={student.Email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                  <input
                    type="text"
                    name="FisrtName"
                    placeholder="FisrtName"
                    value={student.PhoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900"> 
                  <select
                    name="UpdateGender"
                    value={student.Gender}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">other</option>
                  </select>
                </td>
                </tr>
                ))}
           </tbody>
           </table>
           </div>

    </div>
    
  )
}

export default Update