
import React from 'react'
import Delete from './components/Delete';
import Add from './components/Add';
import Update from './components/Update'; 

export default function app() {
 
return (
    
<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-center mb-8">Student Management System</h1>
    <div>
      <Add />
      <Update />
      <Delete />
    </div>
  </div>
  </div>   
  )
}