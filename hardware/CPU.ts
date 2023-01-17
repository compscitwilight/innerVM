import Memory from "./Memory";

export default class CPU {
    public static readonly cores = 1;
    public static readonly maxPrograms = 50;
    private static readonly processes = new Set<number>();

    private static addProcess(address: number) {
        if (this.processes.has(address)) return;
        this.processes.add(address);
        return new CPUProcess(address);
    }

    public static getProcesses() {
        return this.processes;
    }

    public static killProcess(address: number) {
        if (!this.processes.has(address)) return;
        this.processes.delete(address);
    }

    public static killAllProcesses() {
        let processes = this.getProcesses();
        for (var i = 0; i < [...processes.keys()].length; i++) {
            let addr = [...processes.values()][i];
            Memory.deallocate(addr);
            if (processes.has(addr))
                this.killProcess(addr);
        }
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

    constructor(
        public address: number
    ) {};

    public kill() {
        CPU.killProcess(this.address);
    }

    public write(content?: any) {
        this.writing.push(content);
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
}