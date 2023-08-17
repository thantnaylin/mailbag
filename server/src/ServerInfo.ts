import path from "path";
import fs from "fs";

export interface IServerDetails {
    host: string,
    port: number,
    auth: IServerAuth
}

export interface IServerAuth {
    user: string,
    password: string
}

export interface IServerInfo {
    smtp: IServerDetails,
    imap: IServerDetails
}

export let serverInfo: IServerInfo;

const rawInfo: string = fs.readFileSync(path.join(__dirname, "../serverInfo.json")).toString();
serverInfo = JSON.parse(rawInfo);

