import { NtEntry } from "../data/ntEntry";
import { Widget } from "../data/widget";
import { BooleanWidgetRegistration } from "./implementations/BooleanWidget";
import { SimpleTextWidgetRegistration } from "./implementations/SimpleTextWidget";
import { WidgetRegistration } from "./widget-registration";

const defaultWidgetRegistation = SimpleTextWidgetRegistration;

export const AllWidgets: WidgetRegistration[] = [
    SimpleTextWidgetRegistration,
    BooleanWidgetRegistration,
]

export function getCompatibleWidgets(ntEntry: NtEntry | undefined) {
    if (!ntEntry) {
        return [...AllWidgets];
    }
    return AllWidgets.filter(w => w.isWidgetApplicable(ntEntry));
}

export function getWidgetRegistration(widget: Widget) {
    return AllWidgets.find(w => w.widgetKey === widget.widgetType) ?? defaultWidgetRegistation;
}