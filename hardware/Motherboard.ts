import CPU from "./CPU";
import Memory from "./Memory";
import { startBIOS } from "./firmware/bios";
import { Key, keyPressCallback } from "../util/InputTypes";
import config from "../config";
import { start } from "../";

let BIOSAddress = 0x1;
let BIOSRam = 1000000; // 1mb
export default class Motherboard {
    public static usb_bus: USBStream[] = new Array<USBStream>();

    /* CRYPTOGRAPHY */
    protected pin?: number;

    public static executeFirmware() {
        Memory.allocate(BIOSAddress, BIOSRam);
        let bios = false;

        console.log("Press F12 to enter BIOS;");

        CPU.timeout(1750, () => {
            if (bios) {
                CPU.executeProcess(BIOSAddress, startBIOS);
            } else {
                if (typeof start === "function") {
                    start();
                    Memory.deallocate(BIOSAddress);
                } else {
                    console.log("Failed to boot into storage device.");
                    console.log("(check your 'config.ts' file for an index **function**).");
                    console.log("Press [ESC] to shutdown.");

                    this.onKeyPress(Key.Escape, () => {
                        process.exit();
                    })
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

    public static addUSB(stream: USBStream) {
        this.usb_bus.push(stream);
    }
};

/* USB */

export enum USBType {
    video = "video",
    storage = "storage",
    audio = "audio",
    unknown = "unknown"
}

export type streamListenerCallback = () => void;

export interface USBStream {
    deviceIdentifier?: string,
    dataStream: number[][],
    onStream: streamListenerCallback
};