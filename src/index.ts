import express, { Express } from "express";
import MainRouter from "./routers";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', MainRouter)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
