export enum Unit {
    BIT = "bit",
    BYTE = "byte",
    KILOBYTE = "kilobyte",
    MEGABYTE = "megabyte",
    GIGABYTE = "gigabyte",
    TERABYTE = "terabyte",
    PETABYTE = "petabyte"
}

export function convertBit(val: number, unit: Unit) {
    switch (unit) {
        case Unit.BIT:
            return (val);
        case Unit.BYTE:
            return (val / 8);
        case Unit.KILOBYTE:
            return (val / 8000);
        case Unit.MEGABYTE:
            return (val / 8000000);
        case Unit.GIGABYTE:
            return (val / 8000000000);
        case Unit.TERABYTE:
            return (val / 8000000000000);
        case Unit.PETABYTE:
            return (val / 8000000000000000);
    }
}