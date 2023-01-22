import { CPUProcess } from "../../hardware/CPU";
import { executeCLI } from "./commandLine";
import hardware from "../../hardware";
import ACPI from "./drivers/ACPI";
import { ConsoleStyle } from "../../util/ConsoleStyle";

export function executeKernel(os: CPUProcess) {
    os.alias = "inneros_kernel";
    os.bg = ConsoleStyle.BgBlue;
    os.write("Welcome to the innerOS kernel (v1.0).");
    os.write("Use 'help' for a list of commands, use 'psa' for process analyse");
    os.writeOut();

    executeCLI(os);
}

export function panic(msg: string, address?: number) {
    hardware.Memory.allocate(0x000035, msg.length);
    console.log(`[panic] - ${msg}`);
    if (address)
        console.log(`@ ${address}`);
    ACPI.shutdown();
}