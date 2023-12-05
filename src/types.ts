export type KeystoneAwaitForSignParams = {
  signRequest: Buffer;
  requestID: string;
} 

export type ProviderKeystoneReactNativeOptions = {
  cryptoHDKeyCBOR: Buffer;
  awaitForSign(params: KeystoneAwaitForSignParams): Promise<Buffer>;
};