import express from "express"
import cors from "cors"
import  dotenv  from "dotenv";
dotenv.config();
import taskRoute from "./taskRoutes.js"

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use('/', taskRoute);
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})