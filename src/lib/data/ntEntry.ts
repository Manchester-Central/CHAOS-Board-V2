import { NetworkTablesTypeInfo, NetworkTablesTypes } from "ntcore-ts-client";

export interface NtEntry {
  value?: NetworkTablesTypes | undefined | null;
  key: string,
  type: NetworkTablesTypeInfo[1],
}

export function getEntryParentPath(entryKey: string) {
  return entryKey.substring(0, entryKey.lastIndexOf("/") + 1);
}

export function getEntryName(entryKey: string) {
  return entryKey.substring(entryKey.lastIndexOf("/") + 1);
}

export function getFilteredAndSortedList(entries: NtEntry[], filterText: string = '') {
  filterText = filterText.toLowerCase();
  return entries
    .filter(entry => entry.key.toLowerCase().includes(filterText))
    .filter(entry => !entry.key.includes('.')) // removes any 'hidden' values
    .sort((a, b) => a.key.localeCompare(b.key));
}