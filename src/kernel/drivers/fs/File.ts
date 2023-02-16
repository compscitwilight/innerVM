import { PermissionLevel } from "./PermissionLevel";
import { StorageDevice } from "../../../../hardware/Storage";
import { FileExtensions } from "./FileExt";
export interface FileProperties {
    description?: string,
    dateCreated?: string,
    dateModified?: string,
    creator?: string,
    owner?: string,
    source?: string,
    hidden?: boolean,
    fileType?: FileExtensions
}

export class File {
    public properties: FileProperties;
    public constructor(
        public path: string,
        public permissionLevel: PermissionLevel,
        public content: string,
        public storageDevice: StorageDevice
    ) {
        storageDevice.write(path, content);
    };

    public read() {
        return this.storageDevice.read(this.path);
    }

    public write(content: string) {
        this.storageDevice.write(this.path, content);
        this.content = content;
    }

    public delete() {
        this.storageDevice.rm(this.path);
    }

    public setPermissionLevel(level: PermissionLevel) {
        this.permissionLevel = level;
    }
}