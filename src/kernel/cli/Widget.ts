import { ConsoleStyle } from "../../../util/ConsoleStyle";
import { CPUProcess } from "../../../hardware/CPU";
import { validateStyle } from "../../../util/ValidateStyle";
import { panic } from "../index";

/**
 * A class that creates a widget that will be shown before the command line. It contains WidgetTemplates,
 * which can be refreshed every WidgetTemplate.timeout.
 */
export class Widget {
    /**
     * Identification number of the widget, which is created when the class is initialized.
     */
    public id: number;
    public constructor(
        /**
         * The name of the widget that will be shown in the processes.
         */
        public name: string,
        /**
         * Array of WidgetTemplates that will be part of this widget.
         */
        public templates: WidgetTemplate[]
    ) {
        this.id = Math.floor(Math.random() * 99999999);
    };
}

export interface WidgetTemplateValue {
    /**
     * The name of the widget template value.
     */
    identifier: string,
    /**
     * The value of the widget template.
     */
    value: any
}

export class WidgetTemplate {
    /**
     * Controls whether or not the widget will be refreshing every (timeout).
     */
    private looping: boolean = true;
    /**
     * The amount of time between each refresh.
    */
    public timeout: number;

    public constructor(
        /**
         * The raw text that will be shown in the WidgetTemplate, before refreshes.
         */
        public text: string,
        /**
         * All of the WidgetTemplates that will be part of the widget.
         */
        public templates: WidgetTemplateValue[],
        /**
        * Styles to be rendered for the widget.
        */
        protected styles?: ConsoleStyle[]
    ) {
        this.timeout = 1000;
        this.startCallbackLoop();
    };

    private startCallbackLoop() {
        this.refresh();
        setTimeout(() => {
            this.startCallbackLoop();
        }, this.timeout);
    }

    public refresh() {
        if (this.styles) {
            let styleString = validateStyle(this.styles);
            this.text = (styleString + this.text + ConsoleStyle.Reset);
        }
        let templates = this.templates;
        this.text = (this.text + "");
        console.log(templates)
        for (var i = 0; i < templates.length; i++) {
            console.log();
            let template = templates[i];
            let identifier = `%${template.identifier}`;
            let indexInText = this.text.indexOf(identifier);
            if (!this.text.at(indexInText)) {
                panic(`Component error - widget_${this.text}`);
                break;
            }

            this.text.replace(identifier, template.value);
            break;
        }
    }
}