import Motherboard from "./hardware/Motherboard";
import Storage from "./hardware/Storage";
import CPU from "./hardware/CPU";
import Memory from "./hardware/Memory";
import { ConsoleStyle } from "./util/ConsoleStyle";
//import packagejson from "package.json";

let clear = console.clear;
console.clear = () => {
    clear();
    Memory.allocate(0x00005, 0);
    CPU.executeProcess(0x00005, (virtualMachineBuffer) => {
        let spaces = " ".repeat(25);
        virtualMachineBuffer.write(`${spaces}InnerVM${spaces}`, ConsoleStyle.BgMagenta);
        virtualMachineBuffer.writeOut();
    })
}

console.clear();
//process.stdin.setRawMode(true);

let BOOTLOADER = true;

let processArgs = process.argv;
if (processArgs.includes("--no-bootloader"))
    BOOTLOADER = false;

let storageDevices = Storage.getStorageDevices();
let rootDevice = storageDevices[0];
rootDevice.write("inner.os", "This file is used to execute InnerOS.");
Motherboard.executeFirmware(BOOTLOADER);