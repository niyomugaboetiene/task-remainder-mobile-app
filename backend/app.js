import express from "express"
import taskRoute from "./taskRoutes.js"

const app = express();

app.use('/task', taskRoute);

app.listen(300, () => {
    console.log("http://localhost:3000")
})