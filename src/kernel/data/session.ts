import { StorageDevice } from "../../../hardware/Storage";
import { formatCharacters, RemovalMode } from "../drivers/fs/FileSystem";
import { Widget } from "../cli/Widget";
import { Service } from "../drivers/Service";
import { File } from "../drivers/fs/File";

/**
 * User session data.
 */
export class Session {
    public static currentDirectory: string = "/";
    public static loadedStorageDevice: StorageDevice;
    public static readonly widgets: Widget[] = new Array<Widget>();
    public static readonly runningServices: Service[] = new Array<Service>();

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

    public static startService(serviceFile: File, alias?: string) {
        const service = new Service(alias || "unknown_service", serviceFile);
        this.runningServices.push(service);
        return service;
    }

    public static findService(alias: string) {
        const results = this.runningServices.filter((service) => {
            service.sysAlias == alias;
        })
        return results;
    }
}