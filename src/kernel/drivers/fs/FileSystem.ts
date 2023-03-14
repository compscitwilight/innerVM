import { ConsoleStyle } from "../../../../util/ConsoleStyle";
import hardware from "../../../../hardware";
import { CPUProcess } from "../../../../hardware/CPU";
import { Session } from "../../data/session";
import { Directory } from "./Directory";
import { File } from "./File";
import { PermissionLevel } from "./PermissionLevel";
import { StorageDevice } from "../../../../hardware/Storage";

export const InnerFSFile = File;
export { FileExtensions } from "./ExtList";
export { PermissionLevel };
export { Directory };

const files = new Map<string, File>();

export enum RemovalMode {
    File = "File",
    Dir = "Directory"
}

export function init() {
    let keys = [...Session.loadedStorageDevice.contents.keys()];
    let values = [...Session.loadedStorageDevice.contents.values()];
    for (
        var i = 0;
        i < keys.length;
        i++
    ) {
        const path = keys[i];
        if (!path.endsWith("/")) {
            const content = values[i];
            const file = new InnerFSFile(
                path,
                PermissionLevel.BASIC,
                content,
                Session.loadedStorageDevice
            )
            files.set(path, file);
        }
    }

    console.log([...files.keys()]);
}

export function getStorageDevices() {
    return hardware.Storage.getStorageDevices();
}

export function changeDirectory(dir: string) {
    if (dir == "/") {
        Session.goToDirectory("/");
        return;
    }
    Session.goToDirectory(dir);
}

export function prevDirectory() {
    const cd = Session.getCurrentDirectory();
    if (cd == "/") return;

    let ancestorDirectories = [...Session.loadedStorageDevice.contents.keys()].sort().filter((dir) => {
        return dir.split("/").includes(cd)
    });

    changeDirectory(ancestorDirectories[0]);
}

export function getCurrentDirectoryContents() {
    let directoryContents = [...Session.loadedStorageDevice.contents.keys()].filter((file) => {
        let cd = Session.getCurrentDirectory();
        let length = file.split(cd).length
        //console.log("=" + file + " " + length);
        return length > 2 || length == 1;
    })
    return directoryContents;
}

export function listCurrentDirectory(os: CPUProcess) {
    let directory = Session.getCurrentDirectory();
    let directoryContents = getCurrentDirectoryContents();

    let spaces = " ".repeat(2);
    os.write(`Contents for ${directory}`);
    directoryContents.forEach((dir) => {
        os.write((spaces + dir + spaces), ConsoleStyle.BgBlue);
    })
    os.writeOut();
}

export function formatDisk() {
    let device = Session.loadedStorageDevice;
    let contents = [...device.contents.keys()];
    contents.forEach((file) => {
        if (!file.startsWith("/") && !file.includes(".")) {
            let content = device.read(file);
            device.rm(file);
            device.write(`/${file}`, content);
        }
    })
}

export function createDirectory(name: string) {
    let currentDirectory = Session.getCurrentDirectory();
    let formatted = formatCharacters(name, RemovalMode.Dir);
    return new Directory(formatted, currentDirectory + `/${formatted}`, Session.loadedStorageDevice);
}

export function createFile(
    path: string,
    pLevel: PermissionLevel,
    content: string,
    device: StorageDevice    
) {
    if (files.get(path)) return;
    device.write(path, content);
    
    const file = new InnerFSFile(path, pLevel, content, device);
    files.set(path, file);
    return file; 
}

export function appendTo(file: File, content: string) {
    if (!getFileObject(file.path)) return;
    const newContent = file.content + content;
    return createFile(file.path, file.permissionLevel, newContent, file.storageDevice);
}

export function formatCharacters(str: string, mode: RemovalMode) {
    //str.replace(/ g/, "");
    switch (mode) {
        case (RemovalMode.File):
            if (str.startsWith("/"))
                str.substring(0, 1);
            let groups = str.split("/");
            if (groups.length > 0)
                str.substring(str.indexOf(groups[0]), str.length)

            return str;
        case (RemovalMode.Dir):
            if (!str.endsWith("/"))
                str = `${str}/`;
            
            let directories = str.split("/");
            if (directories.length > 1)
                str.substring(str.indexOf(directories[1]), str.length);

            return str;
    }
}

export function getFileObject(filePath: string) {
    return files.get(filePath);
}