import CPU from "./CPU";
import Memory from "./Memory";
import { startBootloader, disableReadlineStream } from "../src/bootloader";
import { startBIOS } from "../src/bios";
import { Key, keyPressCallback } from "../util/InputTypes";
import { executeKernel } from "../src/kernel";
import { Session } from "../src/kernel/data/session";
import { getStorageDevices } from "../src/kernel/drivers/fs/FileSystem";

let BIOSAddress = 0x1;
let BIOSRam = 1000000; // 1mb
export default class Motherboard {
    public static executeFirmware(bootloader: boolean) {
        Memory.allocate(BIOSAddress, BIOSRam);
        let bios = false;

        console.log("Press F12 to enter BIOS;");
        //let biosKeyEvent = this.onKeyPress(Key.F12, () => {
        //    bios = true;
        //})

        CPU.timeout(1750, () => {
            if (bios) {
                CPU.executeProcess(BIOSAddress, startBIOS);
            } else {
                if (bootloader) {
                    startBootloader();
                } else {
                    Memory.allocate(0x10, 1000000);
                    CPU.executeProcess(0x10, (os) => {
                        let rootDevice = getStorageDevices()[0];
                        Session.loadedStorageDevice = rootDevice;
                        disableReadlineStream();
                        executeKernel(os);
                    });
                }
            }
        });
    }

    public static getDate() {
        return new Date();
    }

    public static onKeyPress(key: Key, callback?: keyPressCallback) {
        let event = process.stdin.on("keypress", (ch: string, k) => {
            let keyString: string = k.name;
            let lowered = keyString.toLowerCase();

            if (lowered == key && callback)
                callback(lowered);
        })

        return event;
    }
}