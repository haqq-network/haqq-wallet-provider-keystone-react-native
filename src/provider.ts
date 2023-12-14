import { TransactionRequest } from '@ethersproject/abstract-provider';
import {
  BytesLike,
  Provider,
  ProviderInterface,
  stringToUtf8Bytes
} from '@haqq/provider-base';
import { CryptoAccount, CryptoHDKey, DataType, ETHSignature, EthSignRequest, RegistryItem } from '@keystonehq/bc-ur-registry-eth';
import { UR } from '@ngraveio/bc-ur';
import { UnsignedTransaction, ethers, utils } from 'ethers';
import { HDNode } from 'ethers/lib/utils';
import { getCryptoAccountOrCryptoHDKeyFromHex } from './get-crypto-account-or-crypto-hdkey';
import { AccountInfo, KeyringAccountEnum, ProviderKeystonErrorEnum, ProviderKeystoneReactNativeOptions, SupportedRegistryTypeEnum } from './types';
import { isCryptoAccount, isCryptoHDKey, makeID } from './utils';

type HDPath = string;

const SUPPORTED_REGISTRY_TYPES: string[] = [SupportedRegistryTypeEnum.CryptoAccount, SupportedRegistryTypeEnum.CryptoHDkey]

export class ProviderKeystoneReactNative extends Provider<ProviderKeystoneReactNativeOptions> implements ProviderInterface {
  public stop: boolean = false;
  private _xfp: string;
  private _registryItem: RegistryItem;
  private _cryptoAccontDataMap: Record<HDPath, AccountInfo> = {}

  constructor(options: ProviderKeystoneReactNativeOptions) {
    super({ ...options, getPassword: () => Promise.resolve('') });
    this._registryItem = getCryptoAccountOrCryptoHDKeyFromHex(this._options.qrCBORHex);

    if (!this._registryItem) {
      this._throwError(ProviderKeystonErrorEnum.InvalidCborHex, 'constructor')
    }

    if (!SUPPORTED_REGISTRY_TYPES.includes(
      this._registryItem.getRegistryType().getType()
    )) {
      this._throwError(ProviderKeystonErrorEnum.UnsupportedRegistryType, 'constructor')
    }

    if (isCryptoHDKey(this._registryItem)) {
      this._initWithCryptoHDKey(this._registryItem);
    }

    if (isCryptoAccount(this._registryItem)) {
      this._initWithCryptoAccount(this._registryItem);
    }
  }

  getKeyringAccount(): KeyringAccountEnum {
    if (isCryptoAccount(this._registryItem)) {
      const descriptor = this._registryItem.getOutputDescriptors().find(d => {
        try {
          return !!d.getHDKey()?.getNote();
        } catch (e) {
          return false;
        }
      })
      return descriptor.getHDKey().getNote() as KeyringAccountEnum;
    }

    return KeyringAccountEnum.standard;
  }

  getIdentifier(): string {
    return this._options.qrCBORHex
  }

  async getAccountInfo(hdPath: string) {
    let resp = { publicKey: '', address: '' };
    try {
      this.stop = false;
      if (isCryptoHDKey(this._registryItem)) {
        resp = await this._getAccountInfoForCryptoHdKey(hdPath, this._registryItem);
      }

      if (isCryptoAccount(this._registryItem)) {
        resp = await this._getAccountInfoForCryptoAccount(hdPath);
      }

      this.emit('getPublicKeyForHDPath', true);
    } catch (e) {
      if (e instanceof Error) {
        this.catchError(e, 'getPublicKeyForHDPath');
      }
    }
    return resp;
  }

  async signTransaction(hdPath: string, transaction: TransactionRequest) {
    let resp = '';
    try {
      this.stop = false;
      const unsignedTx = ethers.utils.serializeTransaction(transaction as UnsignedTransaction);
      const unsignedTxBuffer = Buffer.from(unsignedTx.substring(2), "hex");
      const { address } = await this.getAccountInfo(hdPath);
      const requestID = makeID(5);

      const ethSignRequest = EthSignRequest.constructETHRequest(
        unsignedTxBuffer,
        DataType.transaction,
        hdPath,
        this._xfp,
        requestID,
        transaction.chainId,
        address
      );

      const signatureBuffer = await this._options.awaitForSign({
        requestID,
        signRequest: ethSignRequest.toUR().cbor
      });

      const signatureUr = UR.fromBuffer(signatureBuffer);

      if (signatureUr.type === 'eth-signature') {
        const ethSignature = ETHSignature.fromCBOR(signatureUr.cbor);
        const signature = ethSignature.getSignature();

        const jsonSignature = {
          r: signature.slice(0, 32).toString('hex'),
          s: signature.slice(32, 64).toString('hex'),
          v: signature.slice(64).toString('hex'),
        };

        const result = utils.serializeTransaction(transaction as UnsignedTransaction, {
          r: '0x' + jsonSignature.r,
          s: '0x' + jsonSignature.s,
          v: parseInt(jsonSignature.v, 10),
        });

        this.emit('signTransaction', true);
        return result
      } else {
        throw new Error('Invalid signature type')
      }
    } catch (e) {
      if (e instanceof Error) {
        this.catchError(e, 'signTransaction');
      }
    }

    return resp;
  }

