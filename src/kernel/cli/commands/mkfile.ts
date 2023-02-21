import { Command } from "../Commands";
import { error } from "../CommandLine";
import { formatCharacters, RemovalMode, createFile, PermissionLevel } from "../../drivers/fs/FileSystem";
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

        let permissionLevel: string | PermissionLevel = args[2];
        if (permissionLevel && permissionLevel.includes("--pl=")) {
            let lvl = permissionLevel.split("=")[1];
            if (!lvl) return;
            lvl = lvl.toUpperCase();

            let key = (lvl as keyof PermissionLevel);
            if (!key) return;
            permissionLevel = (PermissionLevel[key]);
        }
        console.log(permissionLevel);
        createFile(
            path,
            (typeof permissionLevel !== "string") ? permissionLevel : PermissionLevel.NONE,
            "",
            Session.loadedStorageDevice
        );
        //OLD: Session.loadedStorageDevice.write(path);
        os.write(
            `Successfully created ${destination} at ${path}.`,
            ConsoleStyle.FgGreen
        );
        os.writeOut();
    }
} as Command;