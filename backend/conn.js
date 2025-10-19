import mysql from "mysql2"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task-remainder-app'
})

connection.connect((err) => {
    if (err) console.log("ERROR:", err)
    console.log("Connected successfully");    
});

export default connection;