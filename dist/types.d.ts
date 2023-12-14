/// <reference types="node" />
export type KeystoneAwaitForSignParams = {
    signRequest: Buffer;
    requestID: string;
};
export type ProviderKeystoneReactNativeOptions = {
    cryptoHDKeyCBORHex: string;
    awaitForSign(params: KeystoneAwaitForSignParams): Promise<Buffer>;
};
