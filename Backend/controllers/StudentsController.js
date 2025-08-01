const Students = require('../models/studentModel');

exports.createStudents= async (req, res) => {
  const { FirstName, LastName, Email, PhoneNumber,Gender,Birthdate } = req.body;
  try {
    const students = await Students.create({
      FirstName,
      LastName,
      Email, 
      PhoneNumber,
      Gender,
      Birthdate 
    });
    res.status(201).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error creating students' });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Students.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
}
exports.updateStudents = async (req, res) => {
    try {
    const updated = await Students.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating Students' });
  }
};
exports.deleteStudents = async (req, res) => {
  try {
    await Students.findByIdAndDelete(req.params.id);
    res.json({ message: 'Students deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting Students' });
  }
};