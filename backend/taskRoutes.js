import express from "express"
import connection from "./conn.js";
const route = express.Router()

route.post('/add', (req, res) => {
    const { name, description, due_date, status } = req.body;
    if (!name || !description || !due_date, !status) {
       const sql = "INSERT INTO tasks(name, description, due_date, status, created_at) VALUES(?, ?, ?, ?, ?)";
       connection.query(sql, [name, description, due_date,status, new Date()], (err) => {
            if (err) console.log("ERROR", err)
            console.log("Inserted successfully")
       });
    }

})

export default route