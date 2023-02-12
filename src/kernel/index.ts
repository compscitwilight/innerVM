import { CPUProcess } from "../../hardware/CPU";
import { executeCLI } from "./cli/CommandLine";
import hardware from "../../hardware";
import ACPI from "./drivers/ACPI";
import { Session } from "./data/session";
import { ConsoleStyle } from "../../util/ConsoleStyle";
import { formatDisk } from "./drivers/fs/FileSystem";
import { StorageDevice } from "../../hardware/Storage";

export function executeKernel(os: CPUProcess) {
    let bootedDrive = Session.loadedStorageDevice;

    bootedDrive.write("/pckg");
    bootedDrive.write("/logs");
    bootedDrive.write("/logs/s");
    bootedDrive.write("joe.txt");

    os.write("formatting disk for InnerFS...", ConsoleStyle.FgYellow);
    formatDisk();

    os.alias = "inneros_kernel";
    os.write("Welcome to the innerOS kernel (v1.0).");
    os.write("Use 'help' for a list of commands, use 'psa' for process analyse");
    os.write("If you'd like to start a InnerDE (desktop enviornment) server, run 'ide'");
    os.writeOut();
    
    executeCLI(os);
}

export function panic(msg: string, address?: number) {
    console.clear();
    hardware.CPU.killAllProcesses();
    hardware.Memory.allocate(0x000035, msg.length);
    hardware.CPU.executeProcess(0x000035, (panicProcess) => {
        let spaces = " ".repeat(35);
        panicProcess.bg = ConsoleStyle.BgRed;
        panicProcess.write(`${spaces}[kernel panic] - ${msg}${spaces}`);
        if (address)
            panicProcess.write(`@ ${address}`);
        panicProcess.write("Your system has unexpectedly crashed. If you'd like to see what happened, please view /logs/crashes once you've rebooted.");
        panicProcess.write("If your system is unable to reboot, please create a new issue on the Github repository for further assistance.");
        
        panicProcess.writeOut();

        ACPI.shutdown();
    })
}

export function mountStorageDevice(device: StorageDevice) {
    
}