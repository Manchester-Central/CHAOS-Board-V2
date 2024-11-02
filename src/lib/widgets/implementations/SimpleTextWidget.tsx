"use client";

import { Widget } from "@/lib/data/widget";
import { useAppSelector } from "@/lib/redux/hooks";
import { WidgetRegistration } from "../widget-registration";

interface SimpleTextWidgetProps {
  widget: Widget;
}
export function SimpleTextWidget({ widget }: SimpleTextWidgetProps) {
  const entry = useAppSelector((app) => app.nt.data[widget.key]);

  return (
    <div style={{width: '100%', minHeight: '100%', alignContent: 'center', textAlign: 'center',}}>
      {entry?.value?.toString()}
    </div>
  );
}

export const SimpleTextWidgetRegistration: WidgetRegistration = {
  widgetKey: "Simple Text",
  isWidgetApplicable: () => {
    return true;
  },
  getComponent: (widget: Widget) => {
    return <SimpleTextWidget widget={widget} />
  }
}

