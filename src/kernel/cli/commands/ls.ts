import { Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
import { listCurrentDirectory } from "../../drivers/fs/FileSystem";
export default {
    name: "ls",
    aliases: ["list"],
    description: "Lists the file contents in the current directory.",
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        listCurrentDirectory(os);
    }
} as Command;