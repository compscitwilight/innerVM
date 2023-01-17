import CPU from "./CPU";
import Memory from "./Memory";
import { startBootloader } from "../src/bootloader";
import { startBIOS } from "../src/bios";
import { Keyboard, Key } from "../src/kernel/drivers/InputDevice";

let BIOSAddress = 0x1;
let BIOSRam = 1000000; // 1mb
export default class Motherboard {
    public static executeFirmware() {
        Memory.allocate(BIOSAddress, BIOSRam);
        let bios = false;

        console.log("Press F12 to enter BIOS;");
        Keyboard.onKeyPress(Key.F12, (key, close) => {
            bios = true;
            close();
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
}