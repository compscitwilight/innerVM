/**
 * Manages the different machine instructions.
 */

import codes from "./data/machineCodes";

export function machineCodeExists(firstNum: number, code: number) {
    return codes[firstNum][code] !== undefined;
}

export function executeMachineInstruction(firstNum: number, code: number) {
    if (!machineCodeExists(firstNum, code)) return;
    let func = codes[firstNum][code];
    func();
}