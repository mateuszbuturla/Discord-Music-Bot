import { Language, Translate } from '../types';
import { translate } from './translate';

export const getRawText = async (
  text: string | Translate,
  lang: Language,
): Promise<string> => {
  const { __ } = await translate(lang);

  if (typeof text === 'string') {
    return text;
  }

  return __(text.key, text.args);
};
