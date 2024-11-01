import { Tab } from "./tab";

export const defaultInitialTabData: TabsState = {
  currentTabName: "Default",
  allTabs: {
    Default: {
      layout: [],
      name: "Default",
      widgets: [],
    },
  },
};

export interface TabsState {
  currentTabName: string;
  allTabs: Record<string, Tab>;
}
