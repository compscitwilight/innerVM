import { CPUProcess } from "../../hardware/CPU";
import { createInterface } from "readline";
import { stdin as input, stdout as output } from "node:process";
import { Session } from "./data/session";
import { Commands } from "./data/Commands";

export async function executeCLI(os: CPUProcess) {
    os.write("loading command line...");
    os.writeOut();
    let rlInterface = createInterface({ input, output });
    createCLI();

    function createCLI() {
        rlInterface.question(`admin:${Session.getCurrentDirectory()} > `, (res) => {
            let args = res.split(" ");
            let cmd = args[0].toLowerCase();
            
            let command = Commands.find((c) => {
                return c.name.toLocaleLowerCase() == cmd;
            })

            if (command) {
                command.execute(args, cmd, os);
            } else {
                os.write(`command '${cmd}' does not exist.`);
                os.writeOut();
            }


            /*
            switch (cmd) {
                case "say":
                    let msg = args.shift();
                    os.write(msg);
                    os.writeOut();
                    break;
                case "instrc":
                    let code = args[1];
                    os.write(code);
                    os.writeOut();
                    break;
                case "psa":
                    startProcessAnaylse(os);
                    break;
                case "dt" || "date" || "time" || "date-time":
                    let date = getDate();
                    os.write(date);
                    os.writeOut();
                    break;
                case "shutdown":
                    os.write("goodbye");
                    os.writeOut();
                    ACPI.shutdown();
                    break;
                case "ls" || "list" || "lsdir" || "listdir":
                    FileSystem.listCurrentDirectory(os);
                    break;
                case "http":

                    break;
                case "http-server":

                    break;
                default:
                    os.write(`command '${cmd}' does not exist.`);
                    os.writeOut();
                    break;
            }
            */
        
            createCLI();
        })
    }
}