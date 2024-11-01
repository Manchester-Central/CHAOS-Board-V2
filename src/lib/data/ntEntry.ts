import { NetworkTablesTypeInfo, NetworkTablesTypes } from "ntcore-ts-client";

export interface NtEntry {
  value?: NetworkTablesTypes | undefined | null;
  key: string,
  type: NetworkTablesTypeInfo[1],
}

export function getEntryParentPath(entry: NtEntry) {
  return entry.key.substring(0, entry.key.lastIndexOf("/") + 1);
}

export function getEntryName(entry: NtEntry) {
  return entry.key.substring(entry.key.lastIndexOf("/") + 1);
}