import { Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
import { ConsoleStyle } from "../../../../util/ConsoleStyle";
import { Network, HTTPMethod } from "../../drivers/Network";
import { error, disposeCLI, executeCLI } from "../CommandLine";
export default {
    name: "http",
    description: "Command for accessing HTTP methods",
    args: [
        {
            name: "method",
            description: "The HTTP method that will be used when making the HTTP request",
            required: true
        },
        {
            name: "url",
            description: "The URL that will be requested.",
            required: true
        }
    ],
    execute: async (args: string[], cmd: string, os: CPUProcess) => {
        let method = args[1];
        let url = args[2];

        if (!method && !url) {
            let spaces = " ".repeat(20);
            os.write(`${spaces}HTTP (hypertext transfer protocol)${spaces}`, ConsoleStyle.BgYellow);
            os.write("HTTP command guide");
            os.write("http <requestType> <url>");
            os.write("http server <start> <port?>");
            os.writeOut();
            return;
        }

        if (!method) {
            error("Missing 'method' argument.");
            return;
        }

        if (!url) {
            error("Missing 'url' argument.");
            return;
        }

        method = method.toLowerCase();

        if (
            !url.startsWith("http") ||
            !url.startsWith("https")
            && !url.includes("://")
        )
            url = `https://${url}`;

        disposeCLI();
        try {
            
            let res = await Network.httpRequest((method as HTTPMethod), url);
            let stringified = JSON.stringify(res.data);
            os.write(stringified);
            os.write(`HTTP info: [${method.toUpperCase()}] ${url} -> [${res.status}] ${stringified.length} bytes`);
            os.writeOut();
            executeCLI(os);
        } catch {
            error("Invalid HTTP method. See 'http' for info.");
            executeCLI(os);
            return;
        }
    }
} as Command;