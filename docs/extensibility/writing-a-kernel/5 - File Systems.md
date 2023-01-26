# Writing a kernel in InnerVM - File Systems
**File systems** can be a pretty complex topic, and in the world of operating systems there are a lot of file systems (btrfs, fat32, ntfs, etc). On the InnerOS platform, you have the choice of either writing your own custom file system, or using a community made file system. In this documentation, we will be using InnerFS, which is used as the file system for InnerOS.

## Why should I implement a file system?
File system are extremely handy because they organize files. In InnerVM, files and directories do not exist. All *files* are just paths assigned a value (the content). With a file system, we are implementing a lot more features such as directories, file formats (for executing programs), and organization.

## Implementing a file system into your operating system
Download InnerFS and paste the directory into your operating system's folder (please also make sure to update the imports). After you have done this, add these lines to your OS's index file.

```ts
import { formatDisk } from "./fs/FileSystem";

// This function will format the loaded storage device's files and directories so that they can work smoothly with InnerFS
formatDisk();
```