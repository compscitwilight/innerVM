import { PermissionLevel } from "./PermissionLevel";
import { StorageDevice } from "../../../../hardware/Storage";
import { FileExtensions } from "./ExtList";
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
    public properties: FileProperties = {};
    public bindings: Map<string, any> = new Map<string, any>();
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

    public appendTo(content: string) {
        const newContent = this.content + `${content}\n`;
        this.write(newContent);
        return newContent;
    }

    public delete() {
        this.storageDevice.rm(this.path);
    }

    public setPermissionLevel(level: PermissionLevel) {
        this.permissionLevel = level;
    }

    public getProperty(property: keyof FileProperties) {
        const keys = Object.keys(this.properties);
        let index: number;
        for (var i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key == property)
                index = i;
        }
        return Object.values(this.properties)[index];
    }
}

