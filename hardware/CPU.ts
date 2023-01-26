import Memory from "./Memory";
import { ConsoleStyle } from "../util/ConsoleStyle";
import { validateStyle } from "../util/ValidateStyle";

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

    /**
     * Validates the style provided to write() or writeLL() and returns a style string to be appended to the content being printed.
     * @param style The style to be validated and transformed into a string.
     * @returns styleString
     */
    public validateStyle(style?: ConsoleStyle | ConsoleStyle[]) {
        return validateStyle(style);
    }

    /**
     * Creates a new line of text.
     * @param content The data to be output
     * @param style ConsoleStyle array
     */
    public write(content?: any, style?: ConsoleStyle | ConsoleStyle[]) {
        let styleString = this.validateStyle(style);
        this.writing.push((this.bg || ConsoleStyle.Reset) + styleString + content + ConsoleStyle.Reset);
    }

    /**
     * Writes text to the last written line.
     * @param content The data to be output
     * @param style ConsoleStyle array
     */
    public writeLL(content?: any, style?: ConsoleStyle | ConsoleStyle) {
        let styleString = this.validateStyle(style);
        this.writing[this.writing.length] += styleString;
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