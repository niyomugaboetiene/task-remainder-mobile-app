import express from "express"
import cors from "cors"
import  dotenv  from "dotenv";
import session from "express-session";
dotenv.config();
import taskRoute from "./taskRoutes.js"

const app = express();
app.use(express.json());

app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 } // only one hr
}));
app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}))
app.use('/', taskRoute);
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})