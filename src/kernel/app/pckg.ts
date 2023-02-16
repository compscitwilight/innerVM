/**
 * (C) Copyright 2023 - Devrusty
 * This file is under the GNU General Public License.
 * 
 * "pckg" is an open-source package manager that is included with InnerOS. "pckg" can be used
 * to install packages from external sources, or create packages using the pckg command.
 */

import { Session } from "../data/session";
import { error } from "../cli/CommandLine";

export function createPackage(name: string) {
    let path = `/pckg/${name}`;
    let storageDevice = Session.loadedStorageDevice;
    if (storageDevice.contains(path)) {
        error(`Package with the name "${name}" already exists.`);
        return
    }
    storageDevice.write(path);
}