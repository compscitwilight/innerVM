import { Commands, Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";

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
} as Command;