const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  issues: [
    {
      title: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      isCompleted: Boolean,
    },
  ],
  startDate: Date,
  endDate: Date,
});

const Job = mongoose.model("job", jobSchema);
module.exports = Job;
