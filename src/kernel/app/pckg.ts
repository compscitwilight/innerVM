import { Session } from "../data/session";
import { error } from "../commandLine";

export function createPackage(name: string) {
    let path = `/pckg/${name}`;
    let storageDevice = Session.loadedStorageDevice;
    if (storageDevice.contains(path)) {
        error(`Package with the name "${name}" already exists.`);
        return
    }
    storageDevice.write(path);
}