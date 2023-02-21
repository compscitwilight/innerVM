import { Commands, Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
import { ConsoleStyle } from "../../../../util/ConsoleStyle";

export default {
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
            const command = Commands.find((c) => c.name.toLowerCase() === name);
            let contextString = "";
            contextString += `${command.name} - ${command.description}`;
            if (command.args)
                for (var i = 0; i < command.args.length; i++) {
                    const arg = command.args[i];
                    contextString += ` <${(arg.required ? arg.name : `${arg.name}?`)}> ${arg.description || ""} |`;
                };

            os.write(contextString, ConsoleStyle.BgBlack);
            os.writeOut();
        })
    }
} as Command;