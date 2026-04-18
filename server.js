const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Atlas connect (FIXED with DB name)
mongoose.connect("mongodb+srv://admin:12345@cluster0.2u6p4yy.mongodb.net/taskDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const taskSchema = new mongoose.Schema({
    name: String
});

const Task = mongoose.model("Task", taskSchema);

// GET - fetch tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - add task
app.post("/tasks", async (req, res) => {
    try {
        const newTask = new Task({ name: req.body.name });
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - remove task
app.delete("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Server run
app.listen(5000, () => console.log("Server running on port 5000"));