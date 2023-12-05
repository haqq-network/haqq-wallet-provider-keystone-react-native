import { TransactionRequest } from '@ethersproject/abstract-provider';
import {
  BytesLike,
  Provider,
  ProviderInterface,
  stringToUtf8Bytes
} from '@haqq/provider-base';
import { CryptoHDKey, DataType, ETHSignature, EthSignRequest, URRegistryDecoder } from '@keystonehq/bc-ur-registry-eth';
import { UnsignedTransaction, ethers, utils } from 'ethers';
import { HDNode } from 'ethers/lib/utils';
import { ProviderKeystoneReactNativeOptions } from './types';
import { makeID } from './utils';
import { UR } from '@ngraveio/bc-ur';

export class ProviderKeystoneReactNative
  extends Provider<ProviderKeystoneReactNativeOptions>
  implements ProviderInterface {
  public stop: boolean = false;
  public xpub: string = '';
  public xfp: string = '';

  constructor(options: ProviderKeystoneReactNativeOptions) {
    super({ ...options, getPassword: () => Promise.resolve('') });

    const hdKey = CryptoHDKey.fromCBOR(this._options.cryptoHDKeyCBOR)
    this.xpub = hdKey.getBip32Key();
    this.xfp = hdKey.getOrigin().getSourceFingerprint().toString('hex');
  }

  getIdentifier(): string {
    return this.xfp;
  }

  async getAccountInfo(hdPath: string) {
    let resp = { publicKey: '', address: '' };
    try {
      this.stop = false;
      const subPath = hdPath.replace("44'/60'/0'", '');
      const hdNode = HDNode
        .fromExtendedKey(this.xpub)
        .derivePath(subPath);

      resp = {
        publicKey: hdNode.publicKey,
        address: ethers.utils.computeAddress(hdNode.publicKey),
      };
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
        this.xfp,
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


  catchError(e: Error, source: string) {
    switch (e.name) {
      case 'TransportStatusError':
        // @ts-ignore
        switch (String(e.statusCode)) {
          case '27010':
            this.emit(source, false, e.message, e.name, '27010');
            throw new Error('keystone_locked');
          case '27013':
            this.emit(source, false, e.message, e.name, '27013');
            throw new Error('keystone_rejected');
        }
        break;
      default:
        super.catchError(e, source);
        break;
    }
  }
}
