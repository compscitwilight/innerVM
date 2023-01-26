# Memory
The **Memory** component is responsible for handling RAM (random access memory). The developer has the ability to allocate and deallocate memory to specific memory addresses, which is required when executing a process with the <a href="./CPU.md">CPU</a>.

## Allocating and deallocating
With the memory component, the developer has the ability to allocate and deallocate memory. When allocating memory, you are specifying a specific amount of memory to be used for that memory address. When you are deallocating memory, you are removing memory from a specific memory address.

If you deallocate from a memory address without specifying how much memory you are deallocating, you will deallocate all memory from that memory address.

## Memory addresses
Memory addresses in the InnerVM are hexadecimal values that are usually unique to each allocation. They are also important when starting CPU processes are they are a required parameter.

### Memory address best practice
When writing an operating system on the InnerVM, it is best practice to reserve `0x1` and `0x2` to either the bootloader or the kernel. Whenever you are handling multiple processes that are executed by the user, it is also best practice to keep track of how many processes the user is using to prevent duplicate allocations. This can cause issues in the long run if you do not.