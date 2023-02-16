import { Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
import { ConsoleStyle } from "../../../../util/ConsoleStyle";
import { error } from "../CommandLine";
import { createPackage } from "../../app/pckg";
export default {
    name: "pckg",
    description: "Inner's package manager. Lets you install application and dependencies that run on your computer.",
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        let action = args[1];
        if (!action) {
            let spaces = " ".repeat(30);
            os.write(`${spaces}pckg${spaces}`, ConsoleStyle.BgBlue);
            os.write("pckg new <directory> <name?> - Creates a new package with the contents of the provided directory.", ConsoleStyle.FgGreen);
            os.write("pckg remove <package> - Removes a package with the provided name.", ConsoleStyle.FgRed);
            os.write("pckg remote <url> - Downloads a package from the internet with the provided URL.", ConsoleStyle.FgGreen);
            os.writeOut();
            return;
        }
        
        switch (action.toLowerCase()) {
            case "new":
                let directory = args[2];
                let name = args[3];
                if (!directory) {
                    error("Directory is required");
                    return;
                }

                if (!name) {
                    error("Name is required.");
                    return;
                }

                name = name.toLowerCase();

                let path = `/pckg/${name}`;
                createPackage(name);

                os.write(`Created new package "${name}" in ${path}`, ConsoleStyle.FgGreen);
                os.writeOut();
                break;
            default:
                os.write("Please use 'pckg' to see a list of the avaliable options for this command.", ConsoleStyle.FgRed);
                os.writeOut();
        }
    }
} as Command;