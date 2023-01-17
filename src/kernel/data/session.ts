import { StorageDevice } from "../../../hardware/Storage";

/**
 * User session data.
 */
export class Session {
    protected static currentDirectory: string = "/";
    public static loadedStorageDevice: StorageDevice;

    public static getCurrentDirectory() {
        return this.currentDirectory;
    }

    public static goToDirectory(path: string) {}
}