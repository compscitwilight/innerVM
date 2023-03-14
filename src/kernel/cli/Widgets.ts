import { ConsoleStyle } from "../../../util/ConsoleStyle";
import { Widget, WidgetTemplate } from "./Widget";

let TimeWidgetTemplates = [
    new WidgetTemplate(`[G.O.A.T]`, [
        {
            identifier: "h",
            value: new Date().getHours()
        },
        {
            identifier: "m",
            value: new Date().getMinutes()
        }
    ], [ ConsoleStyle.BgBlack, ConsoleStyle.FgYellow ])
];
export let TimeWidget = new Widget("time", TimeWidgetTemplates);
