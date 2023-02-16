import { Command } from "../Commands";
import { error } from "../CommandLine";
import { CPUProcess } from "../../../../hardware/CPU";
import { getCurrentDirectoryContents, changeDirectory } from "../../drivers/fs/FileSystem";
export default {
    name: "cd",
    description: "Changes the directory.",
    args: [
        {
            name: "directory",
            required: true
        }
    ],
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        let directory = args[1];
        if (!directory) {
            error("Directory parameter is required.");
            return;
        }

        let currentDir = getCurrentDirectoryContents();
        for (var i = 0; i < currentDir.length; i++) {
            let file = currentDir[i];
            if (file.includes("/"))
                file.replace("/", "");
        }
        
        if (!currentDir.includes(directory) && directory !== "/") {
            error(`Invalid directory. "${directory}"`);
            return;
        }

        changeDirectory(directory);
    }
} as Command;