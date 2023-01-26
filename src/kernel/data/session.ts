import { StorageDevice } from "../../../hardware/Storage";
import { formatCharacters, RemovalMode } from "../drivers/fs/FileSystem";
import { Widget } from "../cli/Widget";

/**
 * User session data.
 */
export class Session {
    protected static currentDirectory: string = "/";
    public static loadedStorageDevice: StorageDevice;
    protected static readonly widgets: Widget[];

    public static getCurrentDirectory() {
        return this.currentDirectory;
    }

    public static goToDirectory(path: string) {
        this.currentDirectory = formatCharacters(path, RemovalMode.Dir);
        console.log(this.currentDirectory)
    }

    public static getWidgets() {
        return this.widgets;
    }

    public static addWidget(widget: Widget) {
        
    }
}