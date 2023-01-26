# Writing a kernel in InnerVM - Bootloaders
**Bootloaders** are a pretty important part of an operating system if you'd like to take advantage of storage device flexibility. A very reliable, easy, and fast bootloader that is used on the InnerVM platform is **Cakeloader**, which was originally developed for **InnerOS**.

Cakeloader can be used for virtually any InnerVM operating system (no pun intended). Because of how easy it is to customize, anyone can do it in a matter of a bit of knowledge, and a few minutes.

## Why should I implement a bootloader?
Implementing a bootloader into your operating system allows for the user to have more control over which storage devices they'd like to use. If you're a Linux user, you probably couldn't imagine the pain of using the kernel without GRUB.

Bootloaders just make things a lot easier for you, the end user, and the operating system (seriously). Cakeloader can be extended to support InnerOS alongside your own operating system (if you're into that) since it's only about 100+ lines.

## Implementing Cakeloader
**Cakeloader** is a 131 line TypeScript file, and can easily be edited with a bit of reverse engineering, but you don't really have to do that.

1. Inside of `index.ts`, add `rootDevice.write("[YOUR-OS-NAME].os", "operating system format");`
(note: please make sure that you are adding this to the root index.ts file, not the operating system's)
2. Paste Cakeloader's `index.ts` file into `/src/bootloader`.
3. Import your operating system's start method into Cakeloader
```ts
// EXAMPLE
import { startOS } from "../";
```
4. Add booting logic (in `/src/bootloader`)
```ts
switch (os) {
    case "inner.os":
        hardware.CPU.executeProcess(0x10, executeKernel);
        break;
    case "[your-os].os": // this is where you'll add your boot logic
        console.log("Tada! We've successfully booted our own operating system in Cakeloader!");
        hardware.CPU.executeProcess(0x10, startOS);
        break;
    default:
        panic("Invalid operating system instruction!", 0x10);
        break;
}
```

(go to <a href="./5 - File Systems.md">next page</a>)