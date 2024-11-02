"use client";

import { Widget } from "@/lib/data/widget";
import { useAppSelector } from "@/lib/redux/hooks";
import { WidgetRegistration } from "../widget-registration";

interface BooleanWidgetProps {
  widget: Widget;
}
export function BooleanWidget({ widget }: BooleanWidgetProps) {
  const entry = useAppSelector((app) => app.nt.data[widget.key]);

  const bgColor = entry?.value?.toString()?.toLowerCase() === 'true'
    ? '#beff9b'
    : '#ff7b7b';

  return (
    <div style={{width: '100%', minHeight: '100%', backgroundColor: bgColor, alignContent: 'center', textAlign: 'center',}}>
      {entry?.value?.toString()}
    </div>
  );
}

export const BooleanWidgetRegistration: WidgetRegistration = {
  widgetKey: "Boolean",
  isWidgetApplicable: () => {
    return true;
  },
  getComponent: (widget: Widget) => {
    return <BooleanWidget widget={widget} />
  },
  removeParentPadding: true,
}

