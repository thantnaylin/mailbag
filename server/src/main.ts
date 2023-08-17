import express, {Express, Request, Response} from "express";
import path from "path";
import cors from "cors";
import * as SMTP from "./SMTP";
import { serverInfo } from "./ServerInfo";

const app: Express = express();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../client/dist")));
app.use(cors());

// Send Message
app.post("/messages", async (req: Request, res: Response) => {
    try {
        const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
        await smtpWorker.sendMessage(req.body);
        res.send("ok");
    } catch (e) {
        console.log(e);
        res.send("error");
    }
})

console.log(serverInfo);
