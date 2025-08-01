const express = require('express');
const cors = require('cors');
const app = express();
const studentsRoutes = require('./routers/StudentsRoutes');

app.use(cors());
app.use(express.json());

app.use("/api/students", studentsRoutes);


module.exports = app;