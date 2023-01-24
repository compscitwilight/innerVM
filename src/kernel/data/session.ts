import { StorageDevice } from "../../../hardware/Storage";
import { formatCharacters, RemovalMode } from "../drivers/fs/FileSystem";

/**
 * User session data.
 */
export class Session {
    protected static currentDirectory: string = "/";
    public static loadedStorageDevice: StorageDevice;

    public static getCurrentDirectory() {
        return this.currentDirectory;
    }

    public static goToDirectory(path: string) {
        this.currentDirectory = formatCharacters(path, RemovalMode.Dir);
        console.log(this.currentDirectory)
    }
}