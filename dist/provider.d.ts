import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BytesLike, Provider, ProviderInterface } from '@haqq/provider-base';
import { ProviderKeystoneReactNativeOptions } from './types';
export declare class ProviderKeystoneReactNative extends Provider<ProviderKeystoneReactNativeOptions> implements ProviderInterface {
    stop: boolean;
    xpub: string;
    xfp: string;
    rootPath: string;
    constructor(options: ProviderKeystoneReactNativeOptions);
    getIdentifier(): string;
    getAccountInfo(hdPath: string): Promise<{
        publicKey: string;
        address: string;
    }>;
    signTransaction(hdPath: string, transaction: TransactionRequest): Promise<string>;
    signPersonalMessage(hdPath: string, message: string | BytesLike): Promise<string>;
    signTypedData(hdPath: string, domainHash: string, valuesHash: string): Promise<string>;
    abort(): void;
    confirmAddress(hdPath: string): Promise<string>;
    catchError(e: Error, source: string): void;
}
