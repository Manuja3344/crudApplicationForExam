// src/pages/BookingDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTrash2, FiCalendar, FiUser, FiHome, FiTool, FiLoader, FiAlertCircle } from 'react-icons/fi';

export default function app() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [studentsId, setStudentsId] = useState(null);

  const [form, setForm] = useState({
    
      FirstName:"",
      LastName:"",
      Email:"",
      PhoneNumber:"",
      Gender:"",
      Birthdate:""
  });

  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'service_id') {
      const service = services.find(s => s._id === value);
      setSelectedService(service);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      await axios.post('http://localhost:5001/api/students', form);
      setMessage('Booking created successfully!');
  
      setForm(prev => ({
        customer_name: prev.customer_name,
        address: '',
        date_time: '',
        service_id: '',
        
      }));
      setSelectedService(null);
    
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
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

  const deleteStudents = async (id) => {
    try {
      setStudentsId(id);
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      {students.FirstName || 'Service'}
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
      )}
 
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Students Manage Service</h2>
          <p className="mt-2 text-lg text-gray-600">
            Fill out the form add your Students Manage Service
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
               
                <div className="sm:col-span-2">
                  <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={form.FirstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">
                    last Name
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={form.LastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>


                <div>
                  <label htmlFor="date_time" className="block text-sm font-medium text-gray-700">
                    Date 
                  </label>
                  <input
                    type="datetime-local"
                    id="date_time"
                    value={form.birthdate}
                    onChange={handleChange}
                  
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    email
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={form.Email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="Gender"
                value={form.Gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a Gender</option>
                <option value="Male">male</option>
                <option value="Female">Female</option>
                <option value="Other">other</option>
              </select>
            </div>


             
              </div>

              {/* Status messages */}
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Add Students'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}