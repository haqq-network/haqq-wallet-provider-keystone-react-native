import {KeyringAccountEnum} from './types';

export const PATH_INDEX_KEY = '{{index}}';

export const PATHS_PATTERN_MAP = {
  [KeyringAccountEnum.standard]: `44'/60'/0'/0/${PATH_INDEX_KEY}`,
  [KeyringAccountEnum.ledger_live]: `44'/60'/${PATH_INDEX_KEY}'/0/0`,
  [KeyringAccountEnum.ledger_legacy]: `44'/60'/0'/${PATH_INDEX_KEY}`,
};
