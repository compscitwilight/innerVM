export class StorageDevice {
    public contents = new Map<string, any>();
    
    constructor(
        public readonly maxCapacity: number,
        public readonly name: string
    ) {}

    public write(path: string, content?: any) {
        if (this.contents.size == this.maxCapacity) return;
        this.contents.set(path, content);
    }

    public read(path: string) {
        let content = this.contents.get(path);
        return content;
    }

    public partition(pStart: number, pEnd: number) {}

    /**
     * Returns the amount of storage that is occupied by contents on the StorageDevice.
     */
    public getUsed() {
        return this.contents.size;
    }

    public contains(fileName: string) {
        return this.contents.has(fileName);
    }

    /*
    public writeToHost() {
        let destination = path.join("../", "storage", `${this.name}.txt`);
        writeFileSync(destination, )
    }
    */
}

export default class Storage {
    private static readonly activeDevices = [
        new StorageDevice(100, "root")
    ]

    public static getStorageDevices() {
        return this.activeDevices;
    }

    public static mountDevice(device: StorageDevice) {
        if (this.activeDevices.find((d) => d.name == device.name))
            return;
        this.activeDevices.push(device);
    }

    public static unmountDevice(device: StorageDevice) {
        let devices = this.activeDevices;
        if (!devices.indexOf(device)) return;
        devices.splice(devices.indexOf(device), 1);
    }
}