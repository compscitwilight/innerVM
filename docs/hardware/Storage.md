# Storage
**Storage** is a component in InnerVM that acts as computer storage. InnerVM can operate many different storage devices, and these storage devices contain read/write/delete methods that can assist in file-system development. InnerVM comes out of the box with a `"root"` storage device, which is the default boot device for most operating systems and bootloaders that run on InnerVM.

## Storage devices
Storage devices are contained in an array of `StorageDevice`s. This array can be changed as you'd like in the `/hardware/Storage.ts` file. You can add as many storage devices as you'd like.

### Read, Write, and Delete
Storage devices contain 3 different methods. These methods are used for writing, reading, and deleting files on the storage device.