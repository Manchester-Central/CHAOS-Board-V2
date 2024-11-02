"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loadInitialTabs, updateTab } from "@/lib/redux/tabsSlice";
import { useEffect } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import { getClient } from "../lib/networktables/NTClient";
import styles from "./page.module.css";
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { getTabs } from "@/lib/sever-actions/tabs";
import WidgetDisplay from "./components/WidgetDisplay";

const FullGridLayout = WidthProvider(GridLayout);

export default function Home() {
  const dispatch = useAppDispatch();
  const currentTabName = useAppSelector(app => app.tabs.currentTabName);
  const currentTab = useAppSelector(app => app.tabs.allTabs[app.tabs.currentTabName]);
  const isEditingLayout = useAppSelector(data => data.ui.isEditingLayout);

  useEffect(() => {
    getClient().then(() => console.log('connected')).catch(error => console.error(error));
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
      <FullGridLayout 
        isDraggable={isEditingLayout}
        isDroppable={isEditingLayout}
        isResizable={isEditingLayout}
        layout={currentTab.layout}
        className="layout"
        cols={20}
        rowHeight={50}
        compactType={null}
        autoSize={true}
        resizeHandles={["sw", "nw", "se", "ne"]} 
        onLayoutChange={updateLayout}
        preventCollision={true}
        allowOverlap={true}
      >
        {currentTab.widgets.map((widget) => <div key={widget.key}>
          <WidgetDisplay widget={widget} />
        </div>)}
      </FullGridLayout>
    </div>
  );
}
