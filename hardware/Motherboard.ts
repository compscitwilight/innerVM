import CPU from "./CPU";
import Memory from "./Memory";
import { startBootloader } from "../src/bootloader";
import { startBIOS } from "../src/bios";
import { Key, keyPressCallback } from "../util/InputTypes";

let BIOSAddress = 0x1;
let BIOSRam = 1000000; // 1mb
export default class Motherboard {
    public static executeFirmware() {
        Memory.allocate(BIOSAddress, BIOSRam);
        let bios = false;

        console.log("Press F12 to enter BIOS;");
        let biosKeyEvent = this.onKeyPress(Key.F12, () => {
            bios = true;
        })

        CPU.timeout(1750, () => {
            if (bios) {
                CPU.executeProcess(BIOSAddress, startBIOS);
            } else {
                startBootloader();
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