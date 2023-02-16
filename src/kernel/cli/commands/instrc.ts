import { Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
export default {
    name: "instrc",
    description: "Performs a machine instruction provided by the user.",
    args: [
        {
            name: "instruction_code",
            required: true
        }
    ],
    execute: (args: string[], cmd: string, os: CPUProcess) => {}
} as Command;