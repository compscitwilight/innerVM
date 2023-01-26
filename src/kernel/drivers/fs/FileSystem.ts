import { ConsoleStyle } from "../../../../util/ConsoleStyle";
import hardware from "../../../../hardware";
import { CPUProcess } from "../../../../hardware/CPU";
import { Session } from "../../data/session";
import { Directory } from "./Directory";

export enum RemovalMode {
    File = "File",
    Dir = "Directory"
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

export function getCurrentDirectoryContents() {
    let directoryContents = [...Session.loadedStorageDevice.contents.keys()].filter((file) => {
        return file.split("/").length <= 2;
    })
    return directoryContents;
}

export function listCurrentDirectory(os: CPUProcess) {
    let directory = Session.getCurrentDirectory();
    let directoryContents = getCurrentDirectoryContents();

    let spaces = " ".repeat(2);
    os.write(`Contents for ${directory}`);
    directoryContents.forEach((dir) => {
        os.write(spaces + dir + spaces, ConsoleStyle.BgBlue);
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

export function formatCharacters(str: string, mode: RemovalMode) {
    str.replace(/ g/, "");
    switch (mode) {
        case (RemovalMode.File):
            if (str.startsWith("/"))
                str.substring(0, 1);

            let groups = str.split("/");
            if (groups.length > 0)
                str.substring(str.indexOf(groups[0]), str.length)

            return str;
        case (RemovalMode.Dir):
            if (!str.startsWith("/"))
                str = `/${str}`;
            
            let directories = str.split("/");
            if (directories.length > 1)
                str.substring(str.indexOf(directories[1]), str.length);

            return str;
    }
}