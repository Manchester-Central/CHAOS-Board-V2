"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loadInitialTabs, updateTab } from "@/lib/redux/tabsSlice";
import { useEffect, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import { getClient } from "../lib/networktables/NTClient";
import styles from "./page.module.css";
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { getTabs } from "@/lib/sever-actions/tabs";

const FullGridLayout = WidthProvider(GridLayout);

export default function Home() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(data => data.nt.data);
  const currentTabName = useAppSelector(app => app.tabs.currentTabName);
  const currentTab = useAppSelector(app => app.tabs.allTabs[app.tabs.currentTabName]);

  useEffect(() => {
    getClient().then(() => console.log('connected')).catch(error => console.error(error));
    // setLayout(getLayout());
    getTabs().then(tabs => dispatch(loadInitialTabs(tabs)));
  }, []);

  const updateLayout = (layout: GridLayout.Layout[]) => {
    const tabUpdate = {...currentTab, layout};
    dispatch(updateTab(tabUpdate));
  }

  if (!currentTab?.layout) {
    return <>Loading... {JSON.stringify(currentTab ?? {})} {currentTabName}</>
  }

  return (
    <div className={styles.page}>
      <FullGridLayout layout={currentTab.layout} className="layout" cols={20} rowHeight={50} compactType={null} autoSize={true} resizeHandles={["sw", "nw", "se", "ne"]} onLayoutChange={updateLayout}>
        {currentTab.widgets.map((widget) => <div key={widget.key} style={{padding: 10}}><div style={{overflow: 'auto', minHeight: '100%', maxHeight: '100%'}}>{widget.key} <br /> {data[widget.key]?.value?.toString()}</div></div>)}
      </FullGridLayout>
    </div>
  );
}
