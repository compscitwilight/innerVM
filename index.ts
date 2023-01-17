import Motherboard from "./hardware/Motherboard";
import Storage from "./hardware/Storage";

console.clear();
process.stdin.setRawMode(true);

let storageDevices = Storage.getStorageDevices();
let rootDevice = storageDevices[0];
rootDevice.write("inner.os", "This file is used to execute InnerOS.");
Motherboard.executeFirmware();
