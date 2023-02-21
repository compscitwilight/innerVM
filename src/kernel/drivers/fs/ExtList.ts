/**
 * A standardized enum containing numerous different file extensions commonly used in InnerFS.
 */
export enum FileExtensions {
    /**
     * A file extension commonly used by plain text files.
     */
    txt = ".txt",

    /**
     * A file extension used by executable applications.
     */
    app = ".app",

    /**
     * A file extension that is used by libraries. They usually contain IBatch code that can be included into
     * other IBatch scripts.
     */
    lib = ".lib",

    /**
     * A file extension commonly used for external binaries, and is open to be used by any application that supports
     * InnerFS.
     */
    ext = ".ext",

    /**
     * A file extension used for compressed files, similar to .zip
     */
    cmp = ".cmp",

    /**
     * A file extension used for disk images. It is used by cakeL when InnerFS is being used.
     */
    os = ".os",

    /**
     * A file extension used for IBatch scripts, Inner's own shell scripting language.
     */
    ibt = ".ibt",

    /**
     * A file extension used for services.
     */
    svc = ".svc",

    /**
     * A file extension used for widgets in InnerOS based operating systems.
     */
    widg = ".widg",

    /**
     * A file extension reserved for use by the pckg package manager, and in InnerOS based operating systems.
     */
    pckg = ".pckg",

    /**
     * A file extension that is used for mounted storage devices in InnerOS based operating systems.
     */
    mnt = ".mnt",

    /**
     * A file extension used for containing data sent from websites.
     */
    web = ".web",

    /**
     * A file extension used for configuration files.
     */
    conf = ".conf",

    /**
     * A file extension used for audio metadata files.
     */
    adata = ".adata"
}