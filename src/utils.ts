import {
  CryptoAccount,
  CryptoHDKey,
  RegistryItem,
} from "@keystonehq/bc-ur-registry-eth";

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function uuidv4Stringify(buffer: Buffer) {
  if (buffer.length !== 16) {
    throw new Error(`Invalid buffer length for uuid: ${buffer.length}`);
  }
  if (buffer.equals(Buffer.alloc(16))) {
    return null;
  } // If buffer is all zeros, return null
  const str = buffer.toString("hex");
  return `${str.slice(0, 8)}-${str.slice(8, 12)}-${str.slice(
    12,
    16
  )}-${str.slice(16, 20)}-${str.slice(20)}`;
}

export function isCryptoHDKey(item: RegistryItem): item is CryptoHDKey {
  return item instanceof CryptoHDKey;
}

export function isCryptoAccount(item: RegistryItem): item is CryptoAccount {
  return item instanceof CryptoAccount;
}

export function hexBuffer(str: string | Buffer): Buffer {
  if (Buffer.isBuffer(str)) {
    return Buffer.from(str);
  }
  return Buffer.from(str.startsWith("0x") ? str.slice(2) : str, "hex");
}
