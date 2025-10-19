import express from "express"
import connection from "./conn.js";
const route = express.Router()

route.post('/add', (req, res) => {
    const { name, description, due_date, status } = req.body;
    if (!name || !description || !due_date, !status) {
       const sql = "INSERT INTO tasks(name, description, due_date, status, created_at) VALUES(?, ?, ?, ?, ?)";
       connection.query(sql, [name, description, due_date,status, new Date()], (err, result) => {
          if (err) {
            console.error(err, "Database error")
            return res.status(500).json("Database error");
          }
       });
    }

})

export default route