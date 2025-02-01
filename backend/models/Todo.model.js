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
  { timestamps: true } // Auto-adds createdAt and updatedAt
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
