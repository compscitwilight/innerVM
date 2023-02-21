import { join } from "path";
import { readFileSync, existsSync } from "fs";
import { ConsoleStyle } from "../util/ConsoleStyle";
import CPU from "./CPU";
import Memory from "./Memory";

/**
 * Hardware component that is responsible for rendering graphics.
 */
export default class Graphics {
    public static readonly maxBuffers = 256;
    public static readonly maxBitsPerBuffer = 1024;
    /**
     * Parses IGFX (Inner Graphics Shader) code, and renders it.
     * @param code The code that will be parsed.
     */
    public static parseIGFX(code: string) {
        const lines = code.split("\n");
    };

    public static createRender() {

    };
}

export class IGFXRender {
    public buffers: IGFXBuffer[] = new Array<IGFXBuffer>();
    public constructor() {};

    /**
     * Draws a buffer to the render.
     * @param noRender Prevents the render from redrawing after drawing the buffer.
     */
    public drawBuffer(noRender?: boolean) {
        
    }

    public render() {

    }
}

export class IGFXBuffer {
    public bits: BufferBit[] = new Array<BufferBit>();
    public constructor() {};

    public drawBit(bit: BufferBit) {
        if (this.bits.length == Graphics.maxBitsPerBuffer) return;
        Memory.allocate(0xb12, 1);
        CPU.executeProcess(0xb12, (process) => {
            process.write(" ", bit.color);
        })
    };

    public drawBits(bits: BufferBit[]) {
        bits.forEach((bit) => {
            this.drawBit(bit);
        })
    };
}

export interface BufferBit {
    color: ConsoleStyle
}

const path = process.argv[2];
if (path && existsSync(join(__dirname, path))) {
    const content = readFileSync(join(__dirname, path)).toString();
    Graphics.parseIGFX(content);
} else {
    console.log("IGFX file doesn't exist.");
}