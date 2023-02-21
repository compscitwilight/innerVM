import { startBootloader } from "./src/bootloader"
export default {
    /**
     * Memory capacity for the virtual machine.
     */
    maxRam: 90099999,

    /**
     * The function that will be invoked by the motherboard when 
     * Motherboard.executeFirmware() is invoked.
     */
    index: startBootloader
};