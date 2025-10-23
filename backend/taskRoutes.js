import express from "express";
import connection from "./conn.js";

const route = express.Router();

route.post('/sign-in', (req, res) => {
   const { username, email, password } = req.body;
   const sql = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
})
route.post('/add', (req, res) => {
  const { title, description, due_date, status } = req.body;

  if (!title || !description || !due_date || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO tasks(title, description, due_date, status, created_at)
    VALUES (?, ?, ?, ?, ?)
  `;

  const createdAt = new Date(); 

  connection.query(sql, [title, description, due_date, status, createdAt], (err, results) => {
    if (err) {
      console.log("ERROR", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("Inserted successfully");

    res.status(201).json({
      message: "Task added successfully",
      taskId: results.insertId
    });
  });
});

// * select all task in the database
route.get('/all', (req, res) => {
  const sql = "SELECT * FROM tasks";
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ result });
    }
  })
})

export default route;
