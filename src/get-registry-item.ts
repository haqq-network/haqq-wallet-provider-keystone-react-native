import {CryptoAccount, CryptoHDKey} from '@keystonehq/bc-ur-registry-eth';

const cache = new Map();

export function getRegistryItemFromHex(hex: string) {
  try {
    if (cache.has(hex)) {
      return cache.get(hex);
    }

    const buffer = Buffer.from(hex, 'hex');
    let account: CryptoAccount | CryptoHDKey | undefined;

    try {
      account = CryptoAccount.fromCBOR(buffer);
    } catch (e) {}

    if (!account) {
      try {
        account = CryptoHDKey.fromCBOR(buffer);
      } catch (e) {}
    }

    if (account) {
      cache.set(hex, account);
    }
    return account;
  } catch (e) {}
  return undefined;
}
