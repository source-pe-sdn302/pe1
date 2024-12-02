const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
    middleName: String,
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
  },
  account: {
    email: String,
    password: String,
  },
  dependents: [
    {
      fullname: String,
      relation: String,
    },
  ],
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
    },
  ],
});
const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;
