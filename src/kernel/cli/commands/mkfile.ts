import { Command } from "../Commands";
import { error } from "../CommandLine";
import { formatCharacters, RemovalMode } from "../../drivers/fs/FileSystem";
import { Session } from "../../data/session";
import { CPUProcess } from "../../../../hardware/CPU";
import { ConsoleStyle } from "../../../../util/ConsoleStyle";
export default {
    name: "mkfile",
    aliases: ["touch"],
    args: [
        {
            name: "destination",
            description: "The destination of the new file",
            required: true
        }
    ],
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        const destination = args[1];
        if (!destination) {
            error("Missing 'destination' argument.");
            return;
        }

        let cd = (Session.getCurrentDirectory() == "/")
            ? ""
            : Session.getCurrentDirectory();
        const path = formatCharacters(
            `${cd}${destination}`,
            RemovalMode.File
        );
        if (Session.loadedStorageDevice.contains(path)) {
            error(`A file with the same path already exists @ '${path}'`);
            return;
        }
        
        Session.loadedStorageDevice.write(path);
        os.write(
            `Successfully created ${destination} at ${path}.`,
            ConsoleStyle.FgGreen
        );
        os.writeOut();
    }
} as Command;