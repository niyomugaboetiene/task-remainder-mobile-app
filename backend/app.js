import express from "express"
import taskRoute from "./taskRoutes.js"

const app = express();
app.use(express.json());
app.use('/task', taskRoute);

app.listen(5000, () => {
    console.log("http://localhost:5000")
})