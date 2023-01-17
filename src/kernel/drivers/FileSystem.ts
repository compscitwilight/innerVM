import hardware from "../../../hardware";
import { CPUProcess } from "../../../hardware/CPU";
import { Session } from "../data/session";

export function getStorageDevices() {
    return hardware.Storage.getStorageDevices();
}

export function listCurrentDirectory(os: CPUProcess) {
    let directory = Session.getCurrentDirectory();
    let bootedDevice = Session.loadedStorageDevice;
    let directoryContents = [...bootedDevice.contents.keys()].filter((file) => {
        return file.search("/") === 0;
    })
    os.write(`Contents for ${directory}`);
    os.write(directoryContents);
    os.writeOut();
}