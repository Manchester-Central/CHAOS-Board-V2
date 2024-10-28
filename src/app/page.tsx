'use client'

import { useAppSelector } from "@/lib/redux/hooks";
import { getClient } from "../lib/networktables/NTClient";
import styles from "./page.module.css";
import { useEffect } from "react";

export default function Home() {
  const timeMs = useAppSelector(data => data.ntSlice.data['/Shuffleboard/Logging/timeMs'] as number)
  const data = useAppSelector(data => data.ntSlice.data)

  useEffect(() => {
    getClient().then(() => console.log('connected')).catch(error => console.error(error));
  }, []);

  return (
    <div className={styles.page}>
      {timeMs}
      <table style={{padding: 100, maxWidth: '100vw'}}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => 
            <tr key={key}>
              <td>{key}</td>
              <td>{value?.toString() ?? ''}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
