import { formatCharacters, RemovalMode } from "./FileSystem";
import { StorageDevice } from "../../../../hardware/Storage";

export class Directory {
    constructor(
        public name: string,
        public path: string,
        public storageDevice: StorageDevice,
        public permissionLevel?: number
    ) {
        if (!permissionLevel) {
            this.permissionLevel = 0;
        }
    };

    public writeFile(name: string, content: string) {
        let formatted = formatCharacters(name, RemovalMode.File);
        
    }

    public writeDirectory(name: string) {
        let formatted = formatCharacters(name, RemovalMode.Dir);

    }
}