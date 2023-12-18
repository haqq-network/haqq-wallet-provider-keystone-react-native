/// <reference types="node" />
import { ProviderInterface } from "@haqq/provider-base";
export type KeystoneAwaitForSignParams = {
    cborHex: string;
    urType: string;
    requestID: string;
};
export type ProviderKeystoneReactNativeOptions = {
    qrCBORHex: string;
    awaitForSign(params: KeystoneAwaitForSignParams): Promise<Buffer>;
};
export declare enum SupportedRegistryTypeEnum {
    CryptoHDkey = "crypto-hdkey",
    CryptoAccount = "crypto-account"
}
export declare enum ProviderKeystonErrorEnum {
    UnsupportedRegistryType = "unsupported_registry_type",
    InvalidCborHex = "invalid_cbor_hex",
    InvalidPath = "invalid_path"
}
export declare enum KeyringAccountEnum {
    standard = "account.standard",
    ledger_live = "account.ledger_live",
    ledger_legacy = "account.ledger_legacy"
}
export type AsyncReturnType<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer U> ? U : T extends (...args: any) => infer U ? U : any;
export type AccountInfo = AsyncReturnType<ProviderInterface['getAccountInfo']>;
