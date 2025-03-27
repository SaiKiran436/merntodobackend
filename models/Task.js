const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  taskName: String,
  description: String,
  expectedTime: Number,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  actualTime: Number,
  timeDifference: Number,
});

module.exports = mongoose.model("Task", TaskSchema);
