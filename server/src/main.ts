import express, {Express, NextFunction, Response} from "express";
import path from "path";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../client/dist")));
app.use(cors());
