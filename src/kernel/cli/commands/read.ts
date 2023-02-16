import { Command } from "../Commands";
import { error } from "../CommandLine";
import { Session } from "../../data/session";
import { CPUProcess } from "../../../../hardware/CPU";
import { ConsoleStyle } from "../../../../util/ConsoleStyle";
export default {
    name: "read",
    aliases: ["cat"],
    args: [
        {
            name: "file",
            description: "File that will be read.",
            required: true
        }
    ],
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        const file = args[1];
        if (!file) {
            error("Missing 'file' argument.");
            return;
        }

        if (!Session.loadedStorageDevice.contains(file)) {
            error("File doesn't exist.");
            return
        }

        const cd = Session.getCurrentDirectory() == "/"
        ? ""
        : Session.getCurrentDirectory();
        const path = cd + file;
        os.write(
            "read - " + file,
            [ ConsoleStyle.BgBlack, ConsoleStyle.Bright ]
        );
        os.write(Session.loadedStorageDevice.read(path));
        os.writeOut();
    }
} as Command;