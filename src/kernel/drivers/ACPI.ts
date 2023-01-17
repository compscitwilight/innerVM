import hardware from "../../../hardware";

export default class ACPI {
    public static shutdown() {
        hardware.CPU.killAllProcesses();        
        process.exit();
    }
}