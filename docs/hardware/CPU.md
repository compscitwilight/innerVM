# CPU - (central processing unit)
The **CPU** is the component responsible for handling processes. It acts as the "brain" of the computer. Inside of the InnerVM, the CPU component is responsible for the same sort of things that your CPU is responsible for.

The set of *instructions* that are read by the InnverVM are different from your physical computer's CPU. The InnerVM CPU uses TypeScript functions that can be used on a higher level.

The InnerVM CPU works hand and hand with the <a href="./Memory.md">Memory</a> component. Whenever a process is executed on the InnerVM CPU, it will search the memory for the memory address that was provided to execute the process. If the memory address has not be allocated, then the CPU process will not be executed because it doesn't have sufficient resources.

## Processes
The `CPUProcess` class is returned whenever you execute a process on the InnverVM CPU. It contains numerous methods related to the process, such as input and output streams, child processes, and metadata associated with the process.