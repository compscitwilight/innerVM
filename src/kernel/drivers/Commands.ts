import { CPUProcess } from "../../../hardware/CPU";
import ACPI from "./ACPI";
import { startProcessAnaylse } from "./ProcessAnaylse";
import { getDate } from "./Time";
import { listCurrentDirectory} from "../drivers/FileSystem";
import { Network } from "../drivers/Network";
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
        name: "say",
        description: "repeats whatever is inputed by the user.",
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
            startProcessAnaylse(os);
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
    }
];

export function registerCommand(data: Command) {};