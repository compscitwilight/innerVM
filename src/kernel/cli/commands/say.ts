import { Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
export default {
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
} as Command;