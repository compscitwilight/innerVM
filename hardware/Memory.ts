export default class Memory {
    public static allocated = new Map<number, number>();
    public static maxMemory = 90099999;
    public static allocate(address: number, size: number) {
        if ((this.getTotalAllocated() + size) > this.maxMemory) return;
        let prev = this.allocated.get(address);
        if (prev) {
            this.allocated.set(address, (size + prev));
            return;
        }

        this.allocated.set(address, size);
    }
    
    public static deallocate(address: number, size?: number) {
        let current = this.allocated.get(address);
        if (!current) return;
        if (!size) {
            this.allocated.set(address, 0);
            this.allocated.delete(address);
            return;
        }

        this.allocated.set(address, (current - size));
    }

    public static getAll() {
        return this.allocated;
    }

    public static getTotalAllocated() {
        let values = [...this.allocated.values()];
        let total = 0;
        for (var i = 0; i < values.length; i++) {
            let val = values[i];
            total += val;
        }
        return total;
    }
}