import { Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
import { loadDesktopEnviornment } from "../../../innerde";
export default {
    name: "ide",
    description: "Starts InnerDE (Inner Desktop Enviornment) server",
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        loadDesktopEnviornment(os);
    }
} as Command;