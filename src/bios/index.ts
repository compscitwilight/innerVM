/**
 * (C) Copyright 2023 - Devrusty
 * This file is under the GNU General Public License.
 * 
 * This file is responsible for handling the BIOS (Basic Input/Ouput System) used in InnerVM.
 * Whenever the program is launched, the user will be prompted to press F12 to enter the BIOS from
 * the motherboard (/hardware/Motherboard.ts). This will then execute the firmware (BIOS).
 * 
 * The BIOS is responsible for basic low-level functions, such as managing CPU clockspeed,
 * memory, power settings, and the boot drive.
 */

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