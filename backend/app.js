import express from "express"

const app = express();

app.route('/', (req, res) => {
  console.log("Server is running")  
})

app.listen(300, () => {
    console.log("http://localhost:3000")
})