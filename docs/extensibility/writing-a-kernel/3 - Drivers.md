# Writing a kernel in InnerVM - Drivers
**Drivers** are an important part of your operating system. Drivers usually consist of network, power, sound, and time. With a `/drivers` directory in your operating system, you will easilly be able to execute methods related to these drivers.

## Basic drivers
There are some basic drivers that most operating system should have.

### ACPI
The ACPI (advanced configuration and power interface) is a very important driver in operating systems. The ACPI is in charge of the computer's power, such as shutting down, restarting, sleep mode, etc.

You can create a `/ACPI.ts` file in the `/drivers` directory that can be used to execute power functions. (of course, since this is a virtual machine, it merely consists of killing the VM process).
```ts
export class ACPI {
    public static shutdown(code: number) {
        process.exit(code);
    }
}
```

### Network
A network driver is a useful driver for operating systems that will be using HTTP or other protocols and networks. A network driver can usually consist of HTTP related things, such as fetching data from websites, but can also be used for things like connecting to Wi-fi networks and such.

#### Basic HTTP based network driver
```ts
import axios from "axios";
export class Network {
    public static async request(url: string) {
        let response = await axios.get(url);
        return response;
    }
}
```

### Time
A time driver can be used to keep track of time. This can consist of uptime, Unix epoch, or real world time.
```ts
export class Time {
    public static getUTC() {
        return new Date().getUTCHours();
    }

    public static epoch() {
        return Date.now();
    }
}
```

Of course, you can write whatever drivers you want for whatever use case your operating system will be used for.
(go to <a href="./4 - Bootloaders.md">next page</a>)