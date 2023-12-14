import { CryptoAccount, CryptoHDKey, RegistryItem } from "@keystonehq/bc-ur-registry-eth";

export function makeID(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    return Array.from({length})
      .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
      .join('');
  }

  export function isCryptoHDKey(item: RegistryItem): item is CryptoHDKey {
    return item instanceof CryptoHDKey;
  }

  export function isCryptoAccount(item: RegistryItem): item is CryptoAccount {
    return item instanceof CryptoAccount;
  }