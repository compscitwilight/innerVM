/**
 * Source code for Process Anaylse, the built-in system monitor for innerOS.
 */

import hardware from "../../../hardware";
import { CPUProcess } from "../../../hardware/CPU";

export let processMap = new Map<number, string>();

export function getProcesses() {
    let processes = hardware.CPU.getProcesses();

}

export function recordProcess(address: number, name: string) {
    processMap.set(address, name);
}

export function removeProcess(address: number) {
    processMap.delete(address);
}

export function startProcessAnaylse(os: CPUProcess) {
    os.write("Starting Process Anaylse...");
    os.writeOut();

    hardware.Memory.allocate(0x001040, 100);
    let processAnaylse = hardware.CPU.executeProcess(0x001040, () => {
        
    });
    let maxMem = hardware.Memory.maxMemory;
    let usedMem = hardware.Memory.getTotalAllocated();

    os.write("========================");
    os.write(`MEM:[${usedMem}/${maxMem}]`);
    
    os.writeOut();
}