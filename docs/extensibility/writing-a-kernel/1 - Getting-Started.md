# Writing a kernel in InnerVM - Getting started
This documentation file is a getting started guide for writing a simple kernel operating system on the InnerVM platform, using the provided tools that come with the virtual machine package.

## Preparation
With a fresh installation of InnerVM, there are some things that you are going to need to do before you can start writing your very own operating system.

### 1 - Removing InnerOS
InnerVM comes preinstalled with a basic operating system called "InnerOS". It was created to demonstrate the capabilities of InnerVM, but majority of the functionality of this operating system relies on itself. Because we're writing an operating system from scratch on InnerVM, we must remove this operating system. To do so, open up the `/src` folder and delete `/kernel` and `/bootloader`. (please remember to keep `/bios`, as this is used by the motherboard's firmware).

### 2 - Creating your operating system's directory
Once InnerOS is removed from InnerVM, you can create a directory that will house all of the components of your operating system. You can name it whatever you want, but we suggest just naming it the name of the operating system you will create.

### 3 - Creating the file structure
Before adding anything to your newly created directory, it is best practice to install the InnerSession file, which is a file that keeps track of data that is very important to third-party InnerVM libraries, and your operating system itself.

After your operating system's directory is created, you can go ahead and create the files and directories that you need to get started. You can structure it however you'd like with whatever files you want, but it is recommended that you start out with a simple file tree, similar to InnerOS.

Your directory should contain: `index.ts`, `CLI.ts`, `session.ts` (recommended), and `Processes.ts`. These are the foundations of your operating system.

(go to <a href="./2 - Index-File.md">next page</a>)