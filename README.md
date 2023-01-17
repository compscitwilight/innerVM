# innerVM
An experiment to see how far I can go with making a virtual machine, bootloader, and kernel in the language of TypeScript.

## About
This project started in mid January 2023 as a bit of a joke project to see if I was even able to create a bootloader with the virtual hardware I wrote. After that, I kind of just went from there.

I wrote things such as the Kernel and BIOS, and doing so caused a lot of the codebase to change as well. The project has gone from a silly little side-project to basically my full-time project with the amount of learning that I am experiencing from making it come true.

Unlike other virtual machines, this one doesn't take advantage of legitimate virtualization. It works a lot more on the backend than anything, and can be completely customized if you'd like. If you want to write your own kernel to replace innerOS, then go for it, and since the runtime enviornment is Node.js, you can add as many packages as you desire to help your development.

The only thing that is really important about this project is `/index.ts` and `/hardware/`, since those are the guts of the entire virtual machine. Everything inside of `/src/` is miscellaneous.

## Use case
Well, if you've ever wanted to write your own operating system without having to deal with the (traditional) struggles of OS development, then this is the project for you.

## Terminology
### InnerVM Specific
`Third wall` - Whenever a piece of software being ran on this virtual machine "breaks the fourth wall", it usually means that it acknowledges the fact that it is in fact a virtual machine, and not a physical computer.

### General
`Kernel` - A kernel is a computer program which works with the operating system to provide low-level control. It manages things such as user input.
`Bootloader` - A bootloader is a computer program which is executed whenever the computer starts. It allows the user to select an operating system that is avaliable on their storage devices, and handles that for the user.
`BIOS` - The BIOS is a firmware which allows the user to manage hardware such as the motherboard, CPU, storage, and memory.