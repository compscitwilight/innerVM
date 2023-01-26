import { CPUProcess } from "../../../hardware/CPU";
import { createInterface } from "readline";
import { stdin as input, stdout as output } from "node:process";
import { Session } from "../data/session";
import { Commands } from "./Commands";
import { ConsoleStyle } from "../../../util/ConsoleStyle";
import hardware from "../../../hardware";
import { Widget } from "./Widget";
import { TimeWidget } from "./Widgets";

export let widgets: Widget[] = [TimeWidget]
export function executeCLI(os: CPUProcess) {
    os.write("loading command line...");
    os.writeOut();
    let rlInterface = createInterface({ input, output });
    createCLI();

    function getWidgets() {
        return widgets.map((w) => {
            return w;
        });
    }

    function createCLI() { 
        let widgetValues = widgets.map((w) => {
            return w.templates.map((t) => {
                return t.text;
            });
        }) + " ";
        rlInterface.question(`${widgetValues}admin:${Session.getCurrentDirectory()} > `, (res) => {
            if (!res) {
                createCLI();
                return
            };
            let args = res.split(" ");
            let cmd = args[0].toLowerCase();
            
            let command = Commands.find((c) => {
                let aliasesLowered: string[] = [];
                if (c.aliases)
                    aliasesLowered = c.aliases.map((alias) => alias.toLowerCase());
                return c.name.toLowerCase() == cmd || aliasesLowered.includes(cmd);
            })

            if (command) {
                command.execute(args, cmd, os);
            } else {
                error(`command '${cmd}' does not exist`);
                os.writeOut();
            }
        
            createCLI();
        })
    }
}

export function error(msg: string, code?: number) {
    if (code)
        msg += ` (${code})`;

    hardware.Memory.allocate(0x00305, msg.length);
    hardware.CPU.executeProcess(0x00305, (errorProcess) => {
        errorProcess.write(msg, [
            ConsoleStyle.FgRed,
            ConsoleStyle.BgBlack
        ]);
        errorProcess.writeOut();
    })
    hardware.CPU.killProcess(0x00305);
    hardware.Memory.deallocate(0x00305);
}