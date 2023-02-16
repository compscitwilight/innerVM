export enum PermissionLevel {
    /**
     * No restrictions on who can manage this entity.
     */
    NONE = 0,

    /**
     * Little restrictions on who can manage this entity.
     * 
     * * Deleting requires sufficient permissions
     * * Editing requires sufficient permissions
     */
    BASIC = 1,

    /**
     * Medium restrictions on who can manage this entity. This restriction is intended to be used
     * for users who would like light security on their files, but also open to authorized users.
     * 
     * * Deleting requires sufficient permissions
     * * Reading requires sufficient permissions
     * * Writing requires sufficient permissions
     * * Editing requires sufficient permissions
     */
    OWNER = 2,

    /**
     * High level restrictions on who can manage this entity. This permission level is intended for
     * system-wide files such as programs, media, and configuration files.
     * 
     * * Deleting requires sufficient permissions
     * * Writing requires sufficient permissions
     * * Editing requires sufficient permissions
     */
    ADMIN = 3,

    /**
     * Highest level of restriction on who can manage this entity. This permission level is intended for
     * system files that are crucial to the performance of the operating sytem itself.
     * 
     * * Deleting requires sufficient permissions
     * * Reading requires sufficient permissions
     * * Writing requires sufficient permissions
     * * Viewing requires sufficient permissions
     * * Editing requires sufficient permissions
     */
    SYSTEM = 4
}