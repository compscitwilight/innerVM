import { Command } from "../Commands";
import CPU, { CPUProcess } from "../../../../hardware/CPU";
import ACPI from "../../drivers/ACPI";
export default {
    name: "shutdown",
    description: "Shuts down the computer.",
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        let arg = args[1];
        let cancelled = false;
        if (!arg) {
            os.write("shutdown scheduled to happen in 10 seconds");
            os.writeOut();

            CPU.timeout(10000, () => {
                console.log(cancelled);
                if (cancelled) {
                    os.write("shutdown cancelled");
                    os.writeOut();   
                    return
                }
                ACPI.shutdown();
            })
            return;
        } else if (arg == "-c") {
            cancelled = true;
        } else if (arg == "-i") {
            os.write("instant shutdown initiated");
            os.writeOut();
            ACPI.shutdown();
        }
    }
} as Command;