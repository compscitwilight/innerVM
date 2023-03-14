/**
 * InnerVM - A free and open-source virtual machine/subsystem where you are able to build
 * your own operating systems, and run them.
 * 
 * Copyright (C) 2023 - devrusty>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * Discord: https://discord.com/users/472530726613549066
 */

import Motherboard from "./hardware/Motherboard";
import Storage from "./hardware/Storage";
import CPU from "./hardware/CPU";
import Memory from "./hardware/Memory";
import { ConsoleStyle } from "./util/ConsoleStyle";
import { startBootloader } from "./src/bootloader";
//import packagejson from "package.json";

/**
 * This function will be invoked whenever the motherboard
 * is invoked. Add whatever code you'd like to be executed
 * on boot here.
 */
export function start() {
    startBootloader();
}

var bufferText = "InnerVM";

let clear = console.clear;
console.clear = () => {
    clear();
    if (Memory.getAll().has(0x00005))
        Memory.deallocate(0x00005)
    Memory.allocate(0x00005, 0);
    CPU.executeProcess(0x00005, (virtualMachineBuffer) => {
        console.log(bufferText);
        let spaces = " ".repeat(25);
        virtualMachineBuffer.write(`${spaces}${bufferText}${spaces}`, ConsoleStyle.BgMagenta);
        virtualMachineBuffer.writeOut();
    })
}

export function changeTopBuffer(txt: string) {
    bufferText = txt;
    console.clear();
}

console.clear();
//process.stdin.setRawMode(true);

console.log(`
InnerVM Copyright (C) 2023 - devrusty
This program comes with ABSOLUTELY NO WARRANTY;
This is free software, and you are welcome to redistribute it under certain conditions.
`);

let storageDevices = Storage.getStorageDevices();
let rootDevice = storageDevices[0];
rootDevice.write("inner.os", "This file is used to execute InnerOS.");
Motherboard.executeFirmware();