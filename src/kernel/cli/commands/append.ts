import { CPUProcess } from "../../../../hardware/CPU";
import { Command } from "../Commands";
import { error } from "../CommandLine";
import { Session } from "../../data/session";
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
    }
} as Command;