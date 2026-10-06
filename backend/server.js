
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Todo API is running");
});

app.post("/todos", (req, res) => {
    const { task } = req.body;

    const sql = "INSERT INTO todos (task) VALUES (?)";

    db.query(sql, [task], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Task added successfully",
            id: result.insertId
        });
    });
});

app.get("/todos", (req, res) => {
    const sql = "SELECT * FROM todos";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM todos WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Task deleted successfully"
        });
    });
});

app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    const sql = "UPDATE todos SET completed = ? WHERE id = ?";

    db.query(sql, [completed, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Task updated successfully"
        });
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});