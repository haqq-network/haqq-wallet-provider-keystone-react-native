/// <reference types="node" />
import { CryptoAccount, CryptoHDKey, RegistryItem } from "@keystonehq/bc-ur-registry-eth";
export declare function uuidv4(): string;
export declare function isCryptoHDKey(item: RegistryItem): item is CryptoHDKey;
export declare function isCryptoAccount(item: RegistryItem): item is CryptoAccount;
export declare function hexBuffer(str: string): Buffer;
export declare function splitPath(path: string): number[];
