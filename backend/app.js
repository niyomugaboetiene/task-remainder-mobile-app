import express from "express"
import cors from "cors"
import taskRoute from "./taskRoutes.js"

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use('/task', taskRoute);

app.listen(5000, () => {
    console.log("http://localhost:5000")
})