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

export function hexBuffer(str: string): Buffer {
  return Buffer.from(str.startsWith("0x") ? str.slice(2) : str, "hex");
}


export function splitPath(path: string): number[] {
  const result: number[] = [];
  const components = path.split("/");
  components.forEach((element) => {
    let number = parseInt(element, 10);
    if (isNaN(number)) {
      return; // FIXME shouldn't it throws instead?
    }
    if (element.length > 1 && element[element.length - 1] === "'") {
      number += 0x80000000;
    }
    result.push(number);
  });
  return result;
}