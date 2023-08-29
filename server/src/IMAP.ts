const ImapClient = require("emailjs-imap-client");
import { ParsedMail } from "mailparser";
import { simpleParser } from "mailparser";
import { IServerInfo } from "./ServerInfo";

export interface ICallOptions {
    mailbox: string,
    id?: number
}

export interface IMessage {
    id: string,
    date: string,
    from: string,
    subject: string,
    body?: string
}

export interface IMailbox {
    name: string,
    path: string
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export class Worker {
    private static serverInfo: IServerInfo;
    constructor(serverInfo: IServerInfo) {
        Worker.serverInfo = serverInfo;
    }

    private async connectToServer(): Promise<any> {
        const client = new ImapClient.default(
            Worker.serverInfo.imap.host,
            Worker.serverInfo.imap.port,
            { auth: Worker.serverInfo.imap.auth }
        );
        client.logLevel = client.LOG_LEVEL_NONE;
        client.onerror = (error: Error) => {
            console.log("IMAP.Worker.listMailboxes(): Connection error", error);
        }
        await client.connect();
        return client;
    }

    public async listMailboxes(): Promise<IMailbox[]> {
        const client: any = await this.connectToServer();
        const mailboxes: any = await client.listMailboxes();
        await client.close();
        const finalMailboxes: IMailbox[] = [];
        const iterateChildren: Function = (array: any[]): void => {
            array.forEach((value: any) => {
                finalMailboxes.push({
                    name: value.name, path: value.path
                });
                iterateChildren(value.children);
            });
        };
        iterateChildren(mailboxes.children);
        return finalMailboxes;
    }
}