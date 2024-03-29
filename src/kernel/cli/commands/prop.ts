import { CPUProcess } from "../../../../hardware/CPU";
import { Command } from "../Commands";
import { error } from "../CommandLine";
import { getFileObject } from "../../drivers/fs/FileSystem";
import { FileProperties } from "../../drivers/fs/File";
//import { Session } from "../../data/session";
export default {
    name: "prop",
    description: "Allows the user to view and change file properties.",
    args: [
        {
            name: "file",
            description: "Path to the file or directory.",
            required: true
        },
        {
            name: "action",
            description: "The action that will be performed.",
            required: true
        },
        {
            name: "property",
            description: "The file property.",
            required: true
        },
        {
            name: "value",
            description: "Value to set the file property.",
            required: false
        }
    ],
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        const file = args[1];
        const action = args[2];
        const property = args[3];
        if (!file) {
            error("Missing 'file' argument.");
            return;
        }

        if (!action) {
            error("Missing 'action' argument.");
            return;
        }

        if (!property) {
            error("Missing 'property' argument.");
            return;
        }

        const fileObject = getFileObject(file);
        if (!fileObject) {
            error(`File "${file}" doesn't exist.`);
            return;
        }

        if (!Object.keys(fileObject.properties).includes(property)) {
            error("Invalid property.");
            return;
        }

        switch (action.toLowerCase()) {
            case "read":
                const val = fileObject.getProperty(property as keyof FileProperties);
                os.write(val);
                os.writeOut();
                break;
            case "":

                break;

            default:
                error("Invalid prop action.");
                break;
        }
    }
} as Command;