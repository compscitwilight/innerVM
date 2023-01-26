export class Power {
    protected static powered = false;
    public static on() {
        this.powered = true;
    }

    public static off() {
        this.powered = false;
        
        process.exit();
    }
}