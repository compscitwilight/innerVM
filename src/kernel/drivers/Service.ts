import { File } from "./fs/File";
import { error, evaluate } from "../cli/CommandLine";
import { Session } from "../data/session";

const LinebreakReplacement = "$LINEBREAK$";

/**
 * Extracts the value from (KEY=VALUE).
 * @param line The line that will get the value extracted.
 */
function extractValue(line: string) {
    return line.split(" ").splice(1).join(" ");
}

export class Service {
    public name?: string;
    public description?: string;
    public execCommand?: string;

    public methods?: ServiceMethod[];
    public props?: ServiceProp[];
    protected status?: ServiceStatus;

    public constructor(
        public sysAlias: string,
        public serviceFile: File
    ) {
        const content = serviceFile.content.split("\n").join(LinebreakReplacement).split(LinebreakReplacement);
        console.log(content)
        if (content[0].toLowerCase() !== "[service]") {
            error(`Invalid service file when starting a service with ${serviceFile.path}. Missing [Service] declaration at line 1.`);
            return;
        }

        for (var i = 0; i < content.length; i++) {
            const line = content[i].toLowerCase().replace(/ g/, "");
            let scannedMetadata = false;
            let scannedProps = false;
            let scannedMethods = false;

            /* SERVICE METADATA */
            if (!scannedMetadata && !scannedProps && !scannedMethods) {
                scannedMetadata = true;

                if (line.startsWith("name=")) {
                    const name = extractValue(line);
                    this.name = name;
                }

                if (line.startsWith("description=")) {
                    const description = extractValue(line);
                    this.description = description;
                }

                if (line.startsWith("execution=")) {
                    const execution = extractValue(line);
                    this.execCommand = execution;
                }
            }

            /* PROPS */
            if (!scannedMethods && scannedMetadata) {
                scannedProps = true;

                if (line == "[service.props]") {
                    this.props = new Array<ServiceProp>();
                }

                if (line == "[prop]") {
                    const propData = {
                        name: "",
                        value: 0,
                        type: ServicePropType.INTEGER
                    };

                    if (line.startsWith("name=")) {
                        const name = extractValue(line);
                        propData.name = name;
                    }

                    if (line.startsWith("type=")) {
                        const type = extractValue(line);
                        if (!Object.values(ServicePropType).find((t) => t == type)) {
                            error(`Invalid type for service prop ${this.serviceFile.path}.${propData.name}`);
                            this.halt();
                            break;
                        }
                    }

                    if (line.startsWith("value=")) {
                        const value = extractValue(line);
                        
                    }
                }
            }

            /* METHODS */
            if (scannedProps && scannedMetadata) {
                scannedMethods = true;
            }
        }

        Session.runningServices.push(this);
        this.status = ServiceStatus.RUNNING;
    };

    public getStatus() {
        return this.status;
    }

    /**
     * Restarts the service and briefly changes the status of the service
     * to ServiceStatus.RESTARTING.
     * 
     * (NOTE: this will remove the old service
     * instance from Session.runningServices and will return the new service.
     * Please use the new service returned from this method instead.)
     */
    public restart() {
        this.status = ServiceStatus.RESTARTING;
        const existingService = Session.runningServices.indexOf(this);
        if (existingService == -1) {
            error(`Service ${this.serviceFile.path} couldn't restart because it is not a valid service that has been started.`);
            this.status = ServiceStatus.HALTED;
            return;
        }

        const newInstance = new Service(this.sysAlias, this.serviceFile);
        Session.runningServices.splice(existingService, 1);
        Session.runningServices.push(newInstance);
        this.status = ServiceStatus.RUNNING;
        return newInstance;
    }

    /**
     * Resumes the service if the status was halted.
     */
    public resume() {
        this.status = ServiceStatus.RUNNING;
    }

    /**
     * Halts the service until it is resumed.
     */
    public halt() {
        this.status = ServiceStatus.HALTED;
    }
}

export class ServiceProp {
    public constructor(
        public name: string,
        public value: any,
        public type: ServicePropType
    ) {
        
    }
}

export class ServiceMethod {

}

export enum ServiceStatus {
    PAUSED = "PAUSED",
    RESTARTING = "RESTARTING",
    HALTED = "HALTED",
    RUNNING = "RUNNING"
}

export enum ServicePropType {
    STRING = "string",
    INTEGER = "integer",
    BOOLEAN = "boolean",
    JSON = "json"
}