const express = require('express');
const router = express.Router();

const { createStudents,getStudents,updateStudents,deleteStudents  } = require('../controllers/StudentsController');

router.get('/', getStudents);
router.post('/', createStudents);
router.put('/:id', updateStudents);
router.delete('/:id', deleteStudents);


module.exports = router;