import { CPUProcess } from "../../../../hardware/CPU";
import { Command } from "../Commands";
import { error } from "../CommandLine";
import { Session } from "../../data/session";
import { getFileObject } from "../../drivers/fs/FileSystem";
import { ConsoleStyle } from "../../../../util/ConsoleStyle";
export default {
    name: "append",
    description: "Adds content to a file.",
    args: [
        {
            name: "file",
            description: "The file.",
            required: true
        },
        {
            name: "content",
            description: "The content that will be appended to the file.",
            required: true
        }
    ],
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        const file = args[1];
        const content = args[2];

        if (!file) {
            error("Missing 'file' argument.");
            return;
        }

        if (!content) {
            error("Missing 'content' argument.");
            return;
        }

        const fileObj = getFileObject(file);
        if (!fileObj) {
            error("Invalid file.");
            return;
        }

        fileObj.appendTo(content);
        
        os.write(`Wrote `);
        os.writeLL(`(+${content.length} bytes)`, ConsoleStyle.FgGreen);
        os.write(` to ${file}.`);
        os.writeOut();
    }
} as Command;