  async signPersonalMessage(
    hdPath: string,
    message: string | BytesLike,
  ): Promise<string> {
    let resp = '';
    try {
      this.stop = false;

      const m = Array.from(
        typeof message === 'string' ? stringToUtf8Bytes(message) : message,
      );

      const msg = Buffer.from(m).toString('hex');
      const signature = { r: 0, s: 0, v: 0 };


      const v = (signature.v - 27).toString(16).padStart(2, '0');
      resp = '0x' + signature.r + signature.s + v;

      this.emit('signPersonalMessage', true);
    } catch (e) {
      if (e instanceof Error) {
        this.catchError(e, 'signPersonalMessage');
      }
    }

    return resp;
  }

  async signTypedData(hdPath: string, domainHash: string, valuesHash: string) {
    let resp = '';
    try {
      this.stop = false;

      const signature = { r: 0, s: 0, v: 0 };

      const v = (signature.v - 27).toString(16).padStart(2, '0');
      resp = '0x' + signature.r + signature.s + v;

      this.emit('signTypedData', true);
    } catch (e) {
      if (e instanceof Error) {
        this.catchError(e, 'signTypedData');
      }
      return '';
    }

    return resp;
  }

  abort() {
    this.emit('abortCall');
    this.stop = true;
  }

  async confirmAddress(hdPath: string) {
    let resp = '';
    try {
      this.stop = false;


      const response = { address: '0x123' }//await eth.getAddress(hdPath, true);

      resp = response.address;
      this.emit('confirmAddress', true);
    } catch (e) {
      if (e instanceof Error) {
        this.emit('confirmAddress', false, e.message);
        throw new Error(e.message);
      }
    }
    return resp;
  }


  private _initWithCryptoHDKey(hdKey: CryptoHDKey) {
    this._xfp = hdKey.getOrigin()?.getSourceFingerprint()?.toString('hex') || '';
  }

  private _initWithCryptoAccount(account: CryptoAccount) {
    this._xfp = account.getMasterFingerprint().toString('hex');
    for (const descriptor of account.getOutputDescriptors()) {
      try {
        const cryptoHDKey = descriptor.getHDKey();
        if (cryptoHDKey) {
          const key = cryptoHDKey.getKey();
          const path = cryptoHDKey.getOrigin().getPath() as HDPath;
          const address = ethers.utils.computeAddress(key);
          const publicKey = `0x${key.toString('hex')}`
          this._cryptoAccontDataMap[path] = {
            address,
            publicKey
          };
        }
      } catch (e) {
        throw new Error(`KeystoneError#invalid_data: ${e}`);
      }
    }
  }

  private async _getAccountInfoForCryptoHdKey(hdPath: string, hdKey: CryptoHDKey) {
    const subPath = hdPath.replace(hdKey.getOrigin().getPath(), '');

    const hdNode = HDNode
      .fromExtendedKey(hdKey.getBip32Key())
      .derivePath(subPath);

    return {
      publicKey: hdNode.publicKey,
      address: ethers.utils.computeAddress(hdNode.publicKey),
    };
  }

  private async _getAccountInfoForCryptoAccount(hdPath: string) {
    const accointInfo = this._cryptoAccontDataMap[hdPath]

    if (!accointInfo) {
      this._throwError(ProviderKeystonErrorEnum.InvalidPath, 'getAccountInfo');
    }

    return accointInfo;
  }


  private _throwError(errCode: ProviderKeystonErrorEnum, source: string) {
    const err = new Error(errCode)
    const errMsg = `[ProviderKeystoneReactNative:${source}]: ${errCode}`
    this.emit(source, false, err.message, err.name);
    throw new Error(errMsg);
  }
}
