import { Widget } from "./widget";
import GridLayout from "react-grid-layout";

export interface Tab {
  name: string;
  layout: GridLayout.Layout[];
  widgets: Widget[];
}
