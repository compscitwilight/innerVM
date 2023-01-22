import hardware from "../../hardware";
import { CPUProcess } from "../../hardware/CPU";

export function startBIOS() {
    hardware.CPU.killAllProcesses(); // prevents incompatbility (memory addresses) + nothing should be running in the first place;
    hardware.Memory.allocate(0x1, 100);
    hardware.CPU.executeProcess(0x1, (biosProcess: CPUProcess) => {
        function render() {
            console.clear();
            biosProcess.write("BIOS (v1.0)");
            //biosProcess.write(`Current time: ${hardware.Motherboard.getDate()}`)
            biosProcess.writeOut();
        }

        biosProcess.alias = "bios_firmware";
        
        function startLoop() {
            render();
            biosProcess.write("reloading bios..");
            hardware.CPU.timeout(5000, () => {
                startLoop();
            });
            biosProcess.writeOut();
        }

        startLoop();
    });
}