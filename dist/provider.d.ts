import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BytesLike, Provider, ProviderInterface } from '@haqq/provider-base';
import { KeyringAccountEnum, ProviderKeystoneReactNativeOptions } from './types';
export declare class ProviderKeystoneReactNative extends Provider<ProviderKeystoneReactNativeOptions> implements ProviderInterface {
    stop: boolean;
    private _xfp;
    private _registryItem;
    private _cryptoAccontDataMap;
    constructor(options: ProviderKeystoneReactNativeOptions);
    getIdentifier(): string;
    getKeyringAccount(): KeyringAccountEnum;
    getPathPattern(): string;
    getAccountInfo(hdPath: string): Promise<{
        publicKey: string;
        address: string;
    }>;
    buildPath(index: number): string;
    signTransaction(hdPath: string, transaction: TransactionRequest): Promise<string>;
    signPersonalMessage(hdPath: string, message: string | BytesLike): Promise<string>;
    signTypedData(hdPath: string, domainSeparatorHex: string, hashStructMessageHex: string): Promise<string>;
    abort(): void;
    private _initWithCryptoHDKey;
    private _initWithCryptoAccount;
    private _getAccountInfoForCryptoHdKey;
    private _getAccountInfoForCryptoAccount;
    private _throwError;
    private _parseSignature;
    private _parseSignatureToHex;
}
