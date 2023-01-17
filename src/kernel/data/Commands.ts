import { CPUProcess } from "../../../hardware/CPU";
export interface CommandArgument {
    name: string,
    required: boolean,
    description?: string
}
export type CommandExecute = (args: string[], cmd: string, os: CPUProcess) => void;
export interface Command {
    name: string,
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
    }
];