import { CPUProcess } from "../../../hardware/CPU";
import ACPI from "./ACPI";
import { startProcessAnalyse } from "../app/ProcessAnalyse";
import { getDate } from "./Time";
import { listCurrentDirectory} from "../drivers/FileSystem";
import { Network } from "../drivers/Network";
import { ConsoleStyle } from "../../../util/ConsoleStyle";
import { error } from "../commandLine";
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
            ACPI.shutdown();
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
                    if (!directory) {
                        error("Directory is required");
                        return;
                    }
                    break;
                default:
                    os.write("Please use 'pckg' to see a list of the avaliable options for this command.", ConsoleStyle.FgRed);
                    os.writeOut();
            }
        }
    }
];

export function registerCommand(data: Command) {};