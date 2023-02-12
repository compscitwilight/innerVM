import { CPUProcess } from "../../../hardware/CPU";
import ACPI from "../drivers/ACPI";
import { startProcessAnalyse } from "../app/ProcessAnalyse";
import { getDate } from "../drivers/Time";
import { listCurrentDirectory, changeDirectory, getCurrentDirectoryContents } from "../drivers/fs/FileSystem";
import { ConsoleStyle } from "../../../util/ConsoleStyle";
import { error } from "./CommandLine";
import { createPackage } from "../app/pckg";
import { loadDesktopEnviornment } from "../../innerde";

export interface CommandArgument {
    name: string,
    required: boolean,
    description?: string
}
export type CommandExecute = (args: string[], cmd: string, os: CPUProcess) => void;
export interface Command {
    name: string,
    aliases?: string[],
    description?: string,
    args?: CommandArgument[],
    execute: CommandExecute
}
export let Commands: Command[] = [
    {
        name: "help",
        description: "Returns a list of commands.",
        args: [
            {
                name: "command",
                required: false
            }
        ],
        execute: (args: string[], cmd: string, os: CPUProcess) => {
            let sorted = Commands.map((c) => c.name.toLowerCase()).sort();
            sorted.forEach((name) => {
                let command = Commands.find((c) => c.name.toLowerCase() === name);
                os.write(command.name);
                if (command.args)
                    for (var i = 0; i < command.args.length; i++) {
                        
                    };

                os.write(command.description)
                os.write();
                os.writeOut();
            })
        }
    },
    {
        name: "say",
        description: "Repeats whatever is inputed by the user.",
        args: [
            {
                name: "message",
                required: true
            }
        ],
        execute: (args: string[], cmd: string, os: CPUProcess) => {
            let msg = args;
            os.write(msg);
            os.writeOut();
        }
    },
    {
        name: "instrc",
        description: "Performs a machine instruction provided by the user.",
        args: [
            {
                name: "instruction_code",
                required: true
            }
        ],
        execute: (args: string[], cmd: string, os: CPUProcess) => {}
    },
    {
        name: "psa",
        description: "Executes Process Analyse",
        execute: (args: string[], cmd: string, os: CPUProcess) => {
            startProcessAnalyse(os);
        }
    },
    {
        name: "time",
        aliases: ["dt", "date"],
        description: "Returns the time.",
        execute: (args: string[], cmd: string, os: CPUProcess) => {
            let date = getDate();
            os.write(date);
            os.writeOut();
        }
    },
    {
        name: "shutdown",
        description: "Shuts down the computer.",
        execute: (args: string[], cmd: string, os: CPUProcess) => {
            let arg = args[1];
            let cancelled = false;
            if (!arg) {
                os.write("shutdown scheduled to happen in 10 seconds");
                os.writeOut();

                setTimeout(() => {
                    console.log(cancelled);
                    if (cancelled) {
                        os.write("shutdown cancelled");
                        os.writeOut();   
                        return
                    }
                    ACPI.shutdown();
                }, 10000);
                return;
            } else if (arg == "-c") {
                cancelled = true;
            } else if (arg == "-i") {
                os.write("instant shutdown initiated");
                os.writeOut();
                ACPI.shutdown();
            }
        }
    },
    {
        name: "ls",
        aliases: ["list"],
        description: "Lists the file contents in the current directory.",
        execute: (args: string[], cmd: string, os: CPUProcess) => {
            listCurrentDirectory(os);
        }
    },
    {
        name: "http",
        description: "Command for accessing HTTP methods",
        execute: (args: string[], cmd: string, os: CPUProcess) => {
            let option = args[1];
            switch (option) {
                case "":

                    break;
                default:
                    let spaces = " ".repeat(20);
                    os.write(`${spaces}HTTP (hypertext transfer protocol)${spaces}`, ConsoleStyle.BgYellow);
                    os.write("HTTP command quick-start");
                    os.write("http <requestType> <url>");
                    os.write("http server <start> <port?>");
                    os.writeOut();
                    break;
            }
        }
    },
    {
        name: "pckg",
        description: "Inner's package manager. Lets you install application and dependencies that run on your computer.",
        execute: (args: string[], cmd: string, os: CPUProcess) => {
            let action = args[1];
            if (!action) {
                let spaces = " ".repeat(30);
                os.write(`${spaces}pckg${spaces}`, ConsoleStyle.BgBlue);
                os.write("pckg new <directory> <name?> - Creates a new package with the contents of the provided directory.", ConsoleStyle.FgGreen);
                os.write("pckg remove <package> - Removes a package with the provided name.", ConsoleStyle.FgRed);
                os.write("pckg remote <url> - Downloads a package from the internet with the provided URL.", ConsoleStyle.FgGreen);
                os.writeOut();
                return;
            }
            
            switch (action.toLowerCase()) {
                case "new":
                    let directory = args[2];
                    let name = args[3];
                    if (!directory) {
                        error("Directory is required");
                        return;
                    }

                    if (!name) {
                        error("Name is required.");
                        return;
                    }

                    name = name.toLowerCase();

                    let path = `/pckg/${name}`;
                    createPackage(name);

                    os.write(`Created new package "${name}" in ${path}`, ConsoleStyle.FgGreen);
                    os.writeOut();
                    break;
                default:
                    os.write("Please use 'pckg' to see a list of the avaliable options for this command.", ConsoleStyle.FgRed);
                    os.writeOut();
            }
        }
    },
    {
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
    },
    {
        name: "ide",
        description: "Starts InnerDE (Inner Desktop Enviornment) server",
        execute: (args: string[], cmd: string, os: CPUProcess) => {
            loadDesktopEnviornment(os);
        }
    }
];

export function registerCommand(data: Command) {};