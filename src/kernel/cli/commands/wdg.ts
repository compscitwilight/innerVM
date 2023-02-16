import { Command } from "../Commands";
import { error } from "../CommandLine";
import { ConsoleStyle } from "../../../../util/ConsoleStyle";
import { CPUProcess } from "../../../../hardware/CPU";
import { Session } from "../../data/session";
import { formatCharacters, RemovalMode, FileExtensions } from "../../drivers/fs/FileSystem";
export default {
    name: "wdg",
    description: "Utility for managing system widgets.",
    args: [
        {
            name: "action",
            description: "Action that will be performed on a widget.",
            required: true
        },
        {
            name: "widget",
            description: "Name of the widget file in /bin/widgets.",
            required: true
        }
    ],
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        const action = args[1];
        let widget = args[2];
        if (!action) {
            error("Missing 'action' argument.");
            return;
        }

        if (!widget) {
            error("Missing 'widget' argument.");
            return;
        }

        if (!widget.endsWith(FileExtensions.widg))
            widget += ".widg";

        if (widget.startsWith("/"))
            widget.substring(0, 1);

        const path = `/bin/widgets/${widget}`;
        if (
            !Session.loadedStorageDevice.contains(path)
            && action.toLowerCase() !== "add"
        ) {
            error(`Widget doesn't exist at ${path}.`);
            return;
        }

        switch (action.toLowerCase()) {
            case "add":
                const name = path.split("/")[3];
                Session.loadedStorageDevice.write(
                    formatCharacters(path, RemovalMode.File),
                    `
                    [Widget Entry]
                    Name=${name}
                    Description=
                    FgColor=
                    BgColor=
                    `
                )

                os.write(
                    `Created new widget "${name}" in ${path}`,
                    ConsoleStyle.FgGreen
                );
                os.writeOut();
                break;
            case "edit":

                break;
            case "delete":

                break;
            default:
                os.write("");
                os.writeOut();
                break;
        }
    }
} as Command;