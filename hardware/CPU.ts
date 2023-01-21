import Memory from "./Memory";
import { ConsoleStyle } from "../util/ConsoleStyle";

export default class CPU {
    public static readonly cores = 1;
    public static readonly maxPrograms = 50;
    private static readonly processes = new Set<CPUProcess>();

    private static addProcess(address: number) {
        if ([...this.processes.values()].find((p) => p.address == address)) return;
        let memoryUsage = Memory.getAll().get(address);
        let process = new CPUProcess(address, memoryUsage);
        this.processes.add(process);
        return process;
    }

    public static getProcesses() {
        return this.processes;
    }

    public static killProcess(address: number) {
        let process = [...this.processes.keys()].find((p) => p.address === address);
        if (!process) return;
        this.processes.delete(process);
    }

    public static killAllProcesses() {
        let processes = this.getProcesses();
        processes.forEach((p) => {
            Memory.deallocate(p.address);
            if (![...processes.values()].find((p2) => p2.address == p.address)) return;
            this.killProcess(p.address);
        })
    }

    public static executeProcess(processAddress: number, instruction: Instruction) {
        if (!Memory.getAll().has(processAddress)) return;
        if ([...this.processes, processAddress].length > this.maxPrograms) return;
        let process = this.addProcess(processAddress);
        if (!process) return;
        instruction(process);
        //return this.addProcess(processAddress);
    }

    public static timeout(ms: number, callback: Function) {
        setTimeout(() => {
            callback();
        }, ms);
    }
}

export type Instruction = (process: CPUProcess) => void;
export class CPUProcess {
    public writing = new Array<any>();
    public childProcesses = new Array<CPUProcess>();
    public alias?: string = "unknown_process";
    public bg?: ConsoleStyle;

    constructor(
        public address: number,
        protected memoryUsage: number
    ) {};

    public kill() {
        CPU.killProcess(this.address);
    }

    public write(content?: any, style?: ConsoleStyle | ConsoleStyle[]) {
        let styleString = "";
        if (style) {
            if (!Array.isArray(style))
                styleString = style;
            else
                for (var i = 0; i < style.length; i++) {
                    let str = style[i];
                    styleString += str;
                };
        }

        this.writing.push(styleString + content + (this.bg || ConsoleStyle.Reset));
    }

    public writeOut() {
        this.writing.forEach((msg) => {
            console.log(msg);
        });
        this.writing.splice(0, this.writing.length);
    }

    public addChildProcess(process: CPUProcess) {
        this.childProcesses.push(process);
    }

    public getMemoryFootprint() {
        return this.memoryUsage;
    }
}