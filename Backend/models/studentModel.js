
const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  PhoneNumber: {
    type: String,
    numeric: true,
    optional: true
  },
  Gender: {
    type: String,
    required: true,
    enum: ["Male","female","Other"]
  },
  Birthdate: {
    type: Date,
    optional: true
  },
}, { timestamps: true }); 

module.exports = mongoose.model('Students', StudentsSchema);
