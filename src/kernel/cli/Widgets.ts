import { ConsoleStyle } from "../../../util/ConsoleStyle";
import { Widget, WidgetTemplate } from "./Widget";

let TimeWidgetTemplates = [
    new WidgetTemplate(`[%h:%m]`, [
        {
            identifier: "h",
            value: new Date().getHours()
        },
        {
            identifier: "m",
            value: new Date().getMinutes()
        }
    ], [ ConsoleStyle.BgBlack, ConsoleStyle.FgGreen ])
];
export let TimeWidget = new Widget("time", TimeWidgetTemplates);
