import { formatCharacters, RemovalMode } from "./FileSystem";
import hardware from "../../../../hardware";
import { StorageDevice } from "../../../../hardware/Storage";

export class Directory {
    constructor(
        public name: string,
        public path: string,
        public storageDevice: StorageDevice
    ) {};

    public writeFile(name: string, content: string) {
        let formatted = formatCharacters(name, RemovalMode.File);
        
    }

    public writeDirectory(name: string) {
        let formatted = formatCharacters(name, RemovalMode.Dir);

    }
}