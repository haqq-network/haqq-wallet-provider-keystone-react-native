import { CryptoAccount, CryptoHDKey, RegistryItem } from "@keystonehq/bc-ur-registry-eth";

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isCryptoHDKey(item: RegistryItem): item is CryptoHDKey {
  return item instanceof CryptoHDKey;
}

export function isCryptoAccount(item: RegistryItem): item is CryptoAccount {
  return item instanceof CryptoAccount;
}