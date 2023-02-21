/**
 * (C) Copyright 2023 - Devrusty
 * This file is under the GNU General Public License.
 * 
 * This file is responsible for handling the booting, bootstrapping, and methods of
 * the InnerOS kernel.
 */

import { CPUProcess } from "../../hardware/CPU";
import { executeCLI } from "./cli/CommandLine";
import hardware from "../../hardware";
import { Session } from "./data/session";
import { ConsoleStyle } from "../../util/ConsoleStyle";
import { init, formatDisk } from "./drivers/fs/FileSystem";
import { StorageDevice } from "../../hardware/Storage";
import { readdirSync, readFileSync } from "fs";
import { changeTopBuffer } from "../../";
import { join } from "path";

export const kernelInfo = {
    version: 1.2
}

export function executeKernel(os: CPUProcess) {
    changeTopBuffer(`InnerVM - InnerOS v${kernelInfo.version}`);
    // bootstrapping
    bootstrap();

    // load process
    os.write("formatting disk for InnerFS...", ConsoleStyle.FgYellow);
    formatDisk();
    init();

    os.alias = "inneros_kernel";
    os.write(`Welcome to the innerOS kernel (v${kernelInfo.version}).`);
    os.write("Use 'help' for a list of commands, use 'psa' for process analyse");
    os.write("If you'd like to start a InnerDE (desktop enviornment) server, run 'ide'");
    os.writeOut();
    
    executeCLI(os);
}

/**
 * For the first time running the machine. Creates the core files in the root directory
 * of the booted storage device.
 */
export function bootstrap() {
    let bootedDrive = Session.loadedStorageDevice;

    // pre-load
    /**
     * sys/ is where system files are located, such as configuration files, system assets, and
     * other important files.
     */
    bootedDrive.write("sys/");

    /**
     * pckg/ is where packages are downloaded. These packages can be from any package manager which
     * supports InnerOS, such as innerPCKG, and soon to be Node.js
     */
    bootedDrive.write("pckg/");

    /**
     * bin/ is where temporary files are stored, such as logs and program cache.
     */
    bootedDrive.write("bin/");

    /**
     * src/ is where program files are located.
     */
    bootedDrive.write("src/");

    /**
     * Creating .app files for the built-in Kernel applications
     */
    readdirSync(join(__dirname, "/app")).filter(f => f.endsWith(".ts")).forEach((f) => {
        const content = readFileSync(join(__dirname, `/app/${f}`));
        f = f.replace(".ts", ".app");
        bootedDrive.write(
            `src/${f}`,
            content
        )
    })
};

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
        panicProcess.write("Your system has unexpectedly crashed. If you'd like to view a log what happened, please view /bin/logs once you've rebooted.");
        panicProcess.write("If your system is unable to reboot, please create a new issue on the Github repository for further assistance.");
        
        panicProcess.writeOut();

        for (;;)
            panicProcess.write("");

        //ACPI.shutdown();
    })
};

export function mountStorageDevice(device: StorageDevice) {};