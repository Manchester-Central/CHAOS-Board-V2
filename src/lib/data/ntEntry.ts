import { NetworkTablesTypeInfo, NetworkTablesTypes } from "ntcore-ts-client";

export interface NtEntry {
  value?: NetworkTablesTypes | undefined | null;
  key: string,
  type: NetworkTablesTypeInfo[1],
}