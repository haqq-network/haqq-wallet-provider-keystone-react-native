[@haqq/provider-keystone-react-native - v0.0.1](README.md) / Exports

# @haqq/provider-keystone-react-native - v0.0.1

## Table of contents

### Enumerations

- [KeyringAccountEnum](enums/KeyringAccountEnum.md)
- [ProviderKeystonErrorEnum](enums/ProviderKeystonErrorEnum.md)
- [SupportedRegistryTypeEnum](enums/SupportedRegistryTypeEnum.md)

### Classes

- [ProviderKeystoneReactNative](classes/ProviderKeystoneReactNative.md)

### Type Aliases

- [AccountInfo](modules.md#accountinfo)
- [AsyncReturnType](modules.md#asyncreturntype)
- [KeystoneAwaitForSignParams](modules.md#keystoneawaitforsignparams)
- [KeystoneAwaitForSignReturnType](modules.md#keystoneawaitforsignreturntype)
- [ProviderKeystoneReactNativeOptions](modules.md#providerkeystonereactnativeoptions)

## Type Aliases

### AccountInfo

Ƭ **AccountInfo**: [`AsyncReturnType`](modules.md#asyncreturntype)\<`ProviderInterface`[``"getAccountInfo"``]\>

#### Defined in

[src/types.ts:46](https://github.com/haqq-network/haqq-wallet-provider-keystone-react-native/blob/4643607/src/types.ts#L46)

___

### AsyncReturnType

Ƭ **AsyncReturnType**\<`T`\>: `T` extends (...`args`: `any`) => `Promise`\<infer U\> ? `U` : `T` extends (...`args`: `any`) => infer U ? `U` : `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Defined in

[src/types.ts:38](https://github.com/haqq-network/haqq-wallet-provider-keystone-react-native/blob/4643607/src/types.ts#L38)

___

### KeystoneAwaitForSignParams

Ƭ **KeystoneAwaitForSignParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cborHex` | `string` |
| `requestID` | `string` |
| `urType` | `string` |

#### Defined in

[src/types.ts:3](https://github.com/haqq-network/haqq-wallet-provider-keystone-react-native/blob/4643607/src/types.ts#L3)

___

### KeystoneAwaitForSignReturnType

Ƭ **KeystoneAwaitForSignReturnType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signatureHex` | `string` |

#### Defined in

[src/types.ts:9](https://github.com/haqq-network/haqq-wallet-provider-keystone-react-native/blob/4643607/src/types.ts#L9)

___

### ProviderKeystoneReactNativeOptions

Ƭ **ProviderKeystoneReactNativeOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `qrCBORHex` | `string` |
| `awaitForSign` | (`params`: [`KeystoneAwaitForSignParams`](modules.md#keystoneawaitforsignparams)) => `Promise`\<[`KeystoneAwaitForSignReturnType`](modules.md#keystoneawaitforsignreturntype)\> |

#### Defined in

[src/types.ts:13](https://github.com/haqq-network/haqq-wallet-provider-keystone-react-native/blob/4643607/src/types.ts#L13)
