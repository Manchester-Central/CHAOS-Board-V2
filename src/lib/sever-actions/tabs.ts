"use server";

import { TabsState, defaultInitialTabData } from "../data/tabState";
import fs from 'fs/promises';

export async function saveTabs(tabs: TabsState) {
  await fs.writeFile('./team_data/tabs.json', JSON.stringify(tabs, null, 4));
}

export async function getTabs(): Promise<TabsState> {
  try {
    const tabsString = await fs.readFile('./team_data/tabs.json', 'utf8');
    if (tabsString) {
      return JSON.parse(tabsString);
    }
  } catch (error) {
    console.warn(error);
  }
  await saveTabs(defaultInitialTabData);
  return defaultInitialTabData;
}