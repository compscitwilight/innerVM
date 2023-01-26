import { ConsoleStyle } from "./ConsoleStyle";
export function validateStyle(style?: ConsoleStyle | ConsoleStyle[]) {
    let styleString = "";
    if (style) {
        if (!Array.isArray(style))
            styleString = style;
        else
            for (var i = 0; i < style.length; i++) {
                let str = style[i];
                styleString += str;
            };
    }
    return styleString;
}