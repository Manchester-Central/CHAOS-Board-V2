import { Tab } from "./tab";

const defaultNtKeys = [
  "/Shuffleboard/Logging/timeMs",
  "/FMSInfo/IsRedAlliance",
  "/SmartDashboard/Robot2024/State",
];

export const defaultInitialTabData = {
  currentTab: "Default",
  allTabs: {
    Default: {
      layout: [],
      name: "Default",
      widgets: defaultNtKeys.map((key) => ({ key })),
    },
  },
};

export interface TabsState {
  currentTab: string;
  allTabs: Record<string, Tab>;
}
