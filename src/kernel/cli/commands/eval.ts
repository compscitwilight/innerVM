import { CPUProcess } from "../../../../hardware/CPU";
import { Command } from "../Commands";
import { evaluate } from "../CommandLine";
import { createFile } from "../../drivers/fs/FileSystem";
export default {
    name: "eval",
    description: "Evaluates an expression given.",
    args: [
        {
            name: "...expression",
            description: "Expression",
            required: true
        }
    ],
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        const expression = args.slice(1).join(" ");
        const res = evaluate(expression);
        os.write(res);
        os.writeOut();
    }
} as Command;