import express from "express";
import bcrypt from "bcrypt";
import connection from "./conn.js";

const route = express.Router();


route.post('/sign-in', async (req, res) => {
   const { full_name, username, email, password } = req.body;
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const sql = "INSERT INTO users(full_name, username, email, password) VALUES(?, ?, ?, ?)";
   connection.query(sql, [full_name, username, email, hashedPassword], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(201).json("Created successfully");
    }
   });
});

route.post('/sign-up', async (req, res) => {
   const { username, email, password } = req.body;
   const sql = "SELECT * FROM users WHERE username = ? OR email = ?";
   connection.query(sql, [username, email], (err, result) => {
         if (err) {
           return res.status(500).json({ error: err.message });
         } 
         if (result.length === 0) {
          return res.status(404).json("User not fund")
         }
         if (result.length > 0) {
           const hashedPassword = result[0].password;

           if (bcrypt.compareSync(password, hashedPassword)) {
            req.session.user_id = result[0].user_id,
            req.session.username = result[0].username
            return res.status(200).json("Login successfully", {name: req.secure.username})
           } else {
            return res.status(401).json("Incorrect password")
           }
         }
   })
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
