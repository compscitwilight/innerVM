import { File } from "./fs/File";
import { error, evaluate } from "../cli/CommandLine";
import { Session } from "../data/session";
import hardware from "../../../hardware";

const LinebreakReplacement = "$LINEBREAK$";

/**
 * Extracts the value from (KEY=VALUE).
 * @param line The line that will get the value extracted.
 */
function extractKeyValue(line: string) {
    const segments = line.split("=");
    return [segments[0], segments.splice(1).join(" ")]
}

export class Service {
    public name?: string;
    public description?: string;
    public execCommand?: string;

    public methods: ServiceMethod[] = new Array<ServiceMethod>();
    protected status?: ServiceStatus;

    public constructor(
        public sysAlias: string,
        public serviceFile: File
    ) {
        function formatContent() {
            return serviceFile.content.split("\n").join(LinebreakReplacement).split(LinebreakReplacement).filter((l) => {
                return !l.startsWith("#");
            });
        }
        const content = formatContent();
        if (content[0].toLowerCase() !== "[service]") {
            error(`Invalid service file when starting a service with ${serviceFile.path}. Missing [Service] declaration at line 1.`);
            return;
        }
        if (!content.toLocaleString().toLowerCase().includes("[service.methods]")) {
            error(`Missing [Service.Methods] declaration in ${serviceFile.path}.`);
            return;
        }

        const serviceMethodsStartIndex = content.indexOf("[Service.Methods]");
        const metadataFields = formatContent().splice(0, serviceMethodsStartIndex);
        for (var i = 0; i < metadataFields.length; i++) {
            const field = metadataFields[i];
            if (field.includes("=")) {
                const [key, value] = extractKeyValue(field);
                const lowered = key.toLowerCase();
                if (lowered == "name") {
                    this.name = value;
                } else if (lowered == "description") {
                    this.description = value;
                }
            }
        }

        function getMethods() {
            return formatContent().splice(serviceMethodsStartIndex, formatContent().length);
        }

        const methods = getMethods();
        for (var i = 0; i < methods.length; i++) {
            const line = methods[i];
            if (line.toLowerCase() == "[method]") {
                const keyValues: Array<{key: string, value: string}> = [];;
                const section = methods.splice(0, i);
                let nextMethod = 0;
                for (var d = 0; d < section.length; d++) {
                    const duplicate = section[d];
                    if (duplicate.toLowerCase() == "[method]" && d !== i)
                        nextMethod = d;
                }

                if (nextMethod > 0)
                    section.splice(nextMethod, section.length);

                for (var s = 0; s < section.length; s++) {
                    const [key, value] = extractKeyValue(section[s]);
                    keyValues.push({
                        key: key,
                        value: value
                    })
                }
                
                const methodData = {
                    name: "",
                    description: "",
                    execution: ""
                }

                for (var kv = 0; kv < keyValues.length; kv++) {
                    const keyValue = keyValues[kv];
                    const key = keyValue.key.toLowerCase();
                    const value = keyValue.value;

                    if (key == "name")
                        methodData.name = value;
                    if (key == "description")
                        methodData.description = value;
                    if (key == "execution")
                        methodData.execution = value;
                }

                if (methodData.name && methodData.execution)
                    this.createMethod(methodData.name, methodData.execution, methodData.description || "");
            }
        }

        hardware.Memory.allocate(0x0005, 1);
        hardware.CPU.executeProcess(0x0005, (process) => {
            process.alias = this.name;
        })
        Session.runningServices.push(this);
        this.status = ServiceStatus.RUNNING;
    };

    /**
     * 
     * @returns The status of the service
     */
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

    /**
     * Creates a new method for the service.
     * @param name The name of the method
     * @param execution The command that will be executed whenever the method is invoked
     * @param description The description of the method
     */
    public createMethod(name: string, execution: string, description?: string) {
        const method = new ServiceMethod(name, execution, description);
        this.methods.push(method);
    }

    public getMethod(name: string) {
        return this.methods.find((method) => method.name == name);
    }

    /**
     * Executes a service method with the given name.
     * @param methodName The name of the method
     */
    public executeMethod(methodName: string, args?: string[]) {
        const method = this.getMethod(methodName);
        if (!method) {
            error(`Invalid method ${this.sysAlias}.${method}`);
            return;
        }
        method.execute();
    }
}

export class ServiceMethod {
    public constructor(
        public readonly name: string,
        public readonly execution: string,
        public readonly description?: string
    ) { }

    public execute() {
        return evaluate(this.execution)
    }
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