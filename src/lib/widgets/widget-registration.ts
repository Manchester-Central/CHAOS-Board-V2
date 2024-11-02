import React from "react";
import { NtEntry } from "../data/ntEntry";
import { Widget } from "../data/widget";

export interface WidgetRegistration {
    widgetKey: string;
    isWidgetApplicable: (ntEntry: NtEntry) => boolean;
    getComponent: (ntEntryKey: Widget) => React.JSX.Element;
    removeParentPadding?: boolean;
}
