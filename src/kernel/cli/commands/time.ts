import { Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
import { getDate } from "../../drivers/Time";
export default {
    name: "time",
    aliases: ["dt", "date"],
    description: "Returns the time.",
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        let date = getDate();
        os.write(date);
        os.writeOut();
    }
} as Command;