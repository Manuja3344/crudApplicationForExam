import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Add() {

const [form, setForm] = useState({ 
  FirstName: "",
  LastName: "",
  Email: "",
  PhoneNumber: "",
  Gender: "",
  Birthdate:"" });
const [error, setError] = useState('');


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/students', form);
      alert('Student added successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student. Please try again later.');
      
    }
  };

  return (
    <div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Students</h2>
            <form  className="space-y-4">
              <input
                type="text"
                name="FirstName"
                placeholder="FirstName"
                value={form.FirstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="LastName"
                placeholder="LastName"
                value={form.LastName}
                onChange={handleChange }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="Email"
                placeholder="Email"
                value={form.Email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="PhoneNumber"
                placeholder="PhoneNumber"
                value={form.PhoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="Birthdate"
                placeholder="Birthdate"
                value={form.Birthdate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
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
                <option value="">Select a category</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">other</option>
              </select>
            </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add students
              </button>
            </form>
              </div>
          
        </div>
        </div>
    </div>
  )}

export default Add