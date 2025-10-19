import express from "express"
import connection from "./conn";
const route = express.Router()

route.post('/add', (req, res) => {
    const { name, description, due_date, status } = req.body;
    const sql = "INSERT INTO tasks(name, description, due_date, status, created_at) VALUES(?, ?, ?, ?, ?)";
    connection.query(sql, [name, description, due_date,status, Date.now()], (err) => {
        if (err) console.log("ERROR", err)
        console.log("Inserted successfully")
    });
})