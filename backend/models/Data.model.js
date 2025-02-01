const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todoTitle: {
      type: String,
      required: true,
    },
    todoContent: {
      type: String,
    },
    todoDate: {
      type: Date,
      default: Date.now
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } 
);

const TodoModel = mongoose.model("Todoo", todoSchema);

module.exports = TodoModel;
