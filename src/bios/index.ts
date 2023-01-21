import hardware from "../../hardware";
import { CPUProcess } from "../../hardware/CPU";

export function startBIOS() {
    hardware.CPU.killAllProcesses(); // prevents incompatbility (memory addresses) + nothing should be running in the first place;
    hardware.Memory.allocate(0x1, 100);
    hardware.CPU.executeProcess(0x1, (biosProcess: CPUProcess) => {
        biosProcess.alias = "bios_firmware";
        biosProcess = biosProcess;
        biosProcess.write("inner BIOS (v1.0)");
        biosProcess.writeOut();
    });
}