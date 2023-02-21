/**
 * (C) Copyright 2023 - Devrusty
 * This file is under the GNU General Public License.
 * 
 * Cakeloder is an open-source bootloader. It is entirely modular, simple, and compatible
 * with all InnerOS operating systems.
 * 
 * To learn how to implement Cakeloader in your InnerOS project, please read
 * /docs/extensibility/writing-a-kernel/4 - Bootloaders.md
 */

import hardware from "../../hardware";
import { createInterface } from "readline";
import { StorageDevice } from "../../hardware/Storage";
import { CPUProcess } from "../../hardware/CPU";
import { executeKernel, panic } from "../kernel";
import { ConsoleStyle } from "../../util/ConsoleStyle";

// INNEROS SPECIFIC
// PLEASE REMOVE THIS LINE AND ALL OCCURENCES OF "Session" 
// IF YOU ARE IMPLEMENTING CAKELOADER IN YOUR OPERATING SYSTEM
import { Session } from "../kernel/data/session";

let input = createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * Executes the cakeLoader process.
 */
export function startBootloader() {
    console.log(hardware);
    hardware.Memory.allocate(0x2, 1000000);
    hardware.CPU.executeProcess(0x2, (bootloaderProcess: CPUProcess) => {
        bootloaderProcess.alias = "cakel";
        bootloaderProcess.write("=== :cakeL(oader): ===", ConsoleStyle.BgBlue);
        let bootDevices = hardware.Storage.getStorageDevices();
    
        /**
         * Lists the avaliable devices on the computer.
         */
        function listDevices() {
            if (bootDevices.length === 0) { 
                panic("No boot devices are avaliable, and therefore cakeLoader cannot be used.", 0x2);
                return;
            }
            bootloaderProcess.write("Select boot device");
            bootDevices.forEach((device, index) => {
                bootloaderProcess.write(
                    `${index}: |NAME:"${device.name}" (${device.getUsed()}/${device.maxCapacity} bytes)|`,
                    [ConsoleStyle.BgMagenta, ConsoleStyle.Underscore]
                );
            });
        
            bootloaderProcess.writeOut();
        }
    
        /**
         * Prompts the user for the device that they would like to boot into.
         */
        function getDevice() {
            input.question("device> ", (response: string) => {
                let index = Number(response);
                let device = bootDevices[index];
                if (!bootDevices[index]) {
                    bootloaderProcess.write("please select a valid device.");
                    bootloaderProcess.writeOut();
                    getDevice();
                    return;
                }

                if (!device)
                    device = bootDevices[0];
    
                bootloaderProcess.write("fetching storage device contents...");
                bootloaderProcess.writeOut();
    
                listOS(device);
                return;
            })
        }
    
        /**
         * Lists the operating system files (.os) in the storage device given.
         * @param device Storage device to search
         * @returns 
         */
        function listOS(device: StorageDevice) {
            let contents = device.contents;
            let operatingSystemFiles = [...contents.keys()].filter((file) => {
                return file.toLowerCase().endsWith(".os");
            })
            operatingSystemFiles.forEach((file, index) => {
                bootloaderProcess.write(`${index} : ${file}`,
                    [
                        ConsoleStyle.FgWhite,
                        ConsoleStyle.BgGreen,
                        ConsoleStyle.Underscore
                    ]
                );
                bootloaderProcess.writeOut();
            })
    
            if (operatingSystemFiles.length == 0) {
                bootloaderProcess.write("no operating systems found on this device.");
                bootloaderProcess.write("retry...");
                bootloaderProcess.writeOut();
                listDevices();
                getDevice();
                return;
            }
    
            input.question("os> ", (os: string) => {
                let index = Number(os);
                if (!index && index !== 0) {
                    bootloaderProcess.write("please enter a valid operating system");
                    bootloaderProcess.writeOut();
                    listOS(device);
                    return;
                }

                if (!index)
                    index = 0;
                
                Session.loadedStorageDevice = device;
                hardware.Memory.allocate(0x10, 1000000);
                bootloaderProcess.write("booting, cakeL is no longer needed");
                bootloaderProcess.writeOut();
                input.close();
                
                switch (operatingSystemFiles[index]) {
                    case "inner.os":
                        hardware.CPU.executeProcess(0x10, executeKernel);
                        break;
                    default:
                        panic("Invalid operating system instruction!", 0x10);
                        break;
                }

                //console.log(Session.loadedStorageDevice)
                hardware.CPU.killProcess(0x2);
                hardware.Memory.deallocate(0x2);
            })
        }
    
        listDevices();
        getDevice();
    });
}

export function disableReadlineStream() {
    input.close();
}