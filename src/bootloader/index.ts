/**
 * :cakeL: is the bootloader.
 */

import hardware from "../../hardware";
import { createInterface } from "readline";
import { StorageDevice } from "../../hardware/Storage";
import { CPUProcess } from "../../hardware/CPU";
import { executeKernel } from "../kernel";
import { Session } from "../kernel/data/session";
import { ConsoleStyle } from "../../util/ConsoleStyle";

let input = createInterface({
    input: process.stdin,
    output: process.stdout
})

export function startBootloader() {
    hardware.Memory.allocate(0x2, 1000000);
    hardware.CPU.executeProcess(0x2, (bootloaderProcess: CPUProcess) => {
        bootloaderProcess.alias = "cakel";
        bootloaderProcess.write("=== :cakeL(oader): ===", ConsoleStyle.BgBlue);
        let bootDevices = hardware.Storage.getStorageDevices();
    
        function listDevices() {
            bootloaderProcess.write("Select boot device");
            bootDevices.forEach((device, index) => {
                bootloaderProcess.write(
                    `${index}: |NAME:"${device.name}" (${device.getUsed()}/${device.maxCapacity} bytes)|`,
                    [ConsoleStyle.BgMagenta, ConsoleStyle.Underscore]
                );
            });
        
            bootloaderProcess.writeOut();
        }
    
        function getDevice() {
            input.question("device> ", (response: string) => {
                let index = Number(response);
                let device = bootDevices[index];
                if (!index && index !== 0 || !device) {
                    bootloaderProcess.write("please select a valid device.");
                    bootloaderProcess.writeOut();
                    getDevice();
                    return;
                }
    
                bootloaderProcess.write("booting into device...");
                bootloaderProcess.writeOut();
    
                listOS(device);
                return;
            })
        }
    
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
    
                hardware.Memory.allocate(0x10, 1000000);
                bootloaderProcess.write("booting, cakeL is no longer needed");
                bootloaderProcess.writeOut();
                input.close();
    
                hardware.CPU.executeProcess(0x10, executeKernel);
                Session.loadedStorageDevice = device;
    
                hardware.CPU.killProcess(0x2);
                hardware.Memory.deallocate(0x2);
            })
        }
    
        listDevices();
        getDevice();
    });
}