import { CPUProcess } from "../../../hardware/CPU";
import { startProcessAnaylse } from "../drivers/ProcessAnaylse";
import { getDate } from "../drivers/Time";
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
    }
];