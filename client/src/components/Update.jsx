import React, { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import axios from 'axios';

function Update() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({}); 

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('http://localhost:5001/api/students');
      setStudents(res.data);
    } catch (err) {
      setError('Failed to fetch students. Please try again later.');
      console.error('Fetch students error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (id, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const updateStudent = async (id) => {
    try {
      const updatedData = editing[id];
      const res = await axios.put(`http://localhost:5001/api/students/${id}`, updatedData);
      setStudents((prev) =>
        prev.map((student) => (student._id === id ? res.data : student))
      );
      setEditing((prev) => {
        const newEditing = { ...prev };
        delete newEditing[id];
        return newEditing;
       
      });
    alert('Student updated successfully!');
    } catch (err) {
      console.error('Update student error:', err);
      setError('Failed to update student. Please try again.');
    }
  };

  useEffect(() => {
    fetchStudents();
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
    <div className="mt-8 px-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Update Students List</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {['First Name', 'Last Name', 'Email', 'Phone Number', 'Gender', 'Action'].map((head) => (
                <th key={head} className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const editData = editing[student._id] || student;

              return (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                    <input
                      type="text"
                      name="FirstName"
                      value={editData.FirstName}
                      onChange={(e) => handleEditChange(student._id, 'FirstName', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                    <input
                      type="text"
                      name="LastName"
                      value={editData.LastName}
                      onChange={(e) => handleEditChange(student._id, 'LastName', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                    <input
                      type="email"
                      name="Email"
                      value={editData.Email}
                      onChange={(e) => handleEditChange(student._id, 'Email', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                    <input
                      type="text"
                      name="PhoneNumber"
                      value={editData.PhoneNumber}
                      onChange={(e) => handleEditChange(student._id, 'PhoneNumber', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                    <select
                      name="Gender"
                      value={editData.Gender}
                      onChange={(e) => handleEditChange(student._id, 'Gender', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-blue-600">
                    <button
                      onClick={() => updateStudent(student._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Update;