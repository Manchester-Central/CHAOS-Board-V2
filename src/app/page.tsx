"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { getClient } from "../lib/networktables/NTClient";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";

import { Responsive, WidthProvider } from "react-grid-layout";

const FullGridLayout = WidthProvider(GridLayout);

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

const defaultNtKeys = [
  '/Shuffleboard/Logging/timeMs',
  '/FMSInfo/IsRedAlliance',
  '/SmartDashboard/Robot2024/State',
]

function saveLayout(layout: GridLayout.Layout[]) {
  console.log(layout);
  localStorage.setItem('grid-layout', JSON.stringify(layout));
}

function getLayout() {
  try {
    const layoutString = localStorage.getItem('grid-layout');
    if (layoutString) {
      console.log(layoutString);
      return JSON.parse(layoutString);
    }
  } catch (error) {
    console.warn(error);
  }
  return defaultNtKeys.map(key => ({i: key}));
}

export default function Home() {
  const data = useAppSelector(data => data.ntSlice.data);
  const isConnected = useAppSelector(data => data.ntSlice.isConnected);
  const [layout, setLayout] = useState<GridLayout.Layout[]>();

  useEffect(() => {
    getClient().then(() => console.log('connected')).catch(error => console.error(error));
    setLayout(getLayout());
  }, []);

  if(!layout) {
    return <>Loading...</>
  }

  return (
    <div className={styles.page}>
      {isConnected.toString()}
      <FullGridLayout layout={layout} className="layout" cols={20} rowHeight={50} compactType={null} autoSize={true} resizeHandles={["sw", "nw", "se", "ne"]} onLayoutChange={saveLayout}>
        {defaultNtKeys.map((key) => <div key={key} style={{padding: 10}}><div style={{overflow: 'auto', minHeight: '100%', maxHeight: '100%'}}>{data[key]?.toString()}</div></div>)}
      </FullGridLayout>
    </div>
  );
}
