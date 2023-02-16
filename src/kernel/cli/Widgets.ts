import { ConsoleStyle } from "../../../util/ConsoleStyle";
import { Widget, WidgetTemplate } from "./Widget";

let TimeWidgetTemplates = [
    new WidgetTemplate(`[cutie!]`, [
        {
            identifier: "h",
            value: new Date().getHours()
        },
        {
            identifier: "m",
            value: new Date().getMinutes()
        }
    ], [ ConsoleStyle.BgBlack, ConsoleStyle.FgMagenta ])
];
export let TimeWidget = new Widget("time", TimeWidgetTemplates);
