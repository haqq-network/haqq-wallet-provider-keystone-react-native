/// <reference types="node" />
import { CryptoAccount, CryptoHDKey, RegistryItem } from '@keystonehq/bc-ur-registry-eth';
export declare function uuidv4(): string;
export declare function uuidV4Stringify(buffer: Buffer | string): string;
export declare function isCryptoHDKey(item: RegistryItem): item is CryptoHDKey;
export declare function isCryptoAccount(item: RegistryItem): item is CryptoAccount;
export declare function hexBuffer(str: string | Buffer): Buffer;
export declare function splitPath(path: string): number[];
export type ValidInputTypes = Uint8Array | bigint | string | number | boolean;
export declare type HexString = string;
export declare type Bytes = Uint8Array | HexString;
/**
 * Converts value to it's hex representation
 */
export declare const numberToHex: (value: ValidInputTypes) => string;
export declare const isHexStrict: (hex: ValidInputTypes) => boolean;
/**
 * Adds a padding on the left of a string, if value is a integer or bigInt will be converted to a hex string.
 */
export declare const padLeft: (value: ValidInputTypes, characterAmount: number, sign?: string) => string;
export declare function hexToUint8Array(hex: string): Uint8Array;
/**
 * Convert a value from bytes to Uint8Array
 * @param data - Data to be converted
 * @returns - The Uint8Array representation of the input data
 *
 * @example
 * ```ts
 * console.log(web3.utils.bytesToUint8Array("0xab")));
 * > Uint8Array(1) [ 171 ]
 * ```
 */
export declare const bytesToUint8Array: (data: Bytes) => Uint8Array | never;
/**
 * Convert a hex string to a byte array
 * @param hex - Hex string to be converted
 * @returns - The byte array representation of the input hex string
 *
 * @example
 * ```ts
 * console.log(web3.utils.hexToBytes('0x74657374'));
 * > Uint8Array(4) [ 116, 101, 115, 116 ]
 * ```
 */
export declare const hexToBytes: (bytes: HexString) => Uint8Array;
export declare function utf8ToBytes(str: any): Uint8Array;
export declare function uint8ArrayToHexString(uint8Array: Uint8Array): string;
export declare const bytesToHex: (bytes: Bytes) => HexString;
/**
 * computes the Keccak-256 hash of the input and returns a hexstring
 * @param data - the input to hash
 * @returns - the Keccak-256 hash of the input
 *
 * @example
 * ```ts
 * console.log(web3.utils.sha3('web3.js'));
 * > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a
 *
 * console.log(web3.utils.sha3(''));
 * > undefined
 * ```
 */
export declare const sha3: (data: Bytes) => string | undefined;
export declare function keccak256Hash(data: string): string;
export declare function generateEip712Hash(domainHash: string, structHash: string): string;
