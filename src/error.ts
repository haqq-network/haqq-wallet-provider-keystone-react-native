import { ProviderKeystonErrorEnum } from "./types";

export class ProviderKeystoneError {
  public name = "ProviderKeystoneError";
  public code: ProviderKeystonErrorEnum;
  public message: string;
  public source: string;

  constructor(message: string, code: ProviderKeystonErrorEnum, source: string) {
    this.message = message;
    this.code = code;
    this.source = source;
  }
}

export function isProviderKeystoneError(
  err: any
): err is ProviderKeystoneError {
  return err?.name === "ProviderKeystoneError";
}
