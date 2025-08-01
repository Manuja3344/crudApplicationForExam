import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTrash2, FiCalendar, FiUser, FiHome, FiTool, FiLoader, FiAlertCircle } from 'react-icons/fi';

function Delete() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [studentsId, setStudentsId] = useState(null);


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

const deleteStudents = async (id) => {
    try {
      setStudentsId(id);
      alert('Are you sure you want to delete this student?');
      await axios.delete(`http://localhost:5001/api/students/${id}`);
      setStudents(students.filter((b) => b._id !== id));
    } catch (err) {
      console.error('Delete booking error:', err);
      setError('Failed to delete booking. Please try again.');
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
    <div><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Students List</h2>
        <p className="mt-2 text-lg text-gray-600">
          Manage your Students
        </p>
        <button className=''></button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center justify-center">
          <FiAlertCircle className="text-red-500 mr-2" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {students.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiCalendar className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
          <p className="mt-2 text-gray-500">
            You don't have any upcoming service appointments.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {students.map((students) => (
            <div
              key={students._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {students.FirstName || 'N/A'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      studunt email: {students.Email || 'N/A'}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    PhoneNumber: 
                    {students.PhoneNumber || 'N/A'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <FiUser className="flex-shrink-0 mt-1 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-gray-900">{students.FirstName} {students.LastName}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiHome className="flex-shrink-0 mt-1 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Birthdate</p>
                      <p className="text-gray-900">{students.Birthdate}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiHome className="flex-shrink-0 mt-1 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Gender</p>
                      <p className="text-gray-900">{students.Gender}</p>
                    </div>
                  </div>

                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => deleteStudents(students._id)}
                    disabled={studentsId === students._id}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {studentsId  === students._id ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Cancelling...
                      </>
                    ) : (
                      <>
                        <FiTrash2 className="mr-2" />
                        Cancel delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}</div>
    </div>
  );
}

export default Delete;