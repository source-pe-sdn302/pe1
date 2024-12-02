const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Department = mongoose.model("department", departmentSchema);
module.exports = Department;
