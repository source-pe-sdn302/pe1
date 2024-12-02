const mongoose = require("mongoose");
const Department = require("./department.model");
const Job = require("./job.model");
const Employee = require("./employee.model");

const db = {};

// Define schema
db.Department = Department;
db.Job = Job;
db.Employee = Employee;

module.exports = db;
