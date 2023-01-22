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

export function startProcessAnalyse(os: CPUProcess) {
    os.write("Starting Process Anaylse...");
    os.writeOut();

    hardware.Memory.allocate(0x001040, 100);
    hardware.CPU.executeProcess(0x001040, (PSA: CPUProcess) => {
        PSA.alias = "process_analyse";

        let maxMem = hardware.Memory.maxMemory;
        let usedMem = hardware.Memory.getTotalAllocated();
    
        PSA.write("========================");
        PSA.write(`MEM:[${usedMem}/${maxMem}]`);
        PSA.write("========================");
    
        let processes = hardware.CPU.getProcesses();
        processes.forEach((p) => {
            let percentage = (p.getMemoryFootprint() / hardware.Memory.maxMemory) * 100;
            let msg = `>= ${p.address.toString(16)} (${p.alias || "unknown"}) - (${percentage}% memory) - (${p.getMemoryFootprint()} bytes)`
            PSA.write(msg);
        }) 
        
        PSA.writeOut();
    });

}