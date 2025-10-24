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
      return res.status(201).json({ message: "Created Successfully" });
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
          return res.status(404).json({error: "User not fund"})
         }
           const hashedPassword = result[0].password;
           if (bcrypt.compareSync(password, hashedPassword)) {
            req.session.user_id = result[0].user_id,
            req.session.username = result[0].username
            return res.status(200).json({
              message: 'Login successfully',
              name: req.session.username
            })
           } else {
            return res.status(401).json({error: "Incorrect password"})
           }
   })
})

route.get('/loggedIn', (req, res) => {
  if (req.session.user_id) {
    return res.status(200).json({ user: req.session.username });
  } else {
    return res.status(401).json({error: 'Not logged in'})
  }
});
route.post('/add', (req, res) => {
  const userId = req.session.user_id
  const { title, description, due_date, status } = req.body;

  if (!title || !description || !due_date || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO tasks(title, description, due_date, status, created_at, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const createdAt = new Date(); 

  connection.query(sql, [title, description, due_date, status, createdAt, userId], (err, results) => {
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
  const sql = "SELECT * FROM tasks WHERE user_id = ?";
  connection.query(sql, [req.session.user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ results: result });
    }
  })
})

route.get('/pending', (req, res) => {
  const sqlPending = "SELECT COUNT(*) AS pending_count FROM tasks WHERE status = 'pending' AND user_id = ?";

  connection.query(sqlPending, [req.session.user_id], (err, resultPending) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ pending: resultPending[0].pending_count });
  });

})

route.get('/completed', (req, res) => {
  const sqlCompleted = "SELECT COUNT(*) FROM tasks WHERE status=='completed' AND user_id = ?" ;

  connection.query(sqlCompleted, [req.session.user_id], (err, resultCompleted) => {
     if (err) return res.status(500).json({ error: err.message });
     return res.status(200).json({ completed: resultCompleted });
  });


})

route.get('/total', (req, res) => {
  const TotalTasks = "SELECT COUNT(*) FROM tasks WHERE WHERE user_id = ?";

  connection.query(TotalTasks, [req.session.user_id], (err, totalResult) => {
     if (err) return res.status(500).json({ error: err.message });
     return res.status(200).json({ completed: totalResult });
  });

})






  
export default route;
