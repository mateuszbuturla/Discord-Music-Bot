import * as fs from 'fs';
import Polyglot from 'node-polyglot';
import * as path from 'path';
import { Language } from '../types';
import { promisify } from 'util';
import { assetsDir } from './assetsDir';

const TRANSLATIONS_CACHE: {
  [lang: string]: any;
} = {};

export function safeResolve(base: string, target: string): string {
  const targetPath = '.' + path.posix.normalize('/' + target);
  return path.posix.resolve(base, targetPath);
}

export const getTranslations = async (lang: string) => {
  if (!TRANSLATIONS_CACHE[lang]) {
    const read = await promisify(fs.readFile)(
      safeResolve(`${assetsDir()}/lang`, `${lang}.json`),
      'utf-8',
    );
    TRANSLATIONS_CACHE[lang] = JSON.parse(read);
  }
  return TRANSLATIONS_CACHE[lang];
};

const createPolyglot = async (lang: string) => {
  return new Polyglot(await getTranslations(lang));
};

export const translate = async (lang: Language) => {
  const polyglotEn: Polyglot = await createPolyglot(Language[lang]);

  const __ = (text: string, args?: any): string => polyglotEn.t(text, args);
  const myLang = polyglotEn.locale();

  return { __, myLang };
};
