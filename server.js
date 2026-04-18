const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/taskDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const taskSchema = new mongoose.Schema({
    name: String
});

const Task = mongoose.model("Task", taskSchema);

// GET
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// POST
app.post("/tasks", async (req, res) => {
    const newTask = new Task({ name: req.body.name });
    await newTask.save();
    res.json(newTask);
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// Server run
app.listen(5000, () => console.log("Server running on port 5000"));