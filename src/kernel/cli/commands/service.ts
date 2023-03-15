import { ConsoleStyle } from "../../../../util/ConsoleStyle";
import { CPUProcess } from "../../../../hardware/CPU";
import { Command } from "../Commands";
import { Session } from "../../data/session";
import { error } from "../CommandLine";
import { ServiceStatus } from "../../drivers/Service";
export default {
    name: "service",
    description: "A system utility command that contains functions related to system-wide services.",
    execute: (args: string[], cmd: string, os: CPUProcess) => {
        const action = args[1];
        const alias = args[2];
        if (!action) {
            os.write("system services utility", ConsoleStyle.BgBlack);
            os.write("service list - Lists all services running on the system, no matter their status.");
            os.write("service status [SERVICE] - Returns the status of a service.");
            os.write("service start [SERVICE_FILE] - Starts a new service with the service file provided.", ConsoleStyle.BgGreen);
            os.write("service halt [SERVICE] - Halts a service.", ConsoleStyle.BgRed);
            os.write("service resume [SERVICE] - Resumes a service if it has been halted.", ConsoleStyle.BgGreen);
            os.write("service stop [SERVICE] - Stops a service.", ConsoleStyle.BgRed);
            os.write("service restart [SERVICE] - Restarts a service.", ConsoleStyle.BgYellow);
            os.writeOut();
            return;
        }

        const lowered = action.toLowerCase();
        if (lowered == "list") {
            Session.runningServices.forEach((service, index) => {
                os.write(`${index + 1}| ${service.name} (${service.sysAlias})`);
            })
            os.writeOut();
        } else if (lowered == "status") {
            if (!alias) {
                error("Missing 'alias' argument.");
                return;
            }

            const results = Session.findService(alias);
            if (results.length == 0) {
                error("Invalid service provided. Please make sure that you are using the **alias** of the service, run `service list` for a list.");
                return;
            }
            
            if (results.length > 1) {
                os.write("Found multiple services with the same aliases.", ConsoleStyle.FgYellow);
                os.writeOut();
            }

            results.forEach((s) => {
                const status = s.getStatus();
                let statusWriteColor: ConsoleStyle | ConsoleStyle[];
                os.write(s.sysAlias, ConsoleStyle.BgBlack);
                switch (status) {
                    case (ServiceStatus.HALTED):
                        statusWriteColor = [ConsoleStyle.FgRed, ConsoleStyle.Dim];
                        break;
                    case (ServiceStatus.PAUSED):
                        statusWriteColor = ConsoleStyle.FgMagenta;
                        break;
                    case (ServiceStatus.RESTARTING):
                        statusWriteColor = ConsoleStyle.FgYellow;
                        break;
                    case (ServiceStatus.RUNNING):
                        statusWriteColor = ConsoleStyle.FgGreen;
                        break;
                    default:
                        statusWriteColor = ConsoleStyle.FgGray;
                        break;
                }

                os.write(`STATUS - ${status || "unknown status"}`, statusWriteColor);
                os.writeOut();
            })
        } else if (lowered == "start") {

        } else if (lowered == "halt") {

        } else if (lowered == "resume") {

        } else if (lowered == "stop") {

        } else if (lowered == "restart") {

        }
    }
} as Command;