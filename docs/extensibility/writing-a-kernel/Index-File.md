# Writing a kernel in InnerVM - index.ts
This documentation page documents how to create a good `index.ts` file for your InnerVM operating system.

## Basics
With an empty `index.ts` file, you should paste the following code below.
```ts
import hardware from "../hardware";
import { createInterface } from "readline";

/**
 * If you'd like to use cakeLoader, then you can easily modify it to work with your operating system, as long as you have a function to
 * execute your operating system. 
**/
export function startOS() {
    let osMemAddr = 0x1; // it is best practice to keep track of the important memory addresses in variables.
    let io = createInterface({
        input: process.stdin,
        output: process.stdout
    })

    // Allocating memory to 0x1 and executing 0x1. Read the docs on CPU and Memory if you do not understand this as it will help you in the long run.
    hardware.Memory.allocate(osMemAddr, 1000000);
    hardware.CPU.executeProcess(osMemAddr, (os) => {
        os.write("Welcome to your very first operating system!");
        os.writeOut();
        createCLI();

        function createCLI() {
            io.question("> ", (res: string) => {
                switch (res.toLowerCase()) {
                    case "ping":
                        os.write("pong");
                        os.writeOut();
                        break;
                    default:
                        os.write("Invalid command");
                        os.writeOut();
                        createCLI();
                        break;
                }
            })
        }
    })
}
```

This is a basic InnerVM operating system that contains a `ping` command. A good index file for your operating system is a great start, as it prevents confusion in the future. Make sure to keep this file as simple as possible, and use external files for other things such as drivers, commands, etc.

(go to the <a href="./Drivers.md">next page</a>)