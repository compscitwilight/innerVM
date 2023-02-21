/*
    This file is used to store module information, which will be kept in memory
    along with the file that invoked any of these functions.
*/

const modules = new Map<string, ModuleData>();

export interface ModuleData {
    NAME?: string,
    DESCRIPTION?: string,
    AUTHOR?: string,
    DATE?: string
};

export function _MODULE_NAME(name: string) {
    return name;
};

export function _MODULE_DESCRIPTION(desc: string) {
    return desc;
};

export function _MODULE_AUTHOR(author: string) {
    return author;
};

export function _MODULE_DATE(date: string) {
    return date;
};