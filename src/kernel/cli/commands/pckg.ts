import { Command } from "../Commands";
import { CPUProcess } from "../../../../hardware/CPU";
import { ConsoleStyle } from "../../../../util/ConsoleStyle";
import { error } from "../CommandLine";
import { createPackage } from "../../app/pckg";
import { createFile, getFileObject, PermissionLevel } from "../../drivers/fs/FileSystem";
import { Session } from "../../data/session";
import { Network, HTTPMethod } from "../../drivers/Network";
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

        const lowered = action.toLowerCase();
        if (lowered == "new") {
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

            let path = `/bin/pckg/${name}`;
            createPackage(name);

            os.write(`Created new package "${name}" in ${path}`, ConsoleStyle.FgGreen);
            os.writeOut();
        } else if (lowered == "add-repo") {
            const repoName = args[2];
            const repoURL = args[3];
            const trusted = args[4];
            if (!repoName) {
                error("Missing argument 'repoName'");
                return;
            }
            if (!repoURL) {
                error("Missing argument 'repoURL'");
                return;
            }

            os.write(`Making an HTTP request to ${repoURL} to validate integrity.`);
            Network.httpRequest(HTTPMethod.get, repoURL)
            .then((response) => {
                if (response.status !== 200) {
                    error(`HTTP request to ${repoURL} returned with status code ${response.status}.`);
                    return;
                }
                os.write(`${repoURL} returned status 200.`, ConsoleStyle.FgGreen);
                os.write("press enter to return to command line", [ConsoleStyle.FgGray, ConsoleStyle.Dim]);
                os.writeOut();
            }).catch((e) => {
                error(`HTTP Request to ${repoURL} failed. (${e})`);
                return;
            })

            let reposFile = getFileObject("/bin/pckg/repos.xml");
            if (!reposFile) {
                os.write("Couldn't locate /bin/pckg/repos.xml. Restoring file to complete operation...", ConsoleStyle.FgYellow);
                os.writeOut();
                reposFile = createFile(
                    "/bin/pckg/repos.xml",
                    PermissionLevel.ADMIN,
                    `<?xml version="1.0" encoding="utf-8"?>\n`,
                    Session.loadedStorageDevice
                );
            }

            const indents = " ".repeat(3);
            reposFile.appendTo("<repository>\n");
            reposFile.appendTo(`${indents}<name>${repoName}</name>\n`);
            reposFile.appendTo(`${indents}<url>${repoURL}</url>\n`);
            if (trusted)
                reposFile.appendTo(`${indents}<trusted>${trusted}</trusted>\n`);
            reposFile.appendTo("</repository>");

            os.write("Successfully added repository to repos.xml", ConsoleStyle.FgGreen);
            os.writeOut();
        } else {
            os.write("Please use 'pckg' to see a list of the avaliable options for this command.", ConsoleStyle.FgRed);
            os.writeOut();
        }
    }
} as Command;