import { Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
import { getCurrentDirectoryContents } from "../../drivers/fs/FileSystem";
import { Session } from "../../data/session";
import { ConsoleStyle } from "../../../../util/ConsoleStyle";
export default {
    name: "ls",
    aliases: ["list"],
    description: "Lists the file contents in the current directory.",
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        let directory = Session.getCurrentDirectory();
        let directoryContents = getCurrentDirectoryContents();
    
        let spaces = " ".repeat(2);
        os.write(`Contents for ${directory}`);
        directoryContents.forEach((dir) => {
            os.write((spaces + dir + spaces), ConsoleStyle.BgBlue);
        })
        os.writeOut();
    }
} as Command;