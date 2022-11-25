import { Language, Translate } from '../types';
import { translate } from './translate';

export const getRawText = async (text: string | Translate): Promise<string> => {
  const { __ } = await translate(Language.en);

  if (typeof text === 'string') {
    return text;
  }

  return __(text.key, text.args);
};